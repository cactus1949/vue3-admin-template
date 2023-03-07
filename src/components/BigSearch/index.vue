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
    class="w-50 m-2"
    placeholder="Type something"
    :prefix-icon="Search"
  />
</template>
