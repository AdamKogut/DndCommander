export type EquipmentItem = {
  id: number;
  name: string;
  amount: number;
  // type: EquipmentType;
  // description: string;
  // damage: string;
  // hitDc: string;
  // isAttuned: boolean;
  // needsAttunement: boolean;
  // maxUses: number;
  // currentUses: number;
  // weight: number;
  // spellLevel: number;
  // range: number;
  // area: string;
  // duration: 
}

export type EquipmentSliceState = {
  currentCoin: EquipmentItem[];
  currentEquipment: EquipmentItem[];
}

export enum EquipmentType {
  Normal = 1,
  Weapon,
  SpellScroll
}