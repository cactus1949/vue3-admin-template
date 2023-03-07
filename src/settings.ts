interface DefaultSettings {
  title: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  errorLog: string;
  layout: string;
  theme: string;
}

const defaultSettings: DefaultSettings = {
  title: '海外用户关系管理系统',
  showSettings: false,
  tagsView: false,
  fixedHeader: false,
  sidebarLogo: false,
  errorLog: 'production',
  layout: 'left',
  theme: 'light'
};

export default defaultSettings;
