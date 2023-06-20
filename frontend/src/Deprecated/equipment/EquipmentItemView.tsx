import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronIcon, TrashIcon } from 'src/components/Icons';
import { EquipmentItem } from 'src/types/equipment';
import DragDrop from 'src/Images/DragDrop.png';
import { clsx } from 'clsx';
import { ChangeEvent, Fragment, useState } from 'react';

type EquipmentItemProps = {
  item: EquipmentItem;
  updateName: (id: number, name: string) => void;
  updateAmount: (id: number, amt: number) => void;
  deleteItem: (id: number) => void;
}

function EquipmentItemView({ item, updateAmount, updateName, deleteItem }: EquipmentItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: item.id
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
    updateAmount(item.id, amt);
  }

  return (
    <Fragment>
      <tr
        ref={setNodeRef}
        className={clsx('rounded border-2 bg-white pt-2 drop-shadow-sm', isDragging && 'invisible')}
        style={style}
        key={item.id}
      >
        <td {...attributes} {...listeners} className='w-[40px]'>
          <img className='h-8 w-8' src={DragDrop} alt='Drag and drop icon' />
        </td>
        <td className="mx-2 w-20">
          <input className="w-full pl-2" type="number" value={item.amount} onChange={localUpdateAmount} />
        </td>
        <td className='px-2'>
          <input className='w-[100%] px-2' type="text" value={item.name} placeholder="Item Name" onChange={(e: ChangeEvent<HTMLInputElement>) => updateName(item.id, e.currentTarget.value)} />
        </td>
        <td className='w-16'>
          <button className='border-transparent bg-transparent p-2' onClick={() => setIsOpen(!isOpen)}>
            <ChevronIcon className={clsx('h-6 w-8 rotate-90', isOpen && "!rotate-0")} />
          </button>
        </td>
      </tr>
      <tr className={clsx("bg-slate-100 shadow-[0_0_4px_#ccc]", !isOpen && "hidden", isDragging && 'invisible')}>
        <td colSpan={3}>

        </td>
        <td className='w-16'>
          <button className='border-[rgb(231,22,15)] p-2' onClick={() => deleteItem(item.id)}>
            <TrashIcon className='h-6 w-8 text-[rgb(231,22,15)]' />
          </button>
        </td>
      </tr>
      <tr className='h-4'></tr>
    </Fragment>
  )
}

export default EquipmentItemView;