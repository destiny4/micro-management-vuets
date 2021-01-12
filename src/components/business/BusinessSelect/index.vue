<template>
  <div class="container">
    <section class="select">
      <el-select
        v-model="business"
        clearable
        placeholder="请选择业务类型"
        @change="onChange"
      >
        <el-option
          v-for="it in filterBusinessList"
          :key="it.business_id"
          :label="it.business_name"
          :value="it.business_id"
        />
      </el-select>
    </section>
    <section class="exhibition">
      <el-tag type="success">当前选中业务名称:{{ businessDetial.business_name }}</el-tag>
      <el-tag type="success">当前选中业务Id:{{ businessDetial.business_id }}</el-tag>
    </section>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const System = createNamespacedHelpers('system')
export default {
  name: 'BussinessSelect',
  data() {
    return {
      bussinessList: []
    }
  },
  computed: {
    ...System.mapState({
      Business: 'business',
      BusinessList: 'businessList',
      BusinessDetial: 'businessDetial'
    }),
    business: {
      get() {
        // 过滤菜单管理和其他
        const ids = this.filterBusinessList.map(it => it.business_id)
        return ids.includes(this.Business) ? this.Business : ''
      },
      set(v) {
        this.setBusiness({ type: 'update', payload: v })
      }
    },
    filterBusinessList() {
      // 过滤菜单管理和其他
      const { name } = this.$route
      const business_scene = name === 'MenuAdmin' ? 'menu' : 'business'
      return this.BusinessList.filter(it => it.business_scene === business_scene)
    },
    businessDetial() {
      const temp = { business_name: '', businessDetial: '' }
      return this.BusinessDetial ? this.BusinessDetial : temp
    }
  },
  mounted() {
    this.getBusinessList()

    this.setBusiness({
      type: 'init'
    })

    this.setBusinessDetail({
      type: 'update',
      payload: this.business
    })
  },
  methods: {
    ...System.mapActions({
      getBusinessList: 'getBusinessList'
    }),
    ...System.mapMutations({
      setBusiness: 'SET_BUSINESS',
      setBusinessDetail: 'SET_BUSINESSDETAIL'
    }),
    onChange(val) {
      this.setBusinessDetail({ type: 'update', payload: val })
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display:flex;
  align-items: center;
  padding-bottom: 10px;
  .exhibition{
    padding-left: 2em;
    .el-tag{
      margin-right: 2em;
    }
  }
}
</style>
