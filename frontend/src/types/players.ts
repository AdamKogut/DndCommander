export type PlayerHealth = {
  Id: number;
  Name: string;
  Max: number;
  Current: number;
  IsSelected: boolean;
  TempHp: number;
}

export type PlayerSliceState = {
  players: PlayerHealth[]
}