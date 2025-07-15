import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

// Project: Dashboard App
// Module: Store
// File: store.ts
// Author: Advyta
// Date: 13/07/2025
// Description: This file is used to create the store for the dashboard app
// makeStore function returns a new store for each request while retaining the strong type safety
// To use the store in the app, you need to wrap the app in the Provider component
// and pass the store to the Provider component
// Example:
// <Provider store={makeStore()}>
//   <App />
// </Provider>

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
