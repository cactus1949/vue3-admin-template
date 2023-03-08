declare global {
  interface PageQuery {
    pageIndex: number;
    pageSize: number;
  }
  type TabItem<T> = {
    label: T;
    name: string | number;
  }

  interface PageResult<T> {
    list: T;
    total: number;
  }
  type DialogType = {
    title?: string;
    visible: boolean;
  };

  type OptionType<T> = {
    value: T;
    label: string;
    checked?: boolean;
    children?: OptionType[];
  };

  export interface TableReturns<T> {
    pageIndex: string
    pageSize: string
    records: T[]
    total: string
  }
}
export {};
