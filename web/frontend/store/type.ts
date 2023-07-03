type StoreState = {
  settingTab: string;
  setting: Object;
  currentSetting: Object;

};

type StoreAction = {
  type: 'SET_INIT_SETTING' | 'SET_NEW_SETTING' | 'SET_SETTING_TAB';
  payload?: Object;
  tab?: string;
};

type StoreContextType = {
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
};
