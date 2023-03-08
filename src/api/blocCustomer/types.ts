/**
 * 客户信息查询参数
 */
export interface BlocCustomerQuery extends PageQuery {
    filterMap: BlocCustomerFilterMap
}

export interface BlocCustomerFilterMap {
  name: string
  ids: any[]
}

export interface BlocCustomerTableItem {
  description: string
  englishName: string
  id: string
  index: any
  name: string
}
