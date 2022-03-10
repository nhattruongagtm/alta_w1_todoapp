import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./slide/TaskSlice";


const rootReducer = combineReducers({
    tasks: TaskReducer,
})


const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;