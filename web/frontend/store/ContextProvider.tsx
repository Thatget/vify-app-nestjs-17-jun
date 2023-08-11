import * as React from 'react'
import Context from './Context'
import reducer, { initialState } from './reducer'

export interface ContextProviderProps {
  children: React.ReactNode
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
