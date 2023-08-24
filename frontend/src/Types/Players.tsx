export type PlayerHealth = {
  Id: number;
  Name: string;
  Max: number;
  Current: number;
  IsSelected: boolean;
  TempHp: number;
  TempMaxHp: number;
}

export type PlayersSliceState = {
  Players: PlayerHealth[]
}