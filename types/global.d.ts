declare global {
  interface PageQuery {
    pageNum: number;
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

  type OptionType = {
    value: string;
    label: string;
    checked?: boolean;
    children?: OptionType[];
  };
}
export {};
