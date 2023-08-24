import { ChangeEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PlayerHealth } from 'src/Types/Players';
import { clsx } from 'clsx';
import DragDrop from 'src/Images/DragDrop.png';
import StringInput from 'src/Components/StringInput';

type PlayerTableProps = {
  player: PlayerHealth;
  deletePlayer: (id: number) => void;
  changeName: (id: number, value: string) => void;
  changeMax: (id: number, value: string) => void;
  changeTempMax: (id: number, value: string) => void;
}

function EditPlayerRow({ player, deletePlayer, changeMax, changeName, changeTempMax }: PlayerTableProps) {
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
      <td {...attributes} {...listeners} className='w-[40px]'>
        <img className='h-8 w-8' src={DragDrop} alt='Drag and drop icon' />
      </td>
      <td className='px-2'>
        <StringInput
          value={player.Name}
          placeholder='Name'
          inputOnChange={(e: ChangeEvent<HTMLInputElement>) => changeName(player.Id, e.currentTarget.value)}
        />
        <div className='grid grid-cols-2'>
          <StringInput
            value={`${player.Max}`}
            placeholder='Max HP'
            inputOnChange={(e: ChangeEvent<HTMLInputElement>) => changeMax(player.Id, e.currentTarget.value)}
          />
          <StringInput
            value={`${player.TempMaxHp}`}
            placeholder='Temp Max HP'
            inputOnChange={(e: ChangeEvent<HTMLInputElement>) => changeTempMax(player.Id, e.currentTarget.value)}
          />
        </div>
      </td>
      <td className='pr-2'>
        <button className='w-[99px] bg-red-500' onClick={() => deletePlayer(player.Id)}>Delete</button>
      </td>
    </tr>
  );
}

export default EditPlayerRow;