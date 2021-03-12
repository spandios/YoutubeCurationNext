import { Action, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import rootReducer, { RootState } from './rootReducer'
import logger from 'redux-logger'
import { ThunkAction } from 'redux-thunk'

const middleware = [...getDefaultMiddleware(), logger]

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production', // devTool 의 옵션을 선택합니다.
})

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  ;(module as any).hot.accept('./rootReducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
