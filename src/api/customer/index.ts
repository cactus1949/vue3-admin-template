import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CustomerQuery, Customer, CustomerQueryReturns } from './types';

/**
 * 客户信息库 表格
 *
 * @param data
 */
export function getCustomerList(data?: CustomerQuery): AxiosPromise<CustomerQueryReturns> {
  return request({
    url: '/customer/getPageList',
    method: 'post',
    data
  });
}
