import Cookies from "js-cookie";

const state = {
  sidebar: {
    opened: Cookies.get("sidebarStatus")
      ? //@ts-ignore
        !!+Cookies.get("sidebarStatus")
      : true,
    withoutAnimation: false,
  },
  device: "desktop",
  menuRouteLoaded: false, // 菜单和路由是否已经加载
};

const mutations = {
  TOGGLE_SIDEBAR: (state: {
    sidebar: { opened: boolean; withoutAnimation: boolean };
  }) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set("sidebarStatus", "1");
    } else {
      Cookies.set("sidebarStatus", "0");
    }
  },
  CLOSE_SIDEBAR: (
    state: { sidebar: { opened: boolean; withoutAnimation: any } },
    withoutAnimation: any
  ) => {
    Cookies.set("sidebarStatus", "0");
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state: { device: any }, device: any) => {
    state.device = device;
  },
  menuRouteLoaded(state: { menuRouteLoaded: any }, menuRouteLoaded: any) {
    // 改变菜单和路由的加载状态
    state.menuRouteLoaded = menuRouteLoaded;
  },
};

const actions = {
  toggleSideBar(state: any) {
    state.commit("TOGGLE_SIDEBAR");
  },
  closeSideBar(state: any, payload: any) {
    state.commit("CLOSE_SIDEBAR", payload.withoutAnimation);
  },
  toggleDevice({ commit }: any, device: any) {
    commit("TOGGLE_DEVICE", device);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
