import { createSlice, PayloadAction, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { EquipmentItem, EquipmentSliceState } from 'src/types/equipment';
import { changeSavedEquipment } from './Campaigns';

type ChangeCoinAmountType = {
  id: number,
  amt: string
}

const initialState: EquipmentSliceState = {
  currentCoin: [
    {
      Id: 1,
      Name: 'Copper',
      Amount: 0
    },
    {
      Id: 2,
      Name: 'Silver',
      Amount: 0
    },
    {
      Id: 3,
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
    changeEquipment: (state, { payload }: PayloadAction<EquipmentItem[]>) => {
      state.currentEquipment = payload;
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

export const { changeCoin, changeCoinAmount, changeEquipment, addEquipmentItem } = EquipmentSlice.actions;

export const equipmentPersistListener = createListenerMiddleware();

equipmentPersistListener.startListening({
  matcher: isAnyOf(changeCoin, changeCoinAmount, changeEquipment, addEquipmentItem),
  effect: (action, listenerApi) => {
    const { Equipment } = listenerApi.getState() as { Equipment: EquipmentSliceState };
    
    listenerApi.dispatch(changeSavedEquipment(Equipment));
  }
})