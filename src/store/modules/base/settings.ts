import defaultSettings from "@/settings.js";

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
};

const mutations = {
  CHANGE_SETTING: (
    state: { [x: string]: any; hasOwnProperty: (arg0: any) => any },
    { key, value }: any
  ) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }: any, data: any) {
    commit("CHANGE_SETTING", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
