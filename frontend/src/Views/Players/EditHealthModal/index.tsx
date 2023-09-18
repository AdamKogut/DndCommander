import { useState, MouseEvent, useMemo } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { PlayerHealth } from 'src/Types/Players';
import EditPlayerTable from './EditPlayerTable';

type AddEditModalProps = {
  playerList: PlayerHealth[];
  saveEdit: (players: PlayerHealth[]) => void;
  cancel: () => void;
}

export type DisplayPlayerHealth = Omit<PlayerHealth, 'Max' | 'TempMaxHp'> & {
  Max: string;
  TempMaxHp: string;
}

function AddEditModal({ playerList, saveEdit, cancel }: AddEditModalProps) {
  const [tempPlayerList, setTempPlayerList] = useState<DisplayPlayerHealth[]>(JSON.parse(JSON.stringify(playerList)));
  const playerListIds = useMemo(() => tempPlayerList.map(({ Id }: DisplayPlayerHealth) => Id), [tempPlayerList]);

  const addPlayer = (e: MouseEvent<HTMLButtonElement>) => {
    const pl = [...tempPlayerList];
    pl.push({
      Id: Date.now(),
      Name: '',
      Max: '0',
      Current: 0,
      IsSelected: false,
      TempHp: 0,
      TempMaxHp: '0',
      Conditions: []
    });
    setTempPlayerList(pl);
    e.stopPropagation();
  };

  const changeDisplayValue = (id: number, value: string, propertyName: keyof DisplayPlayerHealth) => {
    const pl = [...tempPlayerList];
    const foundPlayer = pl.find((x => x.Id === id));
    if (foundPlayer)
    {
      // @ts-expect-error
      foundPlayer[propertyName] = value;
    }

    setTempPlayerList(pl);
  }

  const localSaveEdit = (values: DisplayPlayerHealth[]) => {
    if (values.every((value: DisplayPlayerHealth) => !isNaN(+value.Max) && !isNaN(+value.TempMaxHp))) {
      saveEdit(values.map((value: DisplayPlayerHealth) => {
        return {
          ...value,
          Max: +value.Max,
          TempMaxHp: +value.TempMaxHp
        }
      }));
    }
  }

  const deletePlayer = (id: number) => {
    const pl = [...tempPlayerList];
    const foundPlayer = pl.findIndex((x => x.Id === id));
    if (foundPlayer !== -1)
    {
      pl.splice(foundPlayer, 1);
    }
    
    setTempPlayerList(pl);
  }

  const updateItems = (start: number, end: number) => {
    const pl = [...tempPlayerList];
    setTempPlayerList(arrayMove(pl, start, end));
  }

  return (
    <EditPlayerTable
      playerList={tempPlayerList}
      playerListIds={playerListIds}
      cancel={cancel}
      saveEdit={localSaveEdit}
      addPlayer={addPlayer}
      changeValue={changeDisplayValue}
      deletePlayer={deletePlayer}
      updateItems={updateItems}
    />
  );
}

export default AddEditModal;