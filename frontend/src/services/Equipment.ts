import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoinItem } from 'src/types/equipment';

type EquipmentSliceState = {
  currentCoin: CoinItem[]
}

const initialState: EquipmentSliceState = {currentCoin:[]};

export const EquipmentSlice = createSlice({
  name: 'Equipment',
  initialState,
  reducers: {
    changeCoin: (state, { payload }: PayloadAction<CoinItem[]>) => {
      state.currentCoin = payload;
    },
  }
});

export const { changeCoin } = EquipmentSlice.actions;