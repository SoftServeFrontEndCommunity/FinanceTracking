import { configureStore } from "@reduxjs/toolkit";
import authReducer, { restoreSessionAction } from "./features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: {
    name: "FinTrack",
  },
});

// recover the session
 restoreSessionAction()(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
