export type Character = {
  Id: number;
  Name: string;
  Age: string;
  Sex: string;
  Weight: string;
  Height: string;
  HairColor: string;
  EyeColor: string;
  SkinColor: string;
  Description: string;
  Level: string;
  Class: string;
  Subclass: string;
}

export type CharactersSliceState = {
  Characters: Character[];
}

export function GetNewCharacter() : Character {
  return {
    Id: Date.now(),
    Name: '',
    Age: '',
    Sex: '',
    Weight: '',
    Height: '',
    HairColor: '',
    EyeColor: '',
    SkinColor: '',
    Description: '',
    Level: '',
    Class: '',
    Subclass: '',
  };
}