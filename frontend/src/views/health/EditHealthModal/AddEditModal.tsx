import { useState, MouseEvent, useMemo } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import SortableList from 'src/components/SortableList';
import EditPlayerRow from './EditPlayerRow';

type AddEditModalProps = {
  playerList: PlayerHealth[];
  saveEdit: (players: PlayerHealth[]) => void;
  cancel: () => void;
}

function AddEditModal({ playerList, saveEdit, cancel }: AddEditModalProps) {
  const [tempPlayerList, setTempPlayerList] = useState([...playerList]);
  const playerListIds = useMemo(() => tempPlayerList.map(({ Id }: PlayerHealth) => Id), [tempPlayerList]);

  const addPlayer = (e: MouseEvent<HTMLButtonElement>) => {
    const pl = [...tempPlayerList];
    pl.push({
      Id: tempPlayerList.length + 1,
      Name: '',
      Max: 0,
      Current: 0,
      IsSelected: false
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

  const rows = tempPlayerList.map((value: PlayerHealth) => {
    return (
      <EditPlayerRow
        key={value.Id}
        player={value}
        deletePlayer={deletePlayer}
        changeMax={changeMax}
        changeName={changeName}
      />
    )
  })

  return (
    <div className='min-w-[34vw]'>
      <button className='btn-primary my-4 ml-4 mr-20' onClick={addPlayer}>Add Player</button>
      <table className={'mx-4 mb-4'}>
        <thead>
          <tr className={clsx(tempPlayerList.length === 0 && 'hidden')}>
            <td></td>
            <td>Name</td>
            <td>Max HP</td>
          </tr>
        </thead>
        <tbody>
          <SortableList idList={playerListIds} setArray={updateItems} itemList={rows} />
        </tbody>
      </table>
      <div className='bg-slate-200 text-right'>
        <button className='btn-primary mt-4 mr-4 py-1' onClick={cancel}>Cancel</button>
        <button className='btn-primary mt-4 mr-4 py-1' onClick={() => saveEdit(tempPlayerList)}>Save</button>
      </div>
    </div>
  );
}

export default AddEditModal;