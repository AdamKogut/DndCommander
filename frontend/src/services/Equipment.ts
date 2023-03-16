import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EquipmentItem } from 'src/types/equipment';

type EquipmentSliceState = {
  currentCoin: EquipmentItem[],
  currentEquipment: EquipmentItem[]
}

type ChangeCoinAmountType = {
  id: number,
  amt: string
}

const initialState: EquipmentSliceState = {
  currentCoin: [
    {
      Id: 0,
      Name: 'Copper',
      Amount: 0
    },
    {
      Id: 1,
      Name: 'Silver',
      Amount: 0
    },
    {
      Id: 2,
      Name: 'Gold',
      Amount: 0
    },
  ],
  currentEquipment: []
};

export const EquipmentSlice = createSlice({
  name: 'Equipment',
  initialState,
  reducers: {
    changeCoin: (state, { payload }: PayloadAction<EquipmentItem[]>) => {
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
    },
    addEquipmentItem: (state) => {
      state.currentEquipment.push({
        Id: Date.now(),
        Name: '',
        Amount: 0
      })
    }
  }
});

export const { changeCoin, changeCoinAmount, addEquipmentItem } = EquipmentSlice.actions;