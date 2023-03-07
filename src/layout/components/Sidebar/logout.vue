<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useAppStore } from '@/store/modules/app';
import { useUserStore } from '@/store/modules/user';
import { useRoute, useRouter } from 'vue-router';

const appStore = useAppStore();

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore
      .logout()
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
}
</script>

<template>
    <div class="logout-container" @click="logout">
        <svg-icon class-name="international-icon" icon-class="language" />
    </div>
</template>

<style lang="scss" scoped>
@import 'src/styles/variables.module';
.logout-container{
    position: absolute;
    cursor: pointer;
    color: white;
    right: 28px;
    bottom: 38px;
    padding: 10px;
    .svg-icon{
        margin: 0!important;
        font-size: $fontOneSize;
    }
}
</style>

