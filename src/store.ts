import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import myMusicReducer from "./myMusicSlice";

export const store = configureStore({
  reducer: {
    myMusic: myMusicReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
