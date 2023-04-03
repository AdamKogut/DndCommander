import { EquipmentSliceState } from "./equipment";
import { PlayerSliceState } from "./players";
import { SpellSliceState } from "./spells";

export type Campaign = {
  id: number;
  name: string;
  equipment: EquipmentSliceState;
  players: PlayerSliceState;
  spells: SpellSliceState;
}

export type CampaignsSliceState = {
  campaigns: Campaign[];
  currentCampaign: number;
}