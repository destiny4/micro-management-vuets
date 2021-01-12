import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";
import Layout from "@/layout/index.vue";
Vue.use(VueRouter);
interface CustomRoute extends RouteConfig {
  hidden: boolean;
}
class CustomRouter extends VueRouter {
  matcher: any;
}
export const constantRoutes: Array<CustomRoute> = [
  {
    path: "/",
    component: Layout,
    hidden: true,
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/base/redirect/redirect.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/base/login/login.vue"),
    hidden: true,
  },
];
export const dynamicRoutes = [
  {
    path: "/theme",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/business/theme/theme.vue"),
        name: "Theme",
        meta: { title: "theme", icon: "theme" },
      },
    ],
  },
];

const createRouter = () =>
  new CustomRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
  store.commit("app/menuRouteLoaded", false);
}

export default router;
