export type Campaign = {
  Id: number;
  Name: string;
  Hidden: boolean;
  Notes: CampaignNote[];
  IsDm: boolean;
  Characters: number[];
}

export type CampaignsSliceState = {
  Campaigns: Campaign[];
  CurrentCampaign: number;
}

export type CampaignNote = {
  Id: number;
  Subject: string;
  Value: string;
}

export type UpdateCampaignNoteType = {
  CampaignId: number;
  Note: CampaignNote;
}

export function GetNewCampaign() : Campaign {
  return {
    Id: Date.now(),
    Name: '',
    Hidden: false,
    Notes: [],
    IsDm: false,
    Characters: []
  };
}

export function GetNewNote(): CampaignNote {
  return {
    Id: Date.now(),
    Subject: 'New Note',
    Value: ''
  };
}