import { createSlice, PayloadAction, createListenerMiddleware } from '@reduxjs/toolkit';
import { PersistPartial } from "redux-persist/es/persistReducer";
import { CampaignsSliceState } from 'src/types/campaign';
import { changePlayers } from './Players';
import { changeCoin, changeEquipment } from './Equipment';
import { PlayerSliceState } from 'src/types/players';
import { EquipmentSliceState } from 'src/types/equipment';
import { arrayMove } from '@dnd-kit/sortable';
import { changeSpells } from './Spells';
import { SpellSliceState } from 'src/types/spells';

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
      },
      players: {
        players: []
      },
      spells: {
        spells: []
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
    changeSavedSpells: (state, { payload }: PayloadAction<SpellSliceState>) => {
      const currentCampaignItem = state.campaigns.find(x => x.id == state.currentCampaign);
      if (currentCampaignItem === undefined)
      {
        return;
      }

      currentCampaignItem.spells = payload;
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

export const { changeCampaign, changeSavedEquipment, changeSavedPlayers, addCampaign, removeCampaign, updateCampaignName, changeCampaignOrder, changeSavedSpells } = CampaignsSlice.actions;

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
    listenerApi.dispatch(changeSpells(campaignInfo.spells.spells));
  }
})