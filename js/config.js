// 全局常量配置
const PROXY_URL = '/proxy/';    // 适用于 Cloudflare, Netlify (带重写), Vercel (带重写)
// const HOPLAYER_URL = 'https://hoplayer.com/index.html';
const SEARCH_HISTORY_KEY = 'videoSearchHistory';
const MAX_HISTORY_ITEMS = 5;

// 密码保护配置
// 注意：PASSWORD 环境变量是必需的，所有部署都必须设置密码以确保安全
const PASSWORD_CONFIG = {
    localStorageKey: 'passwordVerified',  // 存储验证状态的键名
    verificationTTL: 90 * 24 * 60 * 60 * 1000  // 验证有效期（90天，约3个月）
};

// 网站信息配置
const SITE_CONFIG = {
    name: 'LibreTV',
    url: 'https://libretv-4le.pages.dev',
    description: '免费在线视频搜索与观看平台',
    logo: 'image/logo.png',
    version: '1.0.3'
};

// API站点配置
// 说明：本列表源自 LunaTV-config 精简版（每日健康检查 95%+ 可用率）。
// ① 所有 api 均已补全 /api.php/provide/vod 正确路径 —— 之前缺失路径导致采集站返回 HTML 首页而非 JSON
// ② 剔除已失效/无搜索结果/污染结果的源（黑木耳、CK、丝袜、新华为、魔爪等）
// ③ 百度云zy、艾旦影视 原依赖的中转域名(pz.v88.qzz.io)已到期，已改为直连
const API_SITES = {
    // ===== 普通视频源 =====
    iqiyi: {
        api: 'https://iqiyizyapi.com/api.php/provide/vod',
        name: '爱奇艺',
        detail: 'https://iqiyizyapi.com'
    },
    tyyszy: {
        api: 'https://tyyszy.com/api.php/provide/vod',
        name: '天涯资源',
        detail: 'https://tyyszy.com'
    },
    wolong: {
        api: 'https://wolongzyw.com/api.php/provide/vod',
        name: '卧龙资源',
        detail: 'https://wolongzyw.com'
    },
    ffzy: {
        api: 'https://api.ffzyapi.com/api.php/provide/vod',
        name: '非凡资源',
        detail: 'https://cj.ffzyapi.com'
    },
    jisu: {
        api: 'https://jszyapi.com/api.php/provide/vod',
        name: '极速资源',
        detail: 'https://jszyapi.com'
    },
    bfzy: {
        api: 'https://bfzyapi.com/api.php/provide/vod',
        name: '暴风资源',
        detail: 'https://bfzy.tv'
    },
    zy360: {
        api: 'https://360zyzz.com/api.php/provide/vod',
        name: '360资源',
        detail: 'https://360zy.com'
    },
    dbzy: {
        api: 'https://caiji.dbzy5.com/api.php/provide/vod',
        name: '豆瓣资源',
        detail: 'https://dbzy.tv'
    },
    mdzy: {
        api: 'https://www.mdzyapi.com/api.php/provide/vod',
        name: '魔都资源',
        detail: 'https://www.moduzy.net'
    },
    ruyi: {
        api: 'https://cj.rycjapi.com/api.php/provide/vod',
        name: '如意资源',
        detail: 'https://www.ryzyw.com'
    },
    dyttzy: {
        api: 'http://caiji.dyttzyapi.com/api.php/provide/vod',
        name: '电影天堂',
        detail: 'http://caiji.dyttzyapi.com'
    },
    maotai: {
        api: 'https://caiji.maotaizy.cc/api.php/provide/vod',
        name: '茅台资源',
        detail: 'https://mtzy.me'
    },
    ikun: {
        api: 'https://ikunzyapi.com/api.php/provide/vod',
        name: 'iKun资源',
        detail: 'https://ikunzy.com'
    },
    maoyan: {
        api: 'https://api.maoyanapi.top/api.php/provide/vod',
        name: '猫眼资源',
        detail: 'https://www.maoyanzy.com'
    },
    liangzi: {
        api: 'https://cj.lzcaiji.com/api.php/provide/vod',
        name: '量子资源',
        detail: 'https://cj.lzcaiji.com'
    },
    zuidazi: {
        api: 'https://api.zuidapi.com/api.php/provide/vod',
        name: '最大资源',
        detail: 'https://zuida.xyz'
    },
    wujin: {
        api: 'https://api.wujinapi.me/api.php/provide/vod',
        name: '无尽资源',
        detail: 'https://wujinzy.com'
    },
    xinlang: {
        api: 'https://api.xinlangapi.com/xinlangapi.php/provide/vod',
        name: '新浪资源',
        detail: 'https://xinlangapi.com'
    },
    wangwang: {
        api: 'https://api.wwzy.tv/api.php/provide/vod',
        name: '旺旺资源',
        detail: 'https://api.wwzy.tv'
    },
    subo: {
        api: 'https://subocaiji.com/api.php/provide/vod',
        name: '速播资源',
        detail: 'https://www.subozy.com'
    },
    uku: {
        api: 'https://api.ukuapi88.com/api.php/provide/vod',
        name: 'U酷影视',
        detail: 'https://www.ukuzy.com'
    },
    guangsu: {
        api: 'https://api.guangsuapi.com/api.php/provide/vod',
        name: '光速资源',
        detail: 'https://api.guangsuapi.com'
    },
    hongniu: {
        api: 'https://www.hongniuzy2.com/api.php/provide/vod',
        name: '红牛资源',
        detail: 'https://www.hongniuzy.com'
    },
    moduan: {
        api: 'https://caiji.moduapi.cc/api.php/provide/vod',
        name: '魔都动漫',
        detail: 'https://caiji.moduapi.cc'
    },
    haohua: {
        api: 'https://hhzyapi.com/api.php/provide/vod',
        name: '豪华资源',
        detail: 'https://www.haohuazy.com'
    },
    bdzy: {
        api: 'https://api.apibdzy.com/api.php/provide/vod',
        name: '百度云zy',
        detail: 'https://bdzy1.com'
    },
    aidan: {
        api: 'https://lovedan.net/api.php/provide/vod',
        name: '艾旦影视',
        detail: 'https://lovedan.net'
    },

    // ===== 黄色资源采集站 =====
    jkun: {
        api: 'https://jkunzyapi.com/api.php/provide/vod',
        name: 'jkun资源',
        adult: true,
        detail: 'https://jkunzyapi.com'
    },
    huangcang: {
        api: 'https://hsckzy.xyz/api.php/provide/vod',
        name: '黄色仓库',
        adult: true,
        detail: 'https://hsckzy.xyz'
    },
    souav: {
        api: 'https://api.souavzyw.net/api.php/provide/vod',
        name: 'souav资源',
        adult: true,
        detail: 'https://api.souavzyw.net'
    },
    r155: {
        api: 'https://155api.com/api.php/provide/vod',
        name: '155资源',
        adult: true,
        detail: 'https://155zy2.com'
    },
    lsb: {
        api: 'https://apilsbzy1.com/api.php/provide/vod',
        name: 'lsb资源',
        adult: true,
        detail: 'https://apilsbzy1.com'
    },
    bwzy: {
        api: 'https://api.bwzyz.com/api.php/provide/vod',
        name: '百万资源',
        adult: true,
        detail: 'https://api.bwzym3u8.com'
    },
    mada: {
        api: 'https://91md.me/api.php/provide/vod',
        name: '麻豆视频',
        adult: true,
        detail: 'https://91md.me'
    },
    aivin: {
        api: 'http://lbapiby.com/api.php/provide/vod',
        name: 'AIvin',
        adult: true,
        detail: 'http://lbapiby.com'
    },
    yutu: {
        api: 'https://apiyutu.com/api.php/provide/vod',
        name: '玉兔资源',
        adult: true,
        detail: 'https://apiyutu.com'
    },
    fanhao: {
        api: 'http://fhapi9.com/api.php/provide/vod',
        name: '番号资源',
        adult: true,
        detail: 'http://fhapi9.com'
    },
    xiaoji: {
        api: 'https://api.xiaojizy.live/provide/vod',
        name: '小鸡资源',
        adult: true,
        detail: 'https://xiaojizy.live'
    },
    danai: {
        api: 'https://apidanaizi.com/api.php/provide/vod',
        name: '大奶子',
        adult: true,
        detail: 'https://apidanaizi.com'
    },
    lebo: {
        api: 'https://lbapi9.com/api.php/provide/vod',
        name: '乐播资源',
        adult: true,
        detail: 'https://lbapi9.com'
    },
    naixiang: {
        api: 'https://Naixxzy.com/api.php/provide/vod',
        name: '奶香资源',
        adult: true,
        detail: 'https://Naixxzy.com'
    },
    senlin: {
        api: 'https://beiyong.slapibf.com/api.php/provide/vod',
        name: '森林资源',
        adult: true,
        detail: 'https://slapibf.com'
    },
    lajiao: {
        api: 'https://apilj.com/api.php/provide/vod',
        name: '辣椒资源',
        adult: true,
        detail: 'https://apilj.com'
    },
    shayu: {
        api: 'https://shayuapi.com/api.php/provide/vod',
        name: '鲨鱼资源',
        adult: true,
        detail: 'https://shayuapi.com'
    },
    didi: {
        api: 'https://api.ddapi.cc/api.php/provide/vod',
        name: '滴滴资源',
        adult: true,
        detail: 'https://didizy.com'
    },
    heili: {
        api: 'https://www.heiliaozyapi.com/api.php/provide/vod',
        name: '黑料资源',
        adult: true,
        detail: 'https://heiliaozy.cc'
    },
    taohua: {
        api: 'https://thzy1.me/api.php/provide/vod',
        name: '桃花资源',
        adult: true,
        detail: 'https://thzy8.me'
    },
    jingpin: {
        api: 'https://www.jingpinx.com/api.php/provide/vod',
        name: '精品资源',
        adult: true,
        detail: 'https://www.jingpinx.com'
    }
};

// 定义合并方法（保持原有，支持用户自定义扩展）
function extendAPISites(newSites) {
    Object.assign(API_SITES, newSites);
}

// 暴露到全局
window.API_SITES = API_SITES;
window.extendAPISites = extendAPISites;


// 添加聚合搜索的配置选项
const AGGREGATED_SEARCH_CONFIG = {
    enabled: true,             // 是否启用聚合搜索
    timeout: 8000,            // 单个源超时时间（毫秒）
    maxResults: 10000,          // 最大结果数量
    parallelRequests: true,   // 是否并行请求所有源
    showSourceBadges: true    // 是否显示来源徽章
};

// 抽象API请求配置
const API_CONFIG = {
    search: {
        // 只拼接参数部分，不再包含 /api.php/provide/vod/
        path: '?ac=videolist&wd=',
        pagePath: '?ac=videolist&wd={query}&pg={page}',
        maxPages: 50, // 最大获取页数
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    },
    detail: {
        // 只拼接参数部分
        path: '?ac=videolist&ids=',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json'
        }
    }
};

// 优化后的正则表达式模式
const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g;

// 添加自定义播放器URL
const CUSTOM_PLAYER_URL = 'player.html'; // 使用相对路径引用本地player.html

// 增加视频播放相关配置
const PLAYER_CONFIG = {
    autoplay: true,
    allowFullscreen: true,
    width: '100%',
    height: '600',
    timeout: 15000,  // 播放器加载超时时间
    filterAds: true,  // 是否启用广告过滤
    autoPlayNext: true,  // 默认启用自动连播功能
    adFilteringEnabled: true, // 默认开启分片广告过滤
    adFilteringStorage: 'adFilteringEnabled' // 存储广告过滤设置的键名
};

// 增加错误信息本地化
const ERROR_MESSAGES = {
    NETWORK_ERROR: '网络连接错误，请检查网络设置',
    TIMEOUT_ERROR: '请求超时，服务器响应时间过长',
    API_ERROR: 'API接口返回错误，请尝试更换数据源',
    PLAYER_ERROR: '播放器加载失败，请尝试其他视频源',
    UNKNOWN_ERROR: '发生未知错误，请刷新页面重试'
};

// 添加进一步安全设置
const SECURITY_CONFIG = {
    enableXSSProtection: true,  // 是否启用XSS保护
    sanitizeUrls: true,         // 是否清理URL
    maxQueryLength: 100,        // 最大搜索长度
    // allowedApiDomains 不再需要，因为所有请求都通过内部代理
};

// 添加多个自定义API源的配置
const CUSTOM_API_CONFIG = {
    separator: ',',           // 分隔符
    maxSources: 5,            // 最大允许的自定义源数量
    testTimeout: 5000,        // 测试超时时间(毫秒)
    namePrefix: 'Custom-',    // 自定义源名称前缀
    validateUrl: true,        // 验证URL格式
    cacheResults: true,       // 缓存测试结果
    cacheExpiry: 5184000000,  // 缓存过期时间(2个月)
    adultPropName: 'isAdult' // 用于标记成人内容的属性名
};

// 隐藏内置黄色采集站API的变量
const HIDE_BUILTIN_ADULT_APIS = false;
