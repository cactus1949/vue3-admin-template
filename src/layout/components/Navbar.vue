<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';


import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Screenfull from '@/components/Screenfull/index.vue';
import SizeSelect from '@/components/SizeSelect/index.vue';
import LangSelect from '@/components/LangSelect/index.vue';
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
      class="flex justify-start"
      v-if="device === 'mobile' || settingsStore.layout === 'left'"
    >
      <!-- 面包屑导航栏 -->
      <breadcrumb />
    </div>

    <mix-nav v-if="device !== 'mobile' && settingsStore.layout === 'mix'" />

    <div
      v-if="device === 'mobile' || settingsStore.layout === 'left'"
      class="flex justify-start"
    >
      <div v-if="device !== 'mobile'" class="flex justify-center items-center">

        <!--语言选择-->
        <lang-select />
      </div>


    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-dropdown {
  font-size: 18px;
}

.navbar {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.2);
}
</style>
