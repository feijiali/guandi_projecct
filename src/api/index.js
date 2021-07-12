const apiContext = require.context("./", true, /\.js$/);
let apiObject = {};
apiContext.keys().forEach(route => {
    // 如果是根目录的 index.js 、不处理
    if (route.startsWith("./index") || route.startsWith("./api")) {
        return;
    }
    const apiModule = apiContext(route);
    // 兼容 import export 和 require module.export 两种规范
    apiObject = {
        ...apiObject,
        ...(apiModule.default || apiModule)
    };
});
export default apiObject;