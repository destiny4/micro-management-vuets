import Com from "./main/index.vue";
//@ts-ignore
Com.install = (Vue) => {
  Vue.component(Com.name, Com);
};
export default Com;
