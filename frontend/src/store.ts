import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { PlayerSlice } from "./services/Players";
import { SideBarSlice } from "./services/SideBar";

const persistConfig = {
  key: 'player-health',
  storage
};

const persistedPlayerSlice = persistReducer(persistConfig, PlayerSlice.reducer);

export const store = configureStore({
  reducer: {
    [PlayerSlice.name]: persistedPlayerSlice,
    [SideBarSlice.name]: SideBarSlice.reducer
  }
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;