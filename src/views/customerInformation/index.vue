<script lang="ts">
export default {
  name: 'CustomerInformation'
};
</script>

<script setup lang="ts">
// components
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref, toRefs } from 'vue';

//
const state = reactive({
  tabList: [
    {
      label: '客户信息库',
      name: '1'
    },
    {
      label: '集团信息库',
      name: '2'
    }
  ],
  activeName: '1'
});

import { ElTable } from 'element-plus'


const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

interface User {
  date: string
  name: string
  address: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
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
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const { tabList, activeName } = toRefs(state);


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
    <!-- 筛选 -->
    <div class="filter-container">
      <el-row :gutter="16">
        <el-col :span="3">
          <el-input v-model="keyword" placeholder="客户名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="keyword" placeholder="客户名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="keyword" placeholder="客户名称" />
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
            size="small"
            v-model="attribute"
            placeholder="国家/地区"
            filterable
          >
            <el-option
              :label="$t('Customer.DirectCooperation')"
              :value="1"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <div class="search-btns flex justify-end">
            <el-button type="search">搜索</el-button>
            <el-button type="reset">重置</el-button>
          </div>
        </el-col>
      </el-row>
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
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="Date">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="Name" />
      <el-table-column
        property="address"
        label="Address"
        show-overflow-tooltip
      />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-footer-container">
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="->,total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.app-container {
  .filter-container {
    padding-top: 20px;
    .el-col {
      margin-bottom: 20px;
    }
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
