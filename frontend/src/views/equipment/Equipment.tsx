import { clsx } from 'clsx';
import { useModal } from 'src/hooks/UseModal';
import { useAppSelector, useAppDispatch } from 'src/store';
import EquipmentList from './EquipmentList';
import Money from './Money';

function Equipment() {
  const { players } = useAppSelector((state) => state.Player);
  const dispatch = useAppDispatch();
  const { create, destroy } = useModal();

  return (
    <div className={clsx('flex h-[calc(100%-60px)] flex-col overflow-y-auto overflow-x-hidden p-4 sm:ml-64')}>
      <div className='flex flex-row place-content-between space-x-4 pb-6'>
        <h2 className='text-3xl'>Equipment</h2>
      </div>
      <div className='flex flex-wrap lg:flex-row-reverse'>
        <Money />
        <EquipmentList />
      </div>
    </div>
  )
}

export default Equipment