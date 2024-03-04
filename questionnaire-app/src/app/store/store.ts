import { configureStore } from '@reduxjs/toolkit'
import { questionnaireReducer } from './slice'

export const store = configureStore({
  reducer: questionnaireReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch