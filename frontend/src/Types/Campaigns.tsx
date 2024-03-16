import { PlayersSliceState } from "./Players";

export type CampaignsSliceState = {
  Campaigns: CampaignInfo[];
  CurrentCampaign: number;
}

export type CampaignInfo = {
  Id: number;
  Name: string;
  PlayerSliceInfo: PlayersSliceState;
}

export type CampaignsSliceStateV1 = CampaignsSliceState;
export type CampaignInfoV1 = CampaignInfo;

export type CampaignsSliceStateV0 = Omit<CampaignsSliceStateV1, 'Campaigns'>;