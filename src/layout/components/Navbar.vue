<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';


import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Screenfull from '@/components/Screenfull/index.vue';
import SizeSelect from '@/components/SizeSelect/index.vue';
import LangSelect from '@/components/LangSelect/index.vue';
import BigSearch from '@/components/BigSearch/index.vue';
import Greetings from '@/components/Greetings/index.vue';
import MixNav from './Sidebar/MixNav.vue';
import { CaretBottom } from '@element-plus/icons-vue';

import { useAppStore } from '@/store/modules/app';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useUserStore } from '@/store/modules/user';
import { useSettingsStore } from '@/store/modules/settings';

const appStore = useAppStore();
const tagsViewStore = useTagsViewStore();
const userStore = useUserStore();
const settingsStore = useSettingsStore();

const route = useRoute();
const router = useRouter();

const device = computed(() => appStore.device);


</script>

<template>
  <div class="navbar">
    <div
      v-if="settingsStore.layout === 'left'"
      class="w-[100%] flex justify-between"
    >
      <div class="flex">
        <!-- 大搜索 -->
        <big-search />
        <!-- 语言选择 -->
        <lang-select />
      </div>
      <greetings />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.el-dropdown {
  font-size: 18px;
}
.navbar {
  // height: 50px;
  padding: 0 70px;
  height: $navBarHeight;
  // z-index: 9999;
  // width: calc(100vw - $sideBarWidth);
  background-color: $mainBgColor;
  // position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.2);
}
</style>
