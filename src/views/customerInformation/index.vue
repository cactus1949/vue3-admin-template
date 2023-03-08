<script lang="ts">
export default {
  name: 'CustomerInformation'
};
</script>

<script setup lang="ts">
import { 
  reactive, 
  ref, 
  toRefs, 
  onMounted,
  watchEffect,
  defineAsyncComponent
} from 'vue';
// components
import Breadcrumb from '@/components/Breadcrumb/index.vue';
// const CustomerTable = defineAsyncComponent(()=>import("./pages/customerTable.vue"))
import CustomerTable from './pages/customerTable.vue'
import BlocCustomerTable from './pages/blocCustomerTable.vue'

type stringKey = Record<string,object>
const componentMap: stringKey = {
  'CustomerTable': CustomerTable,
  'BlocCustomerTable': BlocCustomerTable
}


//
const state = reactive({
  tabList: [
    {
      label: '客户信息库',
      name: 'CustomerTable'
    },
    {
      label: '集团信息库',
      name: 'BlocCustomerTable'
    }
  ],
  activeName: 'CustomerTable'
});
const { 
  tabList, 
  activeName
} = toRefs(state);



onMounted(() => {
})

</script>

<template>
  <div class="app-container">
    <!-- 面包屑 -->
    <Breadcrumb />
    <!-- 标签页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        v-for="item in tabList"
        :key="item.name"
      ></el-tab-pane>
    </el-tabs>
    <!-- 表格 -->
    <component :is="componentMap[activeName]"></component>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.app-container {
  .filter-container {
    padding-top: 20px;
  }
  .table-header-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    background: #F9FAFD;
    padding: 0 11px 0 18px;
    border-top: 1px solid #DEE4F8;
    .table-header-title{
      color: #0E1050;
      font-size: 16px;
      font-weight: 500;
    }
    .control-btns{
      font-size: 16px;
      .el-icon{
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
  .table-footer-container{
    margin: 20px 0;
  }
}
</style>
