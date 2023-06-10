import { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { Id, Index } from 'flexsearch';
import { PlusIcon } from 'src/components/Icons';
import StringInput from 'src/components/StringInput';
import { useModal } from 'src/hooks/UseModal';
import { updateSpell } from 'src/services/Spells';
import { useAppSelector, useAppDispatch } from 'src/store';
import { SpellInformation } from 'src/types/spells';
import SpellModal from './SpellModals/SpellModal';
import SpellTable from './SpellTable';

function Spells() {
  const { spells } = useAppSelector((state) => state.Spell);
  const dispatch = useAppDispatch();
  const { create, destroy } = useModal();

  // search bar logic
  const [query, setQuery] = useState('');
  const [filteredSpells, setFilteredSpells] = useState<SpellInformation[]>([]);
  const fuzzySearchIndex = useMemo(() => {
    let index = new Index({
      tokenize:'full'
    });
    spells.forEach((value: SpellInformation) => index=index.add(value.id, value.name));
    return index;
  }, [spells]);
  useEffect(() => {
    if (query.length === 0) {
      setFilteredSpells(spells);
      return;
    }

    const tempFilteredSpells:SpellInformation[] = [];
    fuzzySearchIndex.search(query).forEach((value: Id) => {
      const found = spells.find(x => x.id === value);
      if (found) {
        tempFilteredSpells.push(found);
      }
    });
    setFilteredSpells(tempFilteredSpells);
  }, [query, fuzzySearchIndex]);

  // Spell logic
  const modifySpell = (spell: SpellInformation) => {
    dispatch(updateSpell(spell));
    destroy();
  }

  const openAddModal = (id?: number) => {
    let newSpellInfo: SpellInformation = {
      id: Date.now(),
      name: '',
      components: '',
      spellLevel: '',
      castingTime: '',
      duration: '',
      rangeArea: '',
      damage: '',
      attackSave: '',
      description: '',
      tags: [],
      prepared: false
    };

    if (id !== undefined)
    {
      const spellToChange = spells.find(x => x.id === id);
      if (spellToChange !== undefined)
      {
        newSpellInfo = {
          ...spellToChange
        };
      }
    }

    create({
      title: 'Add Spell',
      children: <SpellModal cancel={destroy} saveEdit={modifySpell} oldSpellInfo={newSpellInfo}/>
    });
  }

  return (
    <Fragment>
      <div className={clsx('flex h-[calc(100%-60px)] flex-col overflow-hidden p-4')}>
        <div className='flex flex-row place-content-between space-x-4 p-4 pb-6'>
          <h2 className='text-3xl'>Spells</h2>
          <button>Filter</button>
        </div>
        <StringInput
          placeholder='Search Spells'
          value={query}
          inputOnChange={(e:ChangeEvent<HTMLInputElement>)=>setQuery(e.target.value)}
        />
        {/* TODO: add filters */}
        <SpellTable
          openAddModal={openAddModal}
          spells={filteredSpells}
        />
      </div>
      <button
        className='secondary-coloring fixed -bottom-2 right-4 mb-4 ml-4 w-12 rounded-full p-3'
        onClick={() => openAddModal()}
      >
        <PlusIcon className='h-6 w-6'/>
      </button>
    </Fragment>
  )
}

export default Spells;