async function searchByAPIAndKeyWord(apiId, query) {
    try {
        let apiUrl, apiName, apiBaseUrl;
        
        // 处理自定义API
        if (apiId.startsWith('custom_')) {
            const customIndex = apiId.replace('custom_', '');
            const customApi = getCustomApiInfo(customIndex);
            if (!customApi) return [];
            
            apiBaseUrl = customApi.url;
            apiUrl = apiBaseUrl + API_CONFIG.search.path + encodeURIComponent(query);
            apiName = customApi.name;
        } else {
            // 内置API
            if (!API_SITES[apiId]) return [];
            apiBaseUrl = API_SITES[apiId].api;
            apiUrl = apiBaseUrl + API_CONFIG.search.path + encodeURIComponent(query);
            apiName = API_SITES[apiId].name;
        }
        
        // 添加超时处理
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        // 添加鉴权参数到代理URL
        const proxiedUrl = await window.ProxyAuth?.addAuthToProxyUrl ? 
            await window.ProxyAuth.addAuthToProxyUrl(PROXY_URL + encodeURIComponent(apiUrl)) :
            PROXY_URL + encodeURIComponent(apiUrl);
        
        let response = await fetch(proxiedUrl, {
            headers: API_CONFIG.search.headers,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        // 检查代理返回的内容类型是否为JSON
        const contentType = response.headers.get('content-type') || '';

        // 有些采集站返回的JSON数据用的Content-Type是text/html而不是application/json。
        // 代理返回200但Content-Type不是json时，先尝试将内容解析为JSON再决定是否降级。
        if (response.ok && !contentType.includes('json')) {
            const text = await response.text();
            try {
                const jsonData = JSON.parse(text);
                // 解析成功：这是采集站误标了Content-Type的JSON数据，修正后直接使用
                response = new Response(JSON.stringify(jsonData), {
                    status: response.status,
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (e) {
                // 解析失败：确实是HTML/WAF页面，重新构造response保持body可读
                response = new Response(text, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });
            }
        }

        // 检查修正后的Content-Type
        const finalContentType = response.headers.get('content-type') || '';

        // 如果代理失败或返回的是HTML(被屏蔽)，尝试跳过代理直接请求
        if (!response.ok || finalContentType.includes('text/html')) {
            const directUrl = apiBaseUrl + API_CONFIG.search.path + encodeURIComponent(query);
            try {
                const directController = new AbortController();
                const directTimeoutId = setTimeout(() => directController.abort(), 10000);
                const directResponse = await fetch(directUrl, {
                    headers: API_CONFIG.search.headers,
                    signal: directController.signal,
                    mode: 'cors'
                });
                clearTimeout(directTimeoutId);
                if (directResponse.ok && !directResponse.headers.get('content-type')?.includes('text/html')) {
                    response = directResponse;
                }
            } catch (e) {
                // 直接请求失败（可能CORS限制），继续用代理的结果
                if (!response.ok) {
                    return [];
                }
            }
        }

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        
        if (!data || !data.list || !Array.isArray(data.list) || data.list.length === 0) {
            return [];
        }
        
        // 处理第一页结果
        const results = data.list.map(item => ({
            ...item,
            source_name: apiName,
            source_code: apiId,
            api_url: apiId.startsWith('custom_') ? getCustomApiInfo(apiId.replace('custom_', ''))?.url : undefined
        }));
        
        // 获取总页数
        const pageCount = data.pagecount || 1;
        // 确定需要获取的额外页数 (最多获取maxPages页)
        const pagesToFetch = Math.min(pageCount - 1, API_CONFIG.search.maxPages - 1);
        
        // 如果有额外页数，获取更多页的结果
        if (pagesToFetch > 0) {
            const additionalPagePromises = [];
            
            for (let page = 2; page <= pagesToFetch + 1; page++) {
                // 构建分页URL
                const pageUrl = apiBaseUrl + API_CONFIG.search.pagePath
                    .replace('{query}', encodeURIComponent(query))
                    .replace('{page}', page);
                
                // 创建获取额外页的Promise
                const pagePromise = (async () => {
                    try {
                        const pageController = new AbortController();
                        const pageTimeoutId = setTimeout(() => pageController.abort(), 15000);
                        
                        // 添加鉴权参数到代理URL
                        const proxiedPageUrl = await window.ProxyAuth?.addAuthToProxyUrl ? 
                            await window.ProxyAuth.addAuthToProxyUrl(PROXY_URL + encodeURIComponent(pageUrl)) :
                            PROXY_URL + encodeURIComponent(pageUrl);
                        
                        const pageResponse = await fetch(proxiedPageUrl, {
                            headers: API_CONFIG.search.headers,
                            signal: pageController.signal
                        });
                        
                        clearTimeout(pageTimeoutId);
                        
                        if (!pageResponse.ok) return [];
                        
                        const pageData = await pageResponse.json();
                        
                        if (!pageData || !pageData.list || !Array.isArray(pageData.list)) return [];
                        
                        // 处理当前页结果
                        return pageData.list.map(item => ({
                            ...item,
                            source_name: apiName,
                            source_code: apiId,
                            api_url: apiId.startsWith('custom_') ? getCustomApiInfo(apiId.replace('custom_', ''))?.url : undefined
                        }));
                    } catch (error) {
                        console.warn(`API ${apiId} 第${page}页搜索失败:`, error);
                        return [];
                    }
                })();
                
                additionalPagePromises.push(pagePromise);
            }
            
            // 等待所有额外页的结果
            const additionalResults = await Promise.all(additionalPagePromises);
            
            // 合并所有页的结果
            additionalResults.forEach(pageResults => {
                if (pageResults.length > 0) {
                    results.push(...pageResults);
                }
            });
        }
        
        return results;
    } catch (error) {
        console.warn(`API ${apiId} 搜索失败:`, error);
        return [];
    }
}