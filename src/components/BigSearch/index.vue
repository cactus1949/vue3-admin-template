<script setup lang="ts">
import { ElMessage } from 'element-plus';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useAppStore } from '@/store/modules/app';

import LangSelect from '@/components/LangSelect/index.vue';

import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const keyword = ref('')

const appStore = useAppStore();

</script>

<template>
  <el-input
    v-model="keyword"
    placeholder="搜索相关内容"
    :prefix-icon="Search"
  />
</template>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
::v-deep.el-input{
  height: 48px;
  width: 413px;
  .el-input__wrapper{
    border-radius: 24px; 
    background: #F9FBFF;
    box-shadow: none;
    .el-input__inner{
      font-size: $fontNormalSize;
    }
  }
}
</style>
