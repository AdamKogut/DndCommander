import { CSSProperties, ChangeEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clsx } from 'clsx';
import StringInput from 'src/Components/StringInput';
import { DisplayPlayerHealth } from '.';
import { DragAndDropIcon } from 'src/Components/Icons';

type PlayerTableProps = {
  player: DisplayPlayerHealth;
  deletePlayer: (id: number) => void;
  changeValue: (id: number, name: string, propertyName: keyof DisplayPlayerHealth) => void;
}

function EditPlayerRow({ player, deletePlayer, changeValue }: PlayerTableProps) {
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
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  const setErrorString = (value: string) => {
    const maxInt = +value;
    if (isNaN(maxInt) || value==='')
    {
      return {
        errorString:'Must be an integer'
      };
    }
    return {};
  }

  return (
    <tr
      ref={setNodeRef}
      key={player.Id}
      className={clsx('h-12 border-y-2 bg-primary-light border-accent dark:bg-primary-dark', isDragging && 'invisible')}
      style={style}
    >
      <td {...attributes} {...listeners} className='w-[40px]'>
        <DragAndDropIcon className='h-8 w-8' />
      </td>
      <td className='px-2'>
        <StringInput
          value={player.Name}
          placeholder='Name'
          inputOnChange={(e: ChangeEvent<HTMLInputElement>) => changeValue(player.Id, e.currentTarget.value, 'Name')}
        />
        <div className='grid grid-cols-2'>
          <StringInput
            value={`${player.Max}`}
            placeholder='Max HP'
            inputOnChange={(e: ChangeEvent<HTMLInputElement>) => changeValue(player.Id, e.currentTarget.value, 'Max')}
            {...setErrorString(player.Max)}
          />
          <StringInput
            value={`${player.TempMaxHp}`}
            placeholder='Temp Max HP'
            inputOnChange={(e: ChangeEvent<HTMLInputElement>) => changeValue(player.Id, e.currentTarget.value, 'TempMaxHp')}
            {...setErrorString(player.TempMaxHp)}
          />
        </div>
      </td>
      <td className='pr-2'>
        <button className='w-[99px] bg-calltoaction-red text-white' onClick={() => deletePlayer(player.Id)}>Delete</button>
      </td>
    </tr>
  );
}

export default EditPlayerRow;