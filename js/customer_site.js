// 自定义扩展站点（用户可在此添加自己的 API 源）
// 格式: key: { api: 'https://.../api.php/provide/vod', name: '显示名称' }
// 注意：七七资源(www.qiqidys.com) Cloudflare 出口不可达，暂注释
const CUSTOMER_SITES = {
    // qiqi: {
    //     api: 'https://www.qiqidys.com/api.php/provide/vod',
    //     name: '七七资源',
    // }
};

// 调用全局方法合并
if (window.extendAPISites) {
    window.extendAPISites(CUSTOMER_SITES);
} else {
    console.error("错误：请先加载 config.js！");
}