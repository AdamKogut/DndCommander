import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Campaign, CampaignsSliceState, GetNewCampaign, UpdateCampaignNoteType } from 'src/types/campaign';

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
      if (foundCampaign === -1) {
        return;
      }
      state.Campaigns.splice(foundCampaign, 1, payload);
    },
    UpdateCampaignNote: (state, { payload }: PayloadAction<UpdateCampaignNoteType>) => {
      const foundCampaign = state.Campaigns.find(x => x.Id === payload.CampaignId)
      if (foundCampaign === undefined) {
        return;
      }

      const foundNote = foundCampaign.Notes.findIndex(x => x.Id === payload.Note.Id);
      if (foundNote === -1) {
        foundCampaign.Notes.push(payload.Note);
      }

      foundCampaign.Notes.splice(foundNote, 1, payload.Note);
    }
  }
});

export const { ChangeCampaign, AddCampaign, RemoveCampaign, UpdateCampaignInfo, UpdateCampaignNote } = CampaignsSlice.actions;