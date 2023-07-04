export type StoreState = {
  settingTab: string;
  setting: Object;
  currentSetting: Object;

};

export type StoreAction = {
  type: actionType
  payload?: Object;
  tab?: string;
};

export type StoreContextType = {
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
};


export enum actionType {
  SET_NEW_SETTING = 'SET_NEW_SETTING',
  SET_INIT_SETTING = 'SET_INIT_SETTING',
  SET_SETTING_TAB = 'SET_SETTING_TAB',
}