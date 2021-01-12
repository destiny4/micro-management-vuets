
/*
 * 状态管理统一集成模块
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
<% maps.forEach(function(item,key){ %>
import <%= key %> from '<%= item.split('.')[0] %>'
<% }); %>
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    <%= keys.join(", ") %>
  },
  getters
})

export default store

