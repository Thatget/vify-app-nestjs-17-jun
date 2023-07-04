import { createContext } from "react";
import { initialState } from "./reducer";
import { StoreAction, StoreContextType } from "./type";

const Context = createContext<StoreContextType | undefined>({
  state: initialState,
  dispatch: function (value: StoreAction): void {
    throw new Error("Function not implemented.");
  }
})

export default Context
