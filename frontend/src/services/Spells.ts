import { createSlice, PayloadAction, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { SpellInformation, SpellSliceState } from 'src/types/spells';
import { changeSavedSpells } from './Campaigns';

const initialState: SpellSliceState = { spells: [] };

export const SpellSlice = createSlice({
  name: 'Spell',
  initialState,
  reducers: {
    changeSpells: (state, { payload }: PayloadAction<SpellInformation[]>) => {
      state.spells = payload;
    },
  }
});

export const { changeSpells } = SpellSlice.actions;

export const spellPersistListener = createListenerMiddleware();

spellPersistListener.startListening({
  matcher: isAnyOf(changeSpells),
  effect: (_, listenerApi) => {
    const { Spell } = listenerApi.getState() as { Spell: SpellSliceState };
    
    listenerApi.dispatch(changeSavedSpells(Spell));
  }
})