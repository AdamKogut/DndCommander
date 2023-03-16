import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CoinItem } from 'src/types/equipment';

type EquipmentSliceState = {
  currentCoin: CoinItem[]
}

type ChangeCoinAmountType = {
  id: number,
  amt: string
}

const initialState: EquipmentSliceState = {currentCoin:[]};

export const EquipmentSlice = createSlice({
  name: 'Equipment',
  initialState,
  reducers: {
    changeCoin: (state, { payload }: PayloadAction<CoinItem[]>) => {
      state.currentCoin = payload;
    },
    changeCoinAmount: (state, { payload }: PayloadAction<ChangeCoinAmountType>) => {
      const amt = +payload.amt;
      if (isNaN(amt))
      {
        return;
      }

      const foundCoin = state.currentCoin.find(x => x.Id == payload.id);
      if (foundCoin)
      {
        foundCoin.Amount = amt;
      }
      
    }
  }
});

export const { changeCoin, changeCoinAmount } = EquipmentSlice.actions;