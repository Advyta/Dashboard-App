import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from '../store'

// Project: Dashboard App
// Module: Hooks
// File: hooks.ts
// Author: Advyta
// Date: 13/07/2025
// Description: This file is used to create the hooks for the dashboard app
// useAppDispatch is a hook that returns the dispatch function with the correct type
// useAppSelector is a hook that returns the state with the correct type
// useAppStore is a hook that returns the store with the correct type

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()