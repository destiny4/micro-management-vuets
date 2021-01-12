import store from "@/store";

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default {
  watch: {
    //@ts-ignore
    $route(route) {
      //@ts-ignore
      if (this.device === "mobile" && this.sidebar.opened) {
        store.dispatch("app/closeSideBar", { withoutAnimation: false });
      }
    },
  },
  beforeMount() {
    //@ts-ignore
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    //@ts-ignore
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    //@ts-ignore
    const isMobile = this.$_isMobile();
    if (isMobile) {
      store.dispatch("app/toggleDevice", "mobile");
      store.dispatch("app/closeSideBar", { withoutAnimation: true });
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        store.dispatch("app/toggleDevice", isMobile ? "mobile" : "desktop");

        if (isMobile) {
          store.dispatch("app/closeSideBar", { withoutAnimation: true });
        }
      }
    },
  },
};
