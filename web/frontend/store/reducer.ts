import {StoreAction, StoreState} from "./type";

const ActionTypes = {
    SET_INIT_SETTING: "SET_INIT_SETTING",
    SET_NEW_SETTING: "SET_NEW_SETTING",
    RESET_NEW_SETTING: "RESET_NEW_SETTING",
    SET_SETTING_TAB: 'SET_SETTING_TAB',
};

// initial state
const initialState = {
    setting: null,
    currentSetting: null,
    settingTab: ['configSetting'],
};

// Reducer
const reducer = (state: StoreState, action: StoreAction): StoreState => {
    switch (action.type) {
        // SET INIT SETTING
        case ActionTypes.SET_INIT_SETTING:
            const setting = {...action.payload}
            return {...state, setting: { ...state.setting, ...setting }, currentSetting: null};
        // UPDATE NEW SETTING
        case ActionTypes.SET_NEW_SETTING:
          const initSetting = state.setting;
          const newSeting = action.payload;
          let currentSetting = {...state.currentSetting, ...action.payload}
          for (const key in initSetting) {
            if ((newSeting[key] !== null && newSeting[key] !== undefined) && newSeting[key] === initSetting[key]) {
              delete currentSetting[key];
            }
          }
          if (Object.keys(currentSetting).length === 0) {
            currentSetting = null;
          } 
            return {...state, ...{currentSetting}};
        // RESET NEW SETTING
        case ActionTypes.RESET_NEW_SETTING:
            return {...state, ...{currentSetting: null}};
        // SET ACTIVE TAB//PREVIEW
        case ActionTypes.SET_SETTING_TAB:
            let tabs = state.settingTab;
            if (action.tab.add) {
                if (!tabs.includes(action.tab.tab)) {
                    tabs.push(action.tab.tab)
                }
            } else {
              tabs = tabs.filter(tab => tab !== action.tab.tab)
            }
            return {...state, settingTab: tabs};
        default:
            return state;
    }
};

export {initialState}
export default reducer;
