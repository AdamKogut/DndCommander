import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CampaignInfo, CampaignsSliceState, CampaignsSliceStateV0, CampaignsSliceStateV1 } from 'src/Types/Campaigns';
import { addUpdatePlayer, updatePlayerList } from './PlayersService';

const initialState: CampaignsSliceState = {
  Campaigns: [],
  CurrentCampaign: 0
};

export const CampaignsSlice = createSlice({
  name: 'Campaign',
  initialState,
  reducers: {
    addUpdateCampaign: (state, { payload }: PayloadAction<CampaignInfo>) => {
      if (payload.Id === 0) {
        payload.Id = Date.now();
        state.Campaigns.push(payload);
        return;
      }

      const CampaignIndex = state.Campaigns.findIndex(x => x.Id === payload.Id);
      if (CampaignIndex !== -1) {
        state.Campaigns[CampaignIndex] = payload;
      }
    },
    deleteCampaign: (state, { payload }: PayloadAction<number>) => {
      const CampaignIndex = state.Campaigns.findIndex(x => x.Id === payload);
      if (CampaignIndex !== -1) {
        state.Campaigns.splice(CampaignIndex, 1);
      }
    },
    updateCampaignList: (state, { payload }: PayloadAction<CampaignInfo[]>) => {
      state.Campaigns = payload;
    },
    updateCampaignSlice: (state, { payload }: PayloadAction<CampaignsSliceState>) => {
      state.Campaigns = payload.Campaigns;
      state.CurrentCampaign = payload.CurrentCampaign;
    },
  },
  extraReducers: {
    [addUpdatePlayer.type]: (state, { payload }) => {
      const currentCampaignIndex = state.Campaigns.findIndex(x => x.Id == state.CurrentCampaign);
      if (currentCampaignIndex === -1) {
        return;
      }

      if (payload.Id === 0) {
        payload.Id = Date.now();
        state.Campaigns[currentCampaignIndex].PlayerSliceInfo.Players.push(payload);
        return;
      }

      const playerIndex = state.Campaigns[currentCampaignIndex].PlayerSliceInfo.Players.findIndex(x => x.Id === payload.Id);
      if (playerIndex !== -1) {
        state.Campaigns[currentCampaignIndex].PlayerSliceInfo.Players[playerIndex] = payload;
      }
    },
    [updatePlayerList.type]: (state, { payload }) => {
      const currentCampaignIndex = state.Campaigns.findIndex(x => x.Id == state.CurrentCampaign);
      if (currentCampaignIndex === -1) {
        return;
      }

      state.Campaigns[currentCampaignIndex].PlayerSliceInfo.Players = payload;
    }
  },
});

export const { addUpdateCampaign, deleteCampaign, updateCampaignList, updateCampaignSlice } = CampaignsSlice.actions;

export const CampaignsMigrations = {
  // EXAMPLE
  // 0: (state) => {    
  //       return {      ...
	// 		state,      
	// 		tyre: {        ...
	// 			state.tyre,        
	// 			owner: {          ...
	// 				state.tyre.owner,          
	// 				details: {
  //                       state.tyre.owner.details,
  //                       address: "CA" //New Key added for migration
  //                   }
	// 			}      
	// 		}    
	// 	}  
  //   }
  0: (_: CampaignsSliceStateV0): CampaignsSliceStateV1 => initialState
}