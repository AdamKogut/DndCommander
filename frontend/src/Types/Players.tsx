import Conditions from "src/Enums/Conditions";

export type PlayerHealth = {
  Id: number;
  Name: string;
  Max: number;
  Current: number;
  IsSelected: boolean;
  TempHp: number;
  TempMaxHp: number;
  Conditions: Conditions[];
}

export type PlayersSliceState = {
  Players: PlayerHealth[]
}

export type PlayersSliceStateMigrationState = PlayersSliceStateV0 | PlayersSliceStateV1 | PlayersSliceStateV2;

export type PlayersSliceStateV2 = PlayersSliceState;
export type PlayerHealthV2 = PlayerHealth;

export type PlayersSliceStateV1 = Omit<PlayersSliceStateV2, 'Players'> & {
  Players: PlayerHealthV1[]
}
export type PlayerHealthV1 = Omit<PlayerHealthV2, 'Conditions'>;

export type PlayersSliceStateV0 = Omit<PlayersSliceStateV1, 'Players'>;