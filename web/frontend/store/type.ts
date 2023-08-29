import { type payloadObject } from './actions'
import type Setting from '../types/Setting'
// import Setting from "../types/Setting"

export interface StoreState {
  store: {
    ianaTimezone: string
    name: string
    myshopifyDomain: string
    emai: string
  }
  settingTab: string[]
  setting: Setting
  currentSetting: Setting
}
export interface StoreAction {
  type: actionType
  payload?: Object
  tab?: payloadObject
}

export interface StoreContextType {
  state: StoreState
  dispatch: React.Dispatch<StoreAction>
}

export enum actionType {
  SET_STORE_INFO = 'SET_STORE_INFO',
  SET_NEW_SETTING = 'SET_NEW_SETTING',
  SET_INIT_SETTING = 'SET_INIT_SETTING',
  RESET_NEW_SETTING = 'RESET_NEW_SETTING',
  SET_SETTING_TAB = 'SET_SETTING_TAB',
}
