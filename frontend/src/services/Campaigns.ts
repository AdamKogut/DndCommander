import { createSlice, PayloadAction, createListenerMiddleware, Action } from '@reduxjs/toolkit';
import { PersistPartial } from "redux-persist/es/persistReducer";
import { CampaignsSliceState } from 'src/types/campaign';
import { changePlayers } from './Players';
import { changeCoin, changeEquipment } from './Equipment';
import { PlayerSliceState } from 'src/types/players';
import { EquipmentSliceState } from 'src/types/equipment';
import { arrayMove } from '@dnd-kit/sortable';

type ChangeCampaignNameType = {
  id: number;
  name: string;
}

type ChangeCampaignOrderType = {
  start: number;
  end: number;
}

const initialState: CampaignsSliceState = {
  campaigns: [
    {
      id: 1,
      name: '',
      equipment: {
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
      },
      players: {
        players: []
      }
    }
  ],
  currentCampaign: 1
};

export const CampaignsSlice = createSlice({
  name: 'Campaigns',
  initialState,
  reducers: {
    changeCampaign: (state, { payload }: PayloadAction<number>) => {
      if (state.campaigns.find(x => x.id === payload) === undefined)
      {
        return;
      }
      state.currentCampaign = payload;
    },
    changeSavedPlayers: (state, { payload }: PayloadAction<PlayerSliceState>) => {
      const currentCampaignItem = state.campaigns.find(x => x.id == state.currentCampaign);
      if (currentCampaignItem === undefined)
      {
        return;
      }

      currentCampaignItem.players = payload;
    },
    changeSavedEquipment: (state, { payload }: PayloadAction<EquipmentSliceState>) => {
      const currentCampaignItem = state.campaigns.find(x => x.id == state.currentCampaign);
      if (currentCampaignItem === undefined)
      {
        return;
      }

      currentCampaignItem.equipment = payload;
    },
    addCampaign: (state) => {
      state.campaigns.push({
        ...initialState.campaigns[0],
        id: Date.now()
      })
    },
    removeCampaign: (state, { payload }: PayloadAction<number>) => {
      const foundCampaign = state.campaigns.findIndex((x => x.id === payload));
      if (foundCampaign !== -1)
      {
        state.campaigns.splice(foundCampaign, 1);
      }
    },
    updateCampaignName: (state, { payload }: PayloadAction<ChangeCampaignNameType>) => {
      const foundCampaign = state.campaigns.findIndex((x => x.id === payload.id));
      if (foundCampaign !== -1)
      {
        state.campaigns[foundCampaign].name = payload.name
      }
    },
    changeCampaignOrder: (state, { payload }: PayloadAction<ChangeCampaignOrderType>) => {
      state.campaigns = arrayMove(state.campaigns, payload.start, payload.end);
    },
  }
});

export const { changeCampaign, changeSavedEquipment, changeSavedPlayers, addCampaign, removeCampaign, updateCampaignName, changeCampaignOrder } = CampaignsSlice.actions;

export const campaignListener = createListenerMiddleware();

campaignListener.startListening({
  actionCreator: changeCampaign,
  effect: (action, listenerApi) => {
    const campaignState = listenerApi.getState() as { Campaigns: CampaignsSliceState & PersistPartial };
    const campaignInfo = campaignState.Campaigns.campaigns.find(x => x.id === action.payload);
    if (campaignInfo === undefined)
    {
      return;
    }

    listenerApi.dispatch(changePlayers(campaignInfo.players.players));
    listenerApi.dispatch(changeCoin(campaignInfo.equipment.currentCoin));
    listenerApi.dispatch(changeEquipment(campaignInfo.equipment.currentEquipment));
  }
})