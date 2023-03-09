import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerHealth } from 'src/types/players';

type PlayerSliceState = {
  players: PlayerHealth[]
}

const initialState: PlayerSliceState = {players:[]};

export const PlayerSlice = createSlice({
  name: 'Player',
  initialState,
  reducers: {
    changePlayers: (state, { payload }: PayloadAction<PlayerHealth[]>) => {
      state.players = payload;
    },
    changePlayerSelection: (state, { payload }: PayloadAction<number>) => {
      const foundPlayer = state.players.find((value: PlayerHealth) => value.Id === payload);
      if (foundPlayer)
      {
        foundPlayer.IsSelected = !foundPlayer.IsSelected;
      }
    },
    changePlayerHealth: (state, { payload }: PayloadAction<number>) => {
      state.players.forEach((value: PlayerHealth) => {
        if (value.IsSelected) {
          if (payload === 0) {
            value.Current = value.Max;
          }
          else {
            if (payload < 0 && value.TempHp > 0)
            {
              const tempDiff = payload + value.TempHp;
              if (tempDiff < 0)
              {
                payload = tempDiff;
                value.TempHp = 0;
              }
              else
              {
                payload = 0;
                value.TempHp = Math.abs(tempDiff);
              }
            }
            value.Current += payload
          }
        }
      });
    },
    changePlayerTempHealth: (state, { payload }: PayloadAction<number>) => {
      state.players.forEach((value: PlayerHealth) => {
        if (value.IsSelected) {
          value.TempHp += payload;
        }
      });
    },
  }
});

export const { changePlayers, changePlayerSelection, changePlayerHealth, changePlayerTempHealth } = PlayerSlice.actions;