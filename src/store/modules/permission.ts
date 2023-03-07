import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { constantRoutes } from '@/router';
import { store } from '@/store';
import { listRoutes } from '@/api/menu';
import { ref } from 'vue';

const modules = import.meta.glob('../../views/**/**.vue');
export const Layout = () => import('@/layout/index.vue');

const hasPermission = (roleName: string, route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(roleName);
      }
  }
  return false;
};

const filterAsyncRoutes = (routes: RouteRecordRaw[], roleName: string) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach(route => {
    const tmp = { ...route } as any;
    if (hasPermission(roleName, tmp)) {
      if (tmp.component == 'Layout') {
        tmp.component = Layout;
      } else {
        const component = modules[`../../views/${tmp.component}.vue`] as any;
        if (component) {
          tmp.component = component;
        } else {
          tmp.component = modules[`../../views/error-page/404.vue`];
        }
      }
      res.push(tmp);

      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roleName);
      }
    }
  });
  return res;
};

// setup
export const usePermissionStore = defineStore('permission', () => {
  // state
  const routes = ref<RouteRecordRaw[]>([]);
  const addRoutes = ref<RouteRecordRaw[]>([]);

  // actions
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    addRoutes.value = newRoutes;
    console.log('constantRoutes: ',constantRoutes)
    routes.value = constantRoutes.concat(newRoutes);
  }

  function generateRoutes(roleName: string) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      const accessedRoutes = filterAsyncRoutes(constantRoutes, roleName);
      setRoutes(accessedRoutes);
      resolve(accessedRoutes);
      // listRoutes()
      //   .then(response => {
      //     const asyncRoutes = response.data;
      //     const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      //     setRoutes(accessedRoutes);
      //     resolve(accessedRoutes);
      //   })
      //   .catch(error => {
      //     reject(error);
      //   });
    });
  }
  return { routes, setRoutes, generateRoutes };
});

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
