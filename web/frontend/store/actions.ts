import { actionType } from "./type"

export const setInitSetting = (payload: object) => ({
  type: actionType.SET_INIT_SETTING,
  payload
})

export const setNewSetting = (payload: object) => ({
  type: actionType.SET_NEW_SETTING,
  payload
})

export const setSettingTab = (tab: string) => ({
  type: actionType.SET_SETTING_TAB,
  tab
})
