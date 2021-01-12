import { login, logout } from "@/api/base/user";
import { getLoginInfo, setLoginInfo, removeLoginInfo } from "@/utils/auth";
import { resetRouter } from "@/router";
import md5 from "js-md5";
import defaultSettings from "@/settings.js";

const getDefaultState = () => {
  const loginInfo = getLoginInfo() || {};
  return {
    token: loginInfo.token,
    name: loginInfo.name,
    busid: loginInfo.busid,
    tenid: loginInfo.tenid,
    avatar:
      defaultSettings.avatar ||
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    perms: loginInfo.perms || [], // 用户权限标识集合
    roles: loginInfo.roles || [], // map集合
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state: any) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state: any, token: any) => {
    state.token = token;
  },
  SET_BUSID: (state: any, busid: any) => {
    state.busid = busid;
  },
  SET_TENID: (state: any, tenid: any) => {
    state.tenid = tenid;
  },
  SET_NAME: (state: any, name: any) => {
    state.name = name;
  },
  SET_AVATAR: (state: any, avatar: any) => {
    state.avatar = avatar;
  },
  setPerms(state: any, perms: any) {
    // 用户权限标识集合
    state.perms = perms;
  },
  setRoles(state: any, roles: any) {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login(
    { commit }: any,
    userInfo: { username: any; password: any; tenantid: any }
  ) {
    const { username, password, tenantid } = userInfo;
    return new Promise((resolve, reject) => {
      const busid = defaultSettings.userBusinessID;
      const tenid = tenantid;
      login({
        business_id: busid,
        tenant_id: tenid,
        operator_id: username.trim(),
        type: 1,
        passwd_md5double: md5(password).toLowerCase(),
      })
        .then((res) => {
          //@ts-ignore
          commit("SET_TOKEN", res.operator_token);
          commit("SET_NAME", username);
          //@ts-ignore
          commit("setPerms", res.perms_id_list);
          //@ts-ignore
          commit("setRoles", res.role_id_list);
          commit("SET_BUSID", busid);
          commit("SET_TENID", tenid);
          //@ts-ignore
          const loginInfo = {
            //@ts-ignore
            token: res.operator_token,
            //@ts-ignore
            perms: res.perms_id_list,
            //@ts-ignore
            roles: res.role_id_list,
            name: username,
            busid: busid,
            tenid: tenid,
          };
          setLoginInfo(loginInfo);
          //@ts-ignore
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }: any) {
    return new Promise((resolve, reject) => {
      logout({
        business_id: state.busid,
        tenant_id: state.tenid,
        operator_id: state.name,
        operator_token: state.token,
      })
        .then(() => {
          removeLoginInfo();
          resetRouter();
          commit("RESET_STATE");
          //@ts-ignore
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }: any) {
    return new Promise((resolve) => {
      removeLoginInfo();
      commit("RESET_STATE");
      //@ts-ignore
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
