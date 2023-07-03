export const setInitSetting = (payload: object) => ({
  type: 'SET_INIT_SETTING',
  payload
})

export const setNewSetting = (payload: object) => ({
  type: 'SET_NEW_SETTING',
  payload
})

export const setSettingTab = (tab: string) => ({
  type: 'SET_SETTING_TAB',
  tab
})
