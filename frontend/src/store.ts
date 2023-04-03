import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { PlayerSlice, playerPersistListener } from "./services/Players";
import { SideBarSlice } from "./services/SideBar";
import { EquipmentSlice, equipmentPersistListener } from "./services/Equipment";
import { CampaignsSlice, campaignListener } from "./services/Campaigns";
import { spellPersistListener, SpellSlice } from "./services/Spells";

const persistCampaign = {
  key: 'campaign',
  storage
};

const persistedCampaignSlice = persistReducer(persistCampaign, CampaignsSlice.reducer);

export const store = configureStore({
  reducer: {
    [PlayerSlice.name]: PlayerSlice.reducer,
    [SideBarSlice.name]: SideBarSlice.reducer,
    [EquipmentSlice.name]: EquipmentSlice.reducer,
    [CampaignsSlice.name]: persistedCampaignSlice,
    [SpellSlice.name]: SpellSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(campaignListener.middleware)
      .prepend(playerPersistListener.middleware)
      .prepend(equipmentPersistListener.middleware)
      .prepend(spellPersistListener.middleware)
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;