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
    <div className='h-full max-h-full min-w-[34%]'>
      <button className='secondary-coloring my-4 ml-4 mr-20' onClick={addPlayer}>Add Player</button>
      <div className='h-[calc(100%-127px)] overflow-y-auto'>
        <table className={'w-[100%] table-fixed'}>
          <thead>
            <tr className={clsx(playerList.length === 0 && 'hidden')}>
              <td className='w-8'></td>
              <td className='px-2'>Name</td>
              <td className='w-20 pr-2'>Max HP</td>
              <td className='w-[110px] px-2'></td>
            </tr>
          </thead>
          <tbody>
            <SortableList idList={playerListIds} setArray={updateItems} itemList={rows} />
          </tbody>
        </table>
      </div>
      <div className='bg-slate-200 pb-1 text-right'>
        <button className='secondary-coloring mt-4 mr-4 py-1' onClick={cancel}>Cancel</button>
        <button className='secondary-coloring mt-4 mr-4 py-1' onClick={() => saveEdit(playerList)}>Save</button>
      </div>
    </div>
  );
}

export default EditPlayerTable;