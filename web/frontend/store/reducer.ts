import {StoreAction, StoreState} from "./type";

const ActionTypes = {
    SET_INIT_SETTING: "SET_INIT_SETTING",
    SET_NEW_SETTING: "SET_NEW_SETTING",
    SET_SETTING_TAB: 'SET_SETTING_TAB',
};

// Khởi tạo state ban đầu
const initialState = {
    setting: {},
    currentSetting: {},
    settingTab: ['configSetting'],
};

// Reducer
const reducer = (state: StoreState, action: StoreAction): StoreState => {
    switch (action.type) {
        // SET INIT SETTING
        case ActionTypes.SET_INIT_SETTING:
            const setting = {...state.setting, ...action.payload}
            return {...state, ...{setting}};
        // UPDATE NEW SETTING
        case ActionTypes.SET_NEW_SETTING:
            const currentSetting = {...state.currentSetting, ...action.payload}
            console.log(currentSetting)
            return {...state, ...{currentSetting}};
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
