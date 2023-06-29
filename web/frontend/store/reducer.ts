const ActionTypes = {
  SET_INIT_SETTING: "SET_INIT_SETTING",
  SET_NEW_SETTING: "SET_NEW_SETTING",
};

// Khởi tạo state ban đầu
const initialState = {
  setting: {},
  currentSetting: {}
};

// Reducer
const reducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    // SET INIT SETTING
    case ActionTypes.SET_INIT_SETTING:
      const setting = {...state.setting, ...action.payload}
      return { ...state, ...{ setting } };
    // UPDATE NEW SETTING
    case ActionTypes.SET_NEW_SETTING:
      console.log(action.payload)
      const currentSetting = { ...state.currentSetting, ...action.payload}
      return { ...state, ...{ currentSetting } };
    default:
      return state;
  }
};

export { initialState }
export default reducer;
