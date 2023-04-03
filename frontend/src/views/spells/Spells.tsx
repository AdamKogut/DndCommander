import { clsx } from 'clsx';
import { useModal } from 'src/hooks/UseModal';
import { useAppSelector, useAppDispatch } from 'src/store';

function Spells() {
  const { spells } = useAppSelector((state) => state.Spell);
  const dispatch = useAppDispatch();
  const { create, destroy } = useModal();

  return (
    <div className={clsx('flex h-[calc(100%-60px)] flex-col overflow-hidden p-4')}>
      <div className='flex flex-row place-content-between space-x-4 p-4 pb-6'>
        <h2 className='text-3xl'>Spells</h2>
      </div>

    </div>
  )
}

export default Spells;