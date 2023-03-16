import { ChangeEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CoinItem } from 'src/types/equipment';
import { clsx } from 'clsx';
import DragDrop from 'src/Images/DragDrop.png';

type MoneyTableProps = {
  Money: CoinItem;
  deleteMoney: (id: number) => void;
  changeName: (id: number, value: string) => void;
}

function EditMoneyRow({ Money, deleteMoney, changeName }: MoneyTableProps) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: Money.Id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  return (
    <tr
      ref={setNodeRef}
      key={Money.Id}
      className={clsx('h-12 border-y-2 bg-white', isDragging && 'invisible')}
      style={style}
    >
      <td {...attributes} {...listeners} className='w-[40px]'>
        <img className='h-8 w-8' src={DragDrop} alt='Drag and drop icon' />
      </td>
      <td className='px-2'>
        <input className='w-[100%] border-2 px-2' type="text" value={Money.Name} onChange={(e: ChangeEvent<HTMLInputElement>) => changeName(Money.Id, e.currentTarget.value)} />
      </td>
      <td className='pr-2'>
        <button className='w-[99px] bg-red-500' onClick={() => deleteMoney(Money.Id)}>Delete</button>
      </td>
    </tr>
  );
}

export default EditMoneyRow;