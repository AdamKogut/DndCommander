/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronIcon } from 'src/components/Icons';
import DragDrop from 'src/Images/DragDrop.png';
import { clsx } from 'clsx';
import { Fragment, useState } from 'react';
import { SpellInformation } from 'src/types/spells';
import SpellDetails from './SpellDetails';

type SpellItemProps = {
  spell: SpellInformation;
  editSpell: (id: number) => void;
  deleteSpell: (id: number) => void;
  togglePrepared: (id: number) => void;
}

function SpellItem({ spell, editSpell, deleteSpell, togglePrepared }: SpellItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: spell.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  return (
    <Fragment>
      <tr
        ref={setNodeRef}
        className={clsx('rounded border-2 bg-white pt-2 drop-shadow-sm', isDragging && 'invisible')}
        style={style}
        key={spell.id}
      >
        <td {...attributes} {...listeners} className='w-[40px]'>
          <img className='h-8 w-8' src={DragDrop} alt='Drag and drop icon' />
        </td>
        <td onClick={() => setIsOpen(!isOpen)}>
          {spell.name}
        </td>
        <td className='w-16' onClick={() => setIsOpen(!isOpen)}>
          <button className='border-transparent bg-transparent p-2' onClick={() => setIsOpen(!isOpen)}>
            <ChevronIcon className={clsx('h-6 w-8 rotate-90', isOpen && "!rotate-0")} />
          </button>
        </td>
      </tr>
      <SpellDetails
        isDragging={isDragging}
        isOpen={isOpen}
        editSpell={editSpell}
        deleteSpell={deleteSpell}
        togglePrepared={togglePrepared}
        spell={spell}
      />
      <tr className='h-4'></tr>
    </Fragment>
  )
}

export default SpellItem;