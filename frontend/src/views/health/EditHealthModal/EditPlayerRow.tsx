import { ChangeEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PlayerHealth } from 'src/types/players';
import { clsx } from 'clsx';
import DragDrop from 'src/Images/DragDrop.png';

type PlayerTableProps = {
  player: PlayerHealth;
  deletePlayer: (id: number) => void;
  changeName: (id: number, value: string) => void;
  changeMax: (id: number, value: string) => void;
}

function EditPlayerRow({ player, deletePlayer, changeMax, changeName }: PlayerTableProps) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: player.Id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  return (
    <tr
      ref={setNodeRef}
      key={player.Id}
      className={clsx('h-12 border-y-2 bg-white', isDragging && 'invisible')}
      style={style}
    >
      <td {...attributes} {...listeners}>
        <img className='h-8' src={DragDrop} alt='Drag and drop icon' />
      </td>
      <td className='px-2'>
        <input className='border-2 px-2' type="text" value={player.Name} onChange={(e: ChangeEvent<HTMLInputElement>) => changeName(player.Id, e.currentTarget.value)} />
      </td>
      <td className='pr-2'>
        <input className='w-16 border-2 px-2' type="text" value={player.Max} onChange={(e: ChangeEvent<HTMLInputElement>) => changeMax(player.Id, e.currentTarget.value)} />
      </td>
      <td className='pr-2'>
        <button className='bg-red-500' onClick={() => deletePlayer(player.Id)}>Delete</button>
      </td>
    </tr>
  );
}

export default EditPlayerRow;