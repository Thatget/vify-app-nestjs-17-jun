import { actionType } from "./type"

export interface payloadObject {
  add: boolean,
  tab: string
}
export const setInitSetting = (payload: object) => ({
  type: actionType.SET_INIT_SETTING,
  payload
})

export const setNewSetting = (payload: object) => ({
  type: actionType.SET_NEW_SETTING,
  payload
})

export const resetNewSetting = () => ({
  type: actionType.RESET_NEW_SETTING,
})

export const setSettingTab = (tab: payloadObject) => ({
  type: actionType.SET_SETTING_TAB,
  tab
})

export const setStoreInfo = (payload: object) =>({
  type: actionType.SET_STORE_INFO,
  payload,
})
