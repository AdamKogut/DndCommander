import { MouseEvent } from 'react';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import SortableList from 'src/components/SortableList';
import EditPlayerRow from './EditPlayerRow';
import { UniqueIdentifier } from '@dnd-kit/core';

type EditPlayerTableProps = {
  playerList: PlayerHealth[];
  playerListIds: UniqueIdentifier[];
  saveEdit: (players: PlayerHealth[]) => void;
  cancel: () => void;
  addPlayer: (e: MouseEvent<HTMLButtonElement>) => void;
  changeName: (id: number, name: string) => void;
  changeMax: (id: number, max: string) => void;
  deletePlayer: (id: number) => void;
  updateItems: (start: number, end: number) => void;
}

function EditPlayerTable({
  playerList,
  playerListIds,
  saveEdit,
  cancel,
  addPlayer,
  changeName,
  changeMax,
  deletePlayer,
  updateItems
}: EditPlayerTableProps) {
  const rows = playerList.map((value: PlayerHealth) => {
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
          <tr className={clsx(playerList.length === 0 && 'hidden')}>
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
        <button className='btn-primary mt-4 mr-4 py-1' onClick={() => saveEdit(playerList)}>Save</button>
      </div>
    </div>
  );
}

export default EditPlayerTable;