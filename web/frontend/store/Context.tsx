import { createContext } from "react";
import { initialState } from "./reducer";

const Context = createContext<StoreContextType | undefined>({
  state: initialState,
  dispatch: function (value: StoreAction): void {
    throw new Error("Function not implemented.");
  }
})

export default Context
