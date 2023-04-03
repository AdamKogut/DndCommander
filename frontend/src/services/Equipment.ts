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
      id: 1,
      name: 'Copper',
      amount: 0
    },
    {
      id: 2,
      name: 'Silver',
      amount: 0
    },
    {
      id: 3,
      name: 'Gold',
      amount: 0
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

      const foundCoin = state.currentCoin.find(x => x.id == payload.id);
      if (foundCoin)
      {
        foundCoin.amount = amt;
      }
    },
    changeEquipment: (state, { payload }: PayloadAction<EquipmentItem[]>) => {
      state.currentEquipment = payload;
    },
    addEquipmentItem: (state) => {
      state.currentEquipment.push({
        id: Date.now(),
        name: '',
        amount: 1
      })
    },
    removeEquipmentItem: (state, { payload }: PayloadAction<number>) => {
      const foundEquipment = state.currentEquipment.findIndex((x => x.id === payload));
      if (foundEquipment !== -1)
      {
        state.currentEquipment.splice(foundEquipment, 1);
      }
    },
    changeEquipmentItem: (state, { payload }: PayloadAction<EquipmentItem>) => {
      const foundEquipment = state.currentEquipment.findIndex((x => x.id === payload.id));
      if (foundEquipment !== -1)
      {
        state.currentEquipment.splice(foundEquipment, 1, payload);
      }
    }
  }
});

export const { changeCoin, changeCoinAmount, changeEquipment, addEquipmentItem, removeEquipmentItem, changeEquipmentItem } = EquipmentSlice.actions;

export const equipmentPersistListener = createListenerMiddleware();

equipmentPersistListener.startListening({
  matcher: isAnyOf(changeCoin, changeCoinAmount, changeEquipment, addEquipmentItem, removeEquipmentItem, changeEquipmentItem),
  effect: (_, listenerApi) => {
    const { Equipment } = listenerApi.getState() as { Equipment: EquipmentSliceState };
    
    listenerApi.dispatch(changeSavedEquipment(Equipment));
  }
})