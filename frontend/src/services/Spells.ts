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
    updateSpell: (state, { payload }: PayloadAction<SpellInformation>) => {
      const spellIndex = state.spells.findIndex(x => x.id === payload.id);
      if (spellIndex === -1)
      {
        state.spells.push(payload);
      }
      else
      {
        state.spells.splice(spellIndex, 1, payload);
      }
    },
    deleteSpell: (state, { payload }: PayloadAction<number>) => {
      const spellIndex = state.spells.findIndex(x => x.id === payload);
      if (spellIndex !== -1)
      {
        state.spells.splice(spellIndex, 1);
      }
    }
  }
});

export const { changeSpells, updateSpell, deleteSpell } = SpellSlice.actions;

export const spellPersistListener = createListenerMiddleware();

spellPersistListener.startListening({
  matcher: isAnyOf(changeSpells, updateSpell, deleteSpell),
  effect: (_, listenerApi) => {
    const { Spell } = listenerApi.getState() as { Spell: SpellSliceState };
    
    listenerApi.dispatch(changeSavedSpells(Spell));
  }
})