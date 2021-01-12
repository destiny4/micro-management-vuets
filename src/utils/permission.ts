import router from "@/router";
import store from "@/store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getLoginInfo } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import addDynamicMenuAndRoutes from "@/utils/addRoutes";
NProgress.configure({ showSpinner: false }); // NProgress Configuration
const whiteList = ["/login"]; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);
  // determine whether the user has logged in
  const loginInfo = getLoginInfo();
  const hasToken = loginInfo.token;
  // 设置iframe内嵌url地址
  handleIFrameUrl(to.path);
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      const loadedMenu = store.state.app.menuRouteLoaded;
      if (loadedMenu) {
        next();
      } else {
        try {
          // 夹在动态菜单和路由
          addDynamicMenuAndRoutes();
          next();
        } catch (error) {
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

/**
 * 设置IFrame嵌套页面地址
 */
function handleIFrameUrl(path: string | null) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path;
  const length = store.state.iframe.iframeUrls.length;
  for (let i = 0; i < length; i++) {
    const iframe = store.state.iframe.iframeUrls[i];
    if (path != null && path.endsWith(iframe.path)) {
      url = iframe.url;
      store.commit("iframe/setIFrameUrl", url);
      break;
    }
  }
}
