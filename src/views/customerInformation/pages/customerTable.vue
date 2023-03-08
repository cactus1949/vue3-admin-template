<script lang="ts">
export default {
  name: 'CustomerTable'
};
</script>

<script setup lang="ts">
// components
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import { Plus } from '@element-plus/icons-vue'
import Pagination from '@/components/Pagination/index.vue';
import { 
  reactive, 
  ref, 
  toRefs, 
  onMounted
} from 'vue';
import { ElTable, ElForm } from 'element-plus'

// api
import {
  getCustomerList
} from '@/api/customer'

// types
import {
  CustomerTableItem,
  CustomerFilterMap,
  Product
} from '@/api/customer/types'

//
const state = reactive({
  tableData: [] as CustomerTableItem[],
  total: 0,
  pageQuery: {
    pageIndex: 1,
    pageSize: 10
  } as PageQuery,
  queryForm: {
    customerName: "",
    blocCustomerName: "",
    productName: "",
    countryName: "", // 国家/地区
    areaName: "", 
    isAgreement: "",
    isAgreementMoney: "",
    type: "",
    classify: "",
    attribute: "", // 合作方式
    isProxy: "", // 是否通过代理
    isEffective: "", // 有效客户
    isInfoCustomer: "", // 纯信息用户
    isChineseInvested: "", // 中资机构/华文媒体
    sustainChinese: "", // 知华友华
    isRoad: "",
    branchId: "", // 分社名称
    customerAttribute: "", // 客户属性
    minceCustomerAttribute: "", // 细分属性
    mainMedia: "" // 重要程度
  } as CustomerFilterMap,
  loading: false,
  attributeList: [
    {
      label: '直接',
      value: 1
    },
    {
      label: '间接',
      value: 0
    },
  ] as OptionType<number>[], // 合作方式 下拉选项
  isTureList: [
    {
      label: '是',
      value: true
    },
    {
      label: '否',
      value: false
    }
  ] as OptionType<boolean>[], // 是否 下拉选项（true false）
  isEffectiveList: [
    {
      label: '有效',
      value: true
    },
    {
      label: '无效',
      value: false
    }
  ] as OptionType<boolean>[], // 有效客户 下拉选项
  sustainChineseList: [
    {
      label: '友华',
      value: 2
    },
    {
      label: '知华',
      value: 1
    },
    {
      label: '中立',
      value: 3
    },
    {
      label: '对立',
      value: 4
    },
  ] as OptionType<number>[], // 知华友华 下拉选项
  customerAttributeList: [
    {
      label: '媒体',
      value: 1
    },
    {
      label: '非媒体',
      value: 2
    },
  ] as OptionType<number>[], // 客户属性 下拉选项
  mainMediaList: [
    {
      label: '国际知名媒体/机构',
      value: 1
    },
    {
      label: '本国主流媒体/机构',
      value: 2
    },
    {
      label: '普通媒体/机构',
      value: 3
    },
    {
      label: '省级媒体/机构',
      value: 4
    },
    {
      label: '市级媒体/机构',
      value: 5
    },
    {
      label: '县级媒体/机构',
      value: 6
    },
  ] as OptionType<number>[], // 重要程度 下拉选项
  editedAuditStatusList: [
    "", 
    "已修改，待审核", 
    "已修改，未提交"
  ] as string[], // 客户状态
});
const {
  tableData,
  pageQuery,
  total,
  loading,
  queryForm,
  isTureList,
  isEffectiveList,
  sustainChineseList,
  mainMediaList,
  customerAttributeList,
  editedAuditStatusList,
  attributeList
} = toRefs(state);


const queryFormRef = ref(ElForm); // 查询表单

/**
 * 查询
 */
function queryCustomer() {
  state.loading = true;
  getCustomerList({
    filterMap: {
      ...state.queryForm
    },
    ...state.pageQuery
  }).then((res) => {
    state.tableData = res.data.records;
    state.total = +res.data.total;
    state.loading = false;
  });
}

/**
 * 重置
 */
function resetQueryCustomer(){
  queryFormRef.value.resetFields();
  queryCustomer()
}

/**
 * switchProducts
 * 
 */
function switchProducts(products?: Product[]):string{
  if(products?.length){
    return products.map(o=>o.name).join(',')
  }else{
    return ''
  }
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<CustomerTableItem[]>([])
const toggleSelection = (rows?: CustomerTableItem[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: CustomerTableItem[]) => {
  multipleSelection.value = val
}




onMounted(() => {
  // 初始化客户信息库 列表数据
  queryCustomer()
})
</script>

<template>
  <div class="table-container">
    <!-- 筛选 -->
    <div class="filter-container">
      <el-form :model="queryForm" ref="queryFormRef">
        <el-row :gutter="16">
          <!-- 客户名称 -->
          <el-col :span="3">
            <el-form-item prop="customerName">
              <el-input v-model="queryForm.customerName" placeholder="客户名称" />
            </el-form-item>
          </el-col>
          <!-- 集团客户名称 -->
          <el-col :span="3">
            <el-form-item prop="blocCustomerName">
              <el-input v-model="queryForm.blocCustomerName" placeholder="集团客户名称" />
            </el-form-item>
          </el-col>
          <!-- 产品名称 -->
          <el-col :span="3">
            <el-form-item prop="productName">
              <el-input v-model="queryForm.productName" placeholder="产品名称" />
            </el-form-item>
          </el-col>
          <!-- 国家/地区 -->
          <el-col :span="3">
            <el-form-item prop="countryName">
              <el-select
                class="w-[100%]"
                size="small"
                v-model="queryForm.countryName"
                placeholder="国家/地区"
                filterable
              >
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 合作方式 -->
          <el-col :span="3">
            <el-form-item prop="attribute">
              <el-select
                size="small"
                v-model="queryForm.attribute"
                placeholder="合作方式"
                filterable
              >
                <el-option
                  v-for="item in attributeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 是否通过代理 -->
          <el-col :span="3">
            <el-form-item prop="isProxy">
              <el-select
                size="small"
                v-model="queryForm.isProxy"
                placeholder="是否通过代理"
                filterable
              >
                <el-option
                  v-for="item in isTureList"
                  :key="'isProxy'+item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 有效客户 -->
          <el-col :span="3">
            <el-form-item prop="isEffective">
              <el-select
                size="small"
                v-model="queryForm.isEffective"
                placeholder="有效客户"
                filterable
              >
                <el-option
                  v-for="item in isEffectiveList"
                  :key="'isEffective'+item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 纯信息用户 -->
          <el-col :span="3">
            <el-form-item prop="isInfoCustomer">
              <el-select
                size="small"
                v-model="queryForm.isInfoCustomer"
                placeholder="纯信息用户"
                filterable
              >
                <el-option
                  v-for="item in isTureList"
                  :key="'isInfoCustomer'+item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 知华友华 -->
          <el-col :span="3">
            <el-form-item prop="sustainChinese">
              <el-select
                size="small"
                v-model="queryForm.sustainChinese"
                placeholder="知华友华"
                filterable
              >
                <el-option
                  v-for="item in sustainChineseList"
                  :key="'sustainChinese'+item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 客户属性 -->
          <el-col :span="3">
            <el-form-item prop="customerAttribute">
              <el-select
                size="small"
                v-model="queryForm.customerAttribute"
                placeholder="客户属性"
                filterable
              >
                <el-option
                  v-for="item in customerAttributeList"
                  :key="'customerAttribute'+item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 分社名称 -->
          <el-col :span="3">
            <el-form-item prop="branchId">
              <el-select
                size="small"
                v-model="queryForm.branchId"
                placeholder="分社名称"
                filterable
              >
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 细分属性 -->
          <el-col :span="3">
            <el-form-item prop="minceCustomerAttribute">
              <el-select
                size="small"
                v-model="queryForm.minceCustomerAttribute"
                placeholder="细分属性"
                filterable
              >
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 重要程度 -->
          <el-col :span="3">
            <el-form-item prop="mainMedia">
              <el-select
                size="small"
                v-model="queryForm.mainMedia"
                placeholder="重要程度"
                filterable
              >
                <el-option
                  v-for="item in mainMediaList"
                  :key="'mainMedia'+item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 中资机构/华文媒体 -->
          <el-col :span="3">
            <el-form-item prop="isChineseInvested">
              <el-select
                size="small"
                v-model="queryForm.isChineseInvested"
                placeholder="中资机构/华文媒体"
                filterable
              >
                <el-option
                  v-for="item in isTureList"
                  :key="'isChineseInvested'+item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 一带一路国家 -->
          <el-col :span="3">
            <el-form-item prop="isRoad">
              <el-select
                size="small"
                v-model="queryForm.isRoad"
                placeholder="一带一路国家"
                filterable
              >
                <el-option
                  v-for="item in isTureList"
                  :key="'isRoad'+item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <div class="search-btns flex justify-end">
              <el-button type="search" @click="queryCustomer">搜索</el-button>
              <el-button type="reset" @click="resetQueryCustomer">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="table-header-container">
      <div class="table-header-title">客户信息</div>
      <div class="control-btns">
        <el-tooltip
          effect="dark"
          content="新增"
          placement="bottom"
        >
          <el-icon><Plus /></el-icon>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="新增"
          placement="bottom"
        >
          <el-icon><Plus /></el-icon>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="新增"
          placement="bottom"
        >
          <el-icon><Plus /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      v-loading="loading"
      height="500px"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" show-overflow-tooltip label="客户名称" fixed width="200"/>
      <el-table-column property="englishName" show-overflow-tooltip label="外文名称" width="200" />
      <el-table-column property="editedAuditStatus" label="状态" width="200">
        <template #default="scope">{{ editedAuditStatusList[scope.row.editedAuditStatus] }}</template>
      </el-table-column>
      <el-table-column property="countryName" label="国家/地区" width="200" />
      <el-table-column property="name" show-overflow-tooltip label="联系人" width="200" />
      <el-table-column property="products" label="产品名称" width="200" show-overflow-tooltip>
        <template #default="scope">{{ switchProducts(scope.row.products) }}</template>
      </el-table-column>
      <el-table-column property="blocCustomerName" label="集团客户名称" width="200" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
          >
            查看
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer-container">
      <Pagination
        v-model:page="pageQuery.pageIndex"
        v-model:limit="pageQuery.pageSize"
        :total="total"
        @pagination="queryCustomer"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.table-container {
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
