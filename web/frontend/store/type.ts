import {payloadObject} from "./actions";
import Setting from "../types/Setting";
// import Setting from "../types/Setting"

export type StoreState = {
    settingTab: string[];
    setting: Setting;
    currentSetting: Setting;
}
export type StoreAction = {
    type: actionType
    payload?: Object;
    tab?: payloadObject;
};

export type StoreContextType = {
    state: StoreState;
    dispatch: React.Dispatch<StoreAction>;
};


export enum actionType {
    SET_NEW_SETTING = 'SET_NEW_SETTING',
    SET_INIT_SETTING = 'SET_INIT_SETTING',
    RESET_NEW_SETTING = 'RESET_NEW_SETTING',
    SET_SETTING_TAB = 'SET_SETTING_TAB',
}