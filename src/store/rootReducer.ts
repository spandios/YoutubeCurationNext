import { combineReducers } from '@reduxjs/toolkit'
import commonReducer from '../feature/common.slice'
import { createSelectorHook } from 'react-redux'

const rootReducer = combineReducers({ common: commonReducer })

export type RootState = ReturnType<typeof rootReducer>

export const useSelector = createSelectorHook<RootState>()

export default rootReducer
