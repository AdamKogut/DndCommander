import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon } from 'src/components/Icons';
import { EquipmentItem } from 'src/types/equipment';
import DragDrop from 'src/Images/DragDrop.png';
import { clsx } from 'clsx';
import { ChangeEvent } from 'react';

type EquipmentItemProps = {
  item: EquipmentItem;
  updateName: (id: number, name: string) => void;
  updateAmount: (id: number, amt: number) => void;
  deleteItem: (id: number) => void;
}

function EquipmentItemView({ item, updateAmount, updateName, deleteItem }: EquipmentItemProps) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: item.Id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  const localUpdateAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const amt = +e.currentTarget.value;
    if (isNaN(amt) || e.currentTarget.value.trim() === "")
    {
      return;
    }
    updateAmount(item.Id, amt);
  }

  return (
    <tr
      ref={setNodeRef}
      className={clsx('rounded border-2 bg-white drop-shadow-sm', isDragging && 'invisible')}
      style={style}
      key={item.Id}
    >
      <td {...attributes} {...listeners} className='w-[40px]'>
        <img className='h-8 w-8' src={DragDrop} alt='Drag and drop icon' />
      </td>
      <td className="mx-2 w-20">
        <input className="w-full pl-2" type="number" value={item.Amount} onChange={localUpdateAmount} />
      </td>
      <td className='px-2'>
        <input className='w-[100%] px-2' type="text" value={item.Name} placeholder="Item Name" onChange={(e: ChangeEvent<HTMLInputElement>) => updateName(item.Id, e.currentTarget.value)} />
      </td>
      <td className='w-16'>
        <button className='border-[rgb(231,22,15)] p-2' onClick={() => deleteItem(item.Id)}>
          <TrashIcon className='h-6 w-8 text-[rgb(231,22,15)]' />
        </button>
      </td>
    </tr>
  )
}

export default EquipmentItemView;