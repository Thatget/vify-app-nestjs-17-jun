import { StoreAction, StoreState } from "./type";

const ActionTypes = {
  SET_INIT_SETTING: "SET_INIT_SETTING",
  SET_NEW_SETTING: "SET_NEW_SETTING",
  SET_SETTING_TAB: 'SET_SETTING_TAB',
};

// Khởi tạo state ban đầu
const initialState = {
  setting: {},
  currentSetting: {},
  settingTab: '',
};

// Reducer
const reducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    // SET INIT SETTING
    case ActionTypes.SET_INIT_SETTING:
      const setting = {...state.setting, ...action.payload}
      return { ...state, ...{ setting } };
    // UPDATE NEW SETTING
    case ActionTypes.SET_NEW_SETTING:
      const currentSetting = { ...state.currentSetting, ...action.payload}
      return { ...state, ...{ currentSetting } };
    // SET ACTIVE TAB//PREVIEW
    case ActionTypes.SET_SETTING_TAB:
      return { ...state, settingTab: action.tab };
    default:
      return state;
  }
};

export { initialState }
export default reducer;
