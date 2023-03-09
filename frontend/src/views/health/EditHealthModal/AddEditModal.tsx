import { useState, MouseEvent, useMemo } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { PlayerHealth } from 'src/types/players';
import EditPlayerTable from './EditPlayerTable';

type AddEditModalProps = {
  playerList: PlayerHealth[];
  saveEdit: (players: PlayerHealth[]) => void;
  cancel: () => void;
}

function AddEditModal({ playerList, saveEdit, cancel }: AddEditModalProps) {
  const [tempPlayerList, setTempPlayerList] = useState(JSON.parse(JSON.stringify(playerList)));
  const playerListIds = useMemo(() => tempPlayerList.map(({ Id }: PlayerHealth) => Id), [tempPlayerList]);

  const addPlayer = (e: MouseEvent<HTMLButtonElement>) => {
    const pl = [...tempPlayerList];
    pl.push({
      Id: tempPlayerList.length + 1,
      Name: '',
      Max: 0,
      Current: 0,
      IsSelected: false,
      TempHp: 0
    });
    setTempPlayerList(pl);
    e.stopPropagation();
  };

  const changeName = (id: number, name: string) => {
    const pl = [...tempPlayerList];
    const foundPlayer = pl.find((x => x.Id === id));
    if (foundPlayer)
    {
      foundPlayer.Name = name;
    }

    setTempPlayerList(pl);
  }

  const changeMax = (id: number, max: string) => {
    const maxInt = +max;
    if (isNaN(maxInt))
    {
      return;
    }
    
    const pl = [...tempPlayerList];
    const foundPlayer = pl.find((x => x.Id === id));
    if (foundPlayer)
    {
      foundPlayer.Max = maxInt;
    }
    
    setTempPlayerList(pl);
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
      saveEdit={saveEdit}
      addPlayer={addPlayer}
      changeName={changeName}
      changeMax={changeMax}
      deletePlayer={deletePlayer}
      updateItems={updateItems}/>
  );
}

export default AddEditModal;