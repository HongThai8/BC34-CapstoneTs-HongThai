import { configureStore,PayloadAction } from '@reduxjs/toolkit'
import courseReducer from './reducers/courseReducer'
import userReducer from './reducers/userReducer'
export const store = configureStore({
  reducer: {
    userReducer:userReducer,
    courseReducer:courseReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch