import { defineStore } from 'pinia';

import { getToken, setToken, removeToken } from '@/utils/auth';
import { loginApi, logoutApi } from '@/api/auth';
import { getUserInfo } from '@/api/user';
import { resetRouter } from '@/router';
import { store } from '@/store';
import { LoginData } from '@/api/auth/types';
import { ref, reactive } from 'vue';
import { UserInfo } from '@/api/user/types';

export const useUserStore = defineStore('user', () => {
  // state
  const token = ref<string>(getToken() || '');
  const userInfo = reactive<UserInfo>({
    userName: '',
    roleName: '',
    branchId: '',
    branchName: '',
    email: '',
    id: '',
    roleId: '',
    areas: [],
    countrys: []
  });


  // actions
  // 登录
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then(response => {
          const { token: accessToken } = response.data;
          token.value = accessToken
          setToken(accessToken);
          console.log('登录成功',getToken())
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 获取信息(用户名 用户等级 区域 分社 国家...)
  function getInfo() {
    console.log('getInfo start')
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          console.log('getUserInfo: ',data)
          if (!data) {
            return reject('Verification failed, please Login again.');
          }
          const {
            areas,
            branchId,
            branchName,
            userName,
            roleName,
            email,
            id,
            roleId,
            countrys,
            createTime,
            password
          } = data;
          userInfo.areas = areas;
          userInfo.branchId = branchId;
          userInfo.branchName = branchName;
          userInfo.userName = userName;
          userInfo.roleName = roleName;
          userInfo.roleId = roleId;
          userInfo.countrys = countrys;
          userInfo.id = id;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 注销
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          resetRouter();
          resetToken();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 重置
  function resetToken() {
    removeToken();
    token.value = '';
    userInfo.userName = ''
    userInfo.roleName = ''
    userInfo.branchId = ''
    userInfo.branchName = ''
    userInfo.email = ''
    userInfo.id = ''
    userInfo.roleId = ''
    userInfo.areas = []
    userInfo.countrys = []
  }

  
  return {
    token,
    userInfo,
    login,
    getInfo,
    logout,
    resetToken
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
