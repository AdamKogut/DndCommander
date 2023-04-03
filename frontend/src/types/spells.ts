export type SpellInformation = {
  id: number;
  name: string;
  components: string;
  spellLevel: number;
  castingTime: string;
  duration: string;
  rangeArea: string;
  damage: string;
  attackSave: string;
  description: string;
  tags: string;
  prepared: boolean;
}

export type SpellSliceState = {
  spells: SpellInformation[];
}