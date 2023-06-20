import { useMemo } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { clsx } from 'clsx';
import SortableList from 'src/components/SortableList';
import { changeSpells, deleteSpell, updateSpell } from 'src/services/Spells';
import { useAppDispatch } from 'src/store';
import { SpellInformation } from 'src/types/spells';
import SpellItem from './SpellItem';

type SpellTableProps = {
  openAddModal: (id?: number) => void;
  spells: SpellInformation[];
}

function SpellTable({ openAddModal, spells }: SpellTableProps) {
  const dispatch = useAppDispatch();
  const spellIds = useMemo(() => spells.map((value: SpellInformation) => value.id), [spells]);

  const togglePrepared = (id: number) => {
    const found = spells.find(x => x.id === id);
    if (found !== undefined) {
      const newFound = { ...found };
      newFound.prepared = !newFound.prepared;
      dispatch(updateSpell(newFound));
    }
  }

  const rows = useMemo(() => spells.map((value: SpellInformation, index: number) => (
    <SpellItem
      key={index}
      spell={value}
      deleteSpell={(id: number) => dispatch(deleteSpell(id))}
      editSpell={openAddModal}
      togglePrepared={togglePrepared}
    />
  )), [spells]);

  const updateSpells = (start: number, end: number) => {
    const pl = [...spells];
    dispatch(changeSpells(arrayMove(pl, start, end)));
  }

  return (
    <div className='h-[calc(100%)] overflow-y-auto'>
      <table className={'w-[100%] table-fixed'}>
        <thead>
          <tr className={clsx(spells.length === 0 && 'hidden')}>
            <td className='w-8'></td>
            <td className='px-2'>Name</td>
            <td className='w-[52px] px-2'></td>
          </tr>
        </thead>
        <tbody>
          <SortableList idList={spellIds} setArray={updateSpells} itemList={rows} />
        </tbody>
      </table>
    </div>
  )
}

export default SpellTable;