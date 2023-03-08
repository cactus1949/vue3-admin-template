import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { BlocCustomerQuery, BlocCustomerTableItem } from './types';

/**
 * 集团客户信息 表格
 *
 * @param data
 */
export function getBlocCustomerList(data?: BlocCustomerQuery): AxiosPromise<TableReturns<BlocCustomerTableItem>> {
  return request({
    url: '/blocCustomer/getPageList',
    method: 'post',
    data
  });
}
