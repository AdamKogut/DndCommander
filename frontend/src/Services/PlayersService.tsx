import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerHealth, PlayerHealthV1, PlayersSliceState, PlayersSliceStateV0, PlayersSliceStateV1, PlayersSliceStateV2 } from 'src/Types/Players';

const initialState: PlayersSliceState = {
  Players: []
};

export const PlayersSlice = createSlice({
  name: 'Player',
  initialState,
  reducers: {
    addUpdatePlayer: (state, { payload }: PayloadAction<PlayerHealth>) => {
      if (payload.Id === 0) {
        payload.Id = Date.now();
        state.Players.push(payload);
        return;
      }

      const playerIndex = state.Players.findIndex(x => x.Id === payload.Id);
      if (playerIndex !== -1) {
        state.Players[playerIndex] = payload;
      }
    },
    deletePlayer: (state, { payload }: PayloadAction<number>) => {
      const playerIndex = state.Players.findIndex(x => x.Id === payload);
      if (playerIndex !== -1) {
        state.Players.splice(playerIndex, 1);
      }
    },
    updatePlayerList: (state, { payload }: PayloadAction<PlayerHealth[]>) => {
      state.Players = payload;
    }
  }
});

export const { addUpdatePlayer, deletePlayer, updatePlayerList } = PlayersSlice.actions;

export const PlayersMigrations = {
  // EXAMPLE
  // 0: (state) => {    
  //       return {      ...
	// 		state,      
	// 		tyre: {        ...
	// 			state.tyre,        
	// 			owner: {          ...
	// 				state.tyre.owner,          
	// 				details: {
  //                       state.tyre.owner.details,
  //                       address: "CA" //New Key added for migration
  //                   }
	// 			}      
	// 		}    
	// 	}  
  //   }
  1: (_state: PlayersSliceStateV0) => initialState,
  2: (state: PlayersSliceStateV1): PlayersSliceStateV2 => {
    return {
      Players: state.Players.map((value: PlayerHealthV1) => {
        return {
          ...value,
          Conditions: []
        }
      })
    };
  }
}