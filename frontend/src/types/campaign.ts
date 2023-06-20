export type Campaign = {
  Id: number;
  Name: string;
  Hidden: boolean;
  Notes: string;
  IsDm: boolean;
  Characters: number[];
}

export type CampaignsSliceState = {
  Campaigns: Campaign[];
  CurrentCampaign: number;
}

export function GetNewCampaign() : Campaign {
  return {
    Id: Date.now(),
    Name: '',
    Hidden: false,
    Notes: '',
    IsDm: false,
    Characters: []
  };
}