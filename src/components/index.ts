// 自动注册 business 下面的 组件
const context = require.context("./base", true, /index.js/);
const components: any[] = [];
context.keys().forEach((item) => {
  const comp = context(item).default;
  components.push(comp);
});
// export
const register = {
  install: (Vue: any) => {
    components.forEach((item) => {
      Vue.use(item);
    });
  },
};
export default register;
