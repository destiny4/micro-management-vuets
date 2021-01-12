const getters = {
  sidebar: (state: any) => state.app.sidebar,
  device: (state: any) => state.app.device,
  token: (state: any) => state.user.token,
  avatar: (state: any) => state.user.avatar,
  name: (state: any) => state.user.name,
  permission_routes: (state: any) => state.permission.routes,
};
export default getters;
