/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(
  roles: any[],
  route: { meta: { roles: string | any[] } }
) {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: any[], roles: any) {
  const res: any[] = [];

  routes.forEach((route: any) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  setRoutes: (state: { routes: any }, routes: any) => {
    state.routes = routes;
  },
};

const actions = {
  func({ commit }: any) {
    commit("mu_func");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
