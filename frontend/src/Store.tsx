import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer, PersistConfig, createMigrate } from 'redux-persist';
import { PlayersMigrations, PlayersSlice } from "./Services/PlayersService";
import { PlayersSliceState } from "./Types/Players";
import storage from 'redux-persist/lib/storage';
import { CampaignsSliceState } from "./Types/Campaigns";
import { CampaignsMigrations, CampaignsSlice } from "./Services/CampaignsService";

const persistPlayerConfig: PersistConfig<PlayersSliceState> = {
  // @ts-ignore
  migrate: createMigrate(PlayersMigrations, {debug:true}),
  storage: storage,
  key: PlayersSlice.name,
  version:2
}
const persistedPlayerSlice = persistReducer(persistPlayerConfig, PlayersSlice.reducer);

const persistCampaignConfig: PersistConfig<CampaignsSliceState> = {
  // @ts-ignore
  migrate: createMigrate(CampaignsMigrations, { debug: true }),
  storage: storage,
  key: CampaignsSlice.name,
  version: 0
}
const persistedCampaignsSlice = persistReducer(persistCampaignConfig, CampaignsSlice.reducer);

export const Store = configureStore({
  reducer: {
    [PlayersSlice.name]: persistedPlayerSlice,
    [CampaignsSlice.name]: persistedCampaignsSlice
  }
});

export const Persistor = persistStore(Store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;