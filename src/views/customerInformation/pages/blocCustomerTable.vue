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
    getBlocCustomerList
} from '@/api/blocCustomer'

// types
import {
    BlocCustomerFilterMap,
    BlocCustomerTableItem
} from '@/api/blocCustomer/types'

//
const state = reactive({
    tableData: [] as BlocCustomerTableItem[],
    total: 0,
    pageQuery: {
        pageIndex: 1,
        pageSize: 10
    } as PageQuery,
    queryForm: {
        name: '',
        ids: []
    } as BlocCustomerFilterMap,
    loading: false,
});
const {
    tableData,
    pageQuery,
    total,
    loading,
    queryForm
} = toRefs(state);


const queryFormRef = ref(ElForm); // 查询表单

/**
 * 查询
 */
function queryBlocCustomer() {
    state.loading = true;
    getBlocCustomerList({
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
function resetQueryCustomer() {
    queryFormRef.value.resetFields();
    queryBlocCustomer()
}


const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<BlocCustomerTableItem[]>([])
const toggleSelection = (rows?: BlocCustomerTableItem[]) => {
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
const handleSelectionChange = (val: BlocCustomerTableItem[]) => {
    multipleSelection.value = val
}




onMounted(() => {
    // 初始化客户信息库 列表数据
    queryBlocCustomer()
})
</script>

<template>
    <div class="table-container">
        <!-- 筛选 -->
        <div class="filter-container">
            <el-form :model="queryForm" ref="queryFormRef">
                <el-row :gutter="16">
                    <!-- 客户名称 -->
                    <el-col :span="6">
                        <el-form-item prop="name">
                            <el-input v-model="queryForm.name" placeholder="集团客户名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="6">
                        <div class="search-btns flex justify-end">
                            <el-button type="search" @click="queryBlocCustomer">搜索</el-button>
                            <el-button type="reset" @click="resetQueryCustomer">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 表格 -->
        <div class="table-header-container">
            <div class="table-header-title">集团客户信息</div>
            <div class="control-btns">
                <el-tooltip effect="dark" content="添加" placement="bottom">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-tooltip>
                <el-tooltip effect="dark" content="导出" placement="bottom">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-tooltip>
            </div>
        </div>
        <el-table ref="multipleTableRef" :data="tableData" v-loading="loading" height="500px" stripe style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" show-overflow-tooltip label="集团客户" />
            <el-table-column property="englishName" show-overflow-tooltip label="外文名称" />
            <el-table-column property="description" show-overflow-tooltip label="简介" />
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button link type="primary" size="small">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-footer-container">
            <Pagination v-model:page="pageQuery.pageIndex" v-model:limit="pageQuery.pageSize" :total="total"
                @pagination="queryBlocCustomer" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.table-container {
    .filter-container {
        padding-top: 20px;
    }

    .table-header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 64px;
        background: #F9FAFD;
        padding: 0 11px 0 18px;
        border-top: 1px solid #DEE4F8;

        .table-header-title {
            color: #0E1050;
            font-size: 16px;
            font-weight: 500;
        }

        .control-btns {
            font-size: 16px;

            .el-icon {
                margin-right: 20px;
                cursor: pointer;
            }
        }
    }


    .table-footer-container {
        margin: 20px 0;
    }
}
</style>
