/**
 * 客户信息查询参数
 */
export interface CustomerQuery extends PageQuery {
    filterMap: CustomerFilterMap
}

export interface CustomerFilterMap {
  customerName: string
  blocCustomerName: string
  productName: string
  countryName: string
  areaName: string
  isAgreement: string
  isAgreementMoney: string
  type: string
  classify: string
  attribute: number | string
  isProxy: boolean | string
  isEffective: boolean | string
  isInfoCustomer: boolean | string
  isChineseInvested: boolean | string
  sustainChinese: number | string
  isRoad: boolean | string
  branchId: string
  customerAttribute: number | string
  minceCustomerAttribute: number | string
  mainMedia: number | string
}

/**
 * 客户
 */
export interface CustomerTableItem {
    address: string
    attribute: number
    beginTime: any
    blocCustomerId: any
    blocCustomerName: string
    bracheName: string
    branchId: string
    circulation: any
    contacts: Contact[]
    countryId: string
    countryName: string
    createTime: string
    customerAttribute: number
    dau: any
    description: string
    domainName: string[]
    domains: Domain[]
    downNum: any
    editedAuditStatus: number
    endTime: any
    englishName: string
    firstSignTimeStr: string
    googleMapUrl: string
    id: string
    isChineseInvested: boolean
    isInfoCustomer: boolean
    isOriginalDb: boolean
    isProxy: boolean
    isRoad: boolean
    mainMedia: number
    minceCustomerAttribute: number
    monthPicNum: any
    name: string
    phoneNum: string[]
    platformUserAreaName: string[]
    products: Product[]
    proxyName: string
    saleProcessId: string
    signTime: string
    sustainChinese: number
    uniqueUserNum: any
    updateFlag: any
  }
  
  export interface Contact {
    blocCustomerId: string
    blocCustomerName: string
    customerId: string
    customerName: string
    duties: string
    editedAuditStatus: any
    email: string[]
    englishName: string
    id: string
    name: string
    phoneNum: PhoneNum[]
  }
  
  export interface PhoneNum {
    extensionNum: string
    phone: string
  }
  
  export interface Domain {
    channelType: number
    domainUrl: string
  }
  
  export interface Product {
    createTime: string
    id: string
    index: any
    language: string
    languageId: string
    name: string
    normalPrice: string
    quotedPrice: string
    typeId: string
    typeName: string
  }
  