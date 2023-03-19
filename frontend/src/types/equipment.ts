export type EquipmentItem = {
  Id: number;
  Name: string;
  Amount: number;
}

export type EquipmentSliceState = {
  currentCoin: EquipmentItem[];
  currentEquipment: EquipmentItem[];
}