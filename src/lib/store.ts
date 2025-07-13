import { configureStore } from '@reduxjs/toolkit'

// Project: Dashboard App
// Module: Store
// File: store.ts
// Author: Advyta
// Date: 13/07/2025
// Description: This file is used to create the store for the dashboard app
// makeStore function returns a new store for each request while retaining the strong type safety
// 

export const makeStore = () => {
  return configureStore({
    reducer: {},
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']