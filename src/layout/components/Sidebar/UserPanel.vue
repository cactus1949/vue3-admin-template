<script lang="ts" setup>
import { ref,reactive } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { UserInfo } from '@/api/user/types';

const userStore = useUserStore()

const userInfo:UserInfo = reactive(userStore.userInfo)


</script>

<template>
  <transition>
    <div class="h-[30vh] text-center justify-center flex flex-col user-panel-container" style="color: white;">
        <p>{{ userInfo.userName }}</p>
        <p>{{ userInfo.areas[0]?.areaName }} | {{ userInfo.countrys[0]?.countryName }}</p>
        <!-- <p>分社：{{ userInfo.branchName }}</p> -->
    </div>
  </transition>
</template>
