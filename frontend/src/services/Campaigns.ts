import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Campaign, CampaignsSliceState, GetNewCampaign } from 'src/types/campaign';

const initialState: CampaignsSliceState = {
  Campaigns: [],
  CurrentCampaign: 1
};

export const CampaignsSlice = createSlice({
  name: 'Campaigns',
  initialState,
  reducers: {
    ChangeCampaign: (state, { payload }: PayloadAction<number>) => {
      if (state.Campaigns.find(x => x.Id === payload) === undefined)
      {
        return;
      }
      state.CurrentCampaign = payload;
    },
    AddCampaign: (state) => {
      const newCampaign = GetNewCampaign();
      newCampaign.Name = `Campaign ${state.Campaigns.length + 1}`;
      state.Campaigns.push(newCampaign);
      if (state.Campaigns.length === 1) {
        state.CurrentCampaign = newCampaign.Id;
      }
    },
    RemoveCampaign: (state, { payload }: PayloadAction<number>) => {
      const foundCampaign = state.Campaigns.findIndex((x => x.Id === payload));
      if (foundCampaign !== -1)
      {
        state.Campaigns.splice(foundCampaign, 1);
      }
    },
    UpdateCampaignInfo: (state, { payload }: PayloadAction<Campaign>) => {
      const foundCampaign = state.Campaigns.findIndex(x => x.Id === payload.Id)
      if (foundCampaign === undefined)
      {
        return;
      }
        state.Campaigns.splice(foundCampaign, 1, payload);
    }
  }
});

export const { ChangeCampaign, AddCampaign, RemoveCampaign, UpdateCampaignInfo } = CampaignsSlice.actions;