import { configureStore } from "@reduxjs/toolkit";
import { todosApiSlice } from "../Todos/todosApiSlice";

export const store = configureStore({
    reducer: {
        [todosApiSlice.reducerPath]: todosApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(todosApiSlice.middleware);
    }
});