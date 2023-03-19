import { EquipmentSliceState } from "./equipment";
import { PlayerSliceState } from "./players";

export type Campaign = {
  id: number;
  name: string;
  equipment: EquipmentSliceState;
  players: PlayerSliceState;
}

export type CampaignsSliceState = {
  campaigns: Campaign[];
  currentCampaign: number;
}