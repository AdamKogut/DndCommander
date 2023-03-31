import { createSlice, PayloadAction, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { PlayerHealth, PlayerSliceState } from 'src/types/players';
import { changeSavedPlayers } from './Campaigns';

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
            let tempPayload = payload;
            if (payload < 0 && value.TempHp > 0)
            {
              const tempDiff = payload + value.TempHp;
              if (tempDiff < 0)
              {
                tempPayload = tempDiff;
                value.TempHp = 0;
              }
              else
              {
                tempPayload = 0;
                value.TempHp = Math.abs(tempDiff);
              }
            }
            value.Current += tempPayload
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

export const playerPersistListener = createListenerMiddleware();

playerPersistListener.startListening({
  matcher: isAnyOf(changePlayers, changePlayerSelection, changePlayerHealth, changePlayerTempHealth),
  effect: (_, listenerApi) => {
    const { Player } = listenerApi.getState() as { Player: PlayerSliceState };
    
    listenerApi.dispatch(changeSavedPlayers(Player));
  }
})