import router from '@/router';
import { RouteRecordRaw } from 'vue-router';
import { useUserStoreHook } from '@/store/modules/user';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { getToken, setToken, removeToken } from '@/utils/auth';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false }); // 进度条

const permissionStore = usePermissionStoreHook();

// 白名单路由
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = getToken()
  const userStore = useUserStoreHook()
  if (hasToken) {
    // 登录成功，跳转到首页
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasUserInfo = userStore.userInfo.id !== ''
      if (hasUserInfo) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name as any }) : next('/401');
        } else {
          next();
        }
      } else {
        // try {
          const res = await userStore.getInfo();
          next()
        //   const accessRoutes: RouteRecordRaw[] =
        //     await permissionStore.generateRoutes(roles);
        //   accessRoutes.forEach((route: any) => {
        //     router.addRoute(route);
        //   });
        //   next({ ...to, replace: true });
        // } catch (error) {
        //   // 移除 token 并跳转登录页
        //   await userStore.resetToken();
        //   next(`/login?redirect=${to.path}`);
        //   NProgress.done();
        // }
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
