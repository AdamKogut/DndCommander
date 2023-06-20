import { createSlice } from '@reduxjs/toolkit';

type SideBarSliceState = {
  SideBarOpen: boolean
}

const initialState: SideBarSliceState = {SideBarOpen:false};

export const SideBarSlice = createSlice({
  name: 'SideBar',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.SideBarOpen = !state.SideBarOpen;
    },
  }
});

export const { toggleSideBar } = SideBarSlice.actions;