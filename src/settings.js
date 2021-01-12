module.exports = {
  // 页面名称
  title: 'micro-management',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,
  // 头像
  avatar:
    'https://pic4.zhimg.com/v2-3be05963f5f3753a8cb75b6692154d4a_1440w.jpg?source=172ae18b',
  apolloApiRoot: 'http://serveurl/auth',
  // 业务类型
  userBusinessID: 'business_center',
  menuBusinessID: 'menu_common_platform_user',
  // 是否多租户,启用多租户模式，登录界面将多一个业务类型选择栏
  multiTenant: false,
  showSettings: false,
}
