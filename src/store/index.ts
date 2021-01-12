
/*
 * 状态管理统一集成模块
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import app from '/Users/chenxiaolong/project/fbi-vue2-test/src/store/modules/base/app'

import iframe from '/Users/chenxiaolong/project/fbi-vue2-test/src/store/modules/base/iframe'

import menu from '/Users/chenxiaolong/project/fbi-vue2-test/src/store/modules/base/menu'

import permission from '/Users/chenxiaolong/project/fbi-vue2-test/src/store/modules/base/permission'

import settings from '/Users/chenxiaolong/project/fbi-vue2-test/src/store/modules/base/settings'

import user from '/Users/chenxiaolong/project/fbi-vue2-test/src/store/modules/base/user'

import data from '/Users/chenxiaolong/project/fbi-vue2-test/src/store/modules/business/data'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app, iframe, menu, permission, settings, user, data
  },
  getters
})

export default store

