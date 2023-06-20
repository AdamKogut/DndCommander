import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, CharactersSliceState, GetNewCharacter } from 'src/types/character';

const initialState: CharactersSliceState = {
  Characters: []
};

export const CharactersSlice = createSlice({
  name: 'Characters',
  initialState,
  reducers: {
    AddCharacter: (state) => {
      state.Characters.push(GetNewCharacter())
    },
    RemoveCharacter: (state, { payload }: PayloadAction<number>) => {
      const foundCharacter = state.Characters.findIndex((x => x.Id === payload));
      if (foundCharacter !== -1)
      {
        state.Characters.splice(foundCharacter, 1);
      }
    },
    UpdateCharacterInfo: (state, { payload }: PayloadAction<Character>) => {
      const foundCharacter = state.Characters.findIndex(x => x.Id === payload.Id)
      if (foundCharacter === undefined)
      {
        return;
      }
        state.Characters.splice(foundCharacter, 1, payload);
    }
  }
});

export const { AddCharacter, RemoveCharacter, UpdateCharacterInfo } = CharactersSlice.actions;