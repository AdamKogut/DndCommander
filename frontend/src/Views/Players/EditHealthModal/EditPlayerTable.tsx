import { MouseEvent } from 'react';
import { clsx } from 'clsx';
import SortableList from 'src/components/SortableList';
import EditPlayerRow from './EditPlayerRow';
import { UniqueIdentifier } from '@dnd-kit/core';
import { DisplayPlayerHealth } from '.';

type EditPlayerTableProps = {
  playerList: DisplayPlayerHealth[];
  playerListIds: UniqueIdentifier[];
  saveEdit: (players: DisplayPlayerHealth[]) => void;
  cancel: () => void;
  addPlayer: (e: MouseEvent<HTMLButtonElement>) => void;
  changeValue: (id: number, name: string, propertyName: keyof DisplayPlayerHealth) => void;
  deletePlayer: (id: number) => void;
  updateItems: (start: number, end: number) => void;
}

function EditPlayerTable({
  playerList,
  playerListIds,
  saveEdit,
  cancel,
  addPlayer,
  deletePlayer,
  updateItems,
  changeValue
}: EditPlayerTableProps) {
  const rows = playerList.map((value: DisplayPlayerHealth) => {
    return (
      <EditPlayerRow
        key={value.Id}
        player={value}
        deletePlayer={deletePlayer}
        changeValue={changeValue}
      />
    )
  })

  return (
    <div className='h-full max-h-full min-w-[34%]'>
      <button className='my-4 ml-4 mr-20 bg-custom-orange text-black' onClick={addPlayer}>Add Player</button>
      <div className='h-[calc(100%-127px)] overflow-y-auto'>
        <table className={'w-[100%] table-fixed'}>
          <thead>
            <tr className={clsx(playerList.length === 0 && 'hidden')}>
              <td className='w-8'></td>
              <td className='px-2'></td>
              <td className='w-[110px] px-2'></td>
            </tr>
          </thead>
          <tbody>
            <SortableList idList={playerListIds} setArray={updateItems} itemList={rows} />
          </tbody>
        </table>
      </div>
      <div className='bg-black pb-1 w-full text-right dark:bg-custom-orange'>
        <button className='bg-custom-orange text-black mt-4 mr-4 py-1 dark:bg-black dark:text-custom-orange' onClick={cancel}>Cancel</button>
        <button className='bg-custom-orange text-black mt-4 mr-4 py-1 dark:bg-black dark:text-custom-orange' onClick={() => saveEdit(playerList)}>Save</button>
      </div>
    </div>
  );
}

export default EditPlayerTable;