import router from "@/router";
import store from "@/store";
// import api from '@/api/'
// import defaultSettings from '@/settings'
// import Layout from '@/layout'
// import { getIFramePath, getIFrameUrl } from '@/utils/iframe'
import { resetRouter, dynamicRoutes } from "@/router";

/**
 * 加载动态菜单和路由
 */
export default async function addDynamicMenuAndRoutes() {
  // 获取菜单树
  // const menuTree = await api.menu.getAll({
  //   'include_deleted': 0,
  //   'business_id': defaultSettings.menuBusinessID
  // })
  // const ownPerms = store.state.user.perms
  // const routes = getRoutes(menuTree.menu_list, ownPerms)
  const routes = dynamicRoutes;
  //@ts-ignore
  routes.push({ path: "*", redirect: "/404", hidden: true });
  store.commit("permission/setRoutes", routes);
  resetRouter();
  router.addRoutes(routes);
  store.commit("app/menuRouteLoaded", true);
  return routes[0].path;
}

// function getRoutes(routes, ownPerms) {
//   const arr = []
//   routes.forEach(item => {
//     const tmp = { children: [] }

//     if (item.info.menu_type === 2) tmp.hidden = true
//     if (item.info.menu_url.indexOf('/') === 0) {
//       item.info.menu_url = item.info.menu_url.substring(1)
//     }

//     // 处理绝对地址，内嵌进iframe
//     const path = getIFramePath(item.info.menu_url)
//     if (path) {
//       tmp.path = path
//       tmp.component = () => resolve => require([`@/views/base/IFrame/iframe`], resolve)
//       // 存储嵌套页面路由路径和访问URL
//       const url = getIFrameUrl(item.url)
//       const iFrameUrl = { 'path': path, 'url': url }
//       store.commit('iframe/addIFrameUrl', iFrameUrl)
//     } else { // 相对路径，就是指向对应页面
//       if (item.info.menu_url === '') {
//         const x = Math.floor(Math.random() * 10000).toString()
//         tmp.path = x
//         tmp.name = x
//       } else {
//         const menuArr = item.info.menu_url.split('/')
//         if (item.info.parent_menu_id === 0) {
//           tmp.component = Layout
//           tmp.redirect = item.info.menu_url
//           tmp.path = `/${menuArr[0]}`
//           tmp.name = menuArr[0]
//         } else {
//           tmp.component = resolve => require([`@/views/${item.info.menu_url}`], resolve)
//           tmp.path = menuArr[menuArr.length - 1]
//           tmp.name = menuArr[menuArr.length - 1]
//         }
//       }
//     }
//     tmp.meta = {
//       title: item.info.menu_name,
//       icon: item.info.menu_icon
//     }
//     if (item.child_list.length > 0) {
//       tmp.children = (getRoutes(item.child_list, ownPerms))
//     }
//     if (ownPerms.includes(item.info.menu_perms)) {
//       arr.push(tmp)
//     }
//     // 如果菜单没有设置权限，直接带入
//     if (!item.info.menu_perms) {
//       arr.push(tmp)
//     }
//   })
//   return arr
// }
