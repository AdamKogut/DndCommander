import { clsx } from 'clsx';
import { PlusIcon } from 'src/components/Icons';
import { useModal } from 'src/hooks/UseModal';
import { updateSpell } from 'src/services/Spells';
import { useAppSelector, useAppDispatch } from 'src/store';
import { SpellInformation } from 'src/types/spells';
import SpellModal from './SpellModal/SpellModal';

function Spells() {
  const { spells } = useAppSelector((state) => state.Spell);
  const dispatch = useAppDispatch();
  const { create, destroy } = useModal();

  const modifySpell = (spell: SpellInformation) => {
    dispatch(updateSpell(spell));
    destroy();
  }

  const openAddModal = () => {
    const newSpellInfo: SpellInformation = {
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

    create({
      title: 'Add Spell',
      children: <SpellModal cancel={destroy} saveEdit={modifySpell} oldSpellInfo={newSpellInfo}/>
    });
  }

  return (
    <div className={clsx('flex h-[calc(100%-60px)] flex-col overflow-hidden p-4')}>
      <div className='flex flex-row place-content-between space-x-4 p-4 pb-6'>
        <h2 className='text-3xl'>Spells</h2>
      </div>
      {/* TODO: add search bar */}
      {/* TODO: add filters */}
      {/* TODO: add grid */}
      <button
        className='secondary-coloring sticky top-full left-full mb-4 ml-4 w-12 rounded-full p-3'
        onClick={openAddModal}
      >
        <PlusIcon className='h-6 w-6'/>
      </button>
    </div>
  )
}

export default Spells;