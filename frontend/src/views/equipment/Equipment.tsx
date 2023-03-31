import { clsx } from 'clsx';
import EquipmentList from './EquipmentList';
import Money from './Money';

function Equipment() {
  return (
    <div className={clsx('flex h-[calc(100%-60px)] flex-col overflow-hidden')}>
      <div className='flex flex-row place-content-between space-x-4 p-4 pb-6'>
        <h2 className='text-3xl'>Equipment</h2>
      </div>
      <div className='flex flex-wrap overflow-y-auto px-4 lg:flex-row-reverse'>
        <Money />
        <EquipmentList />
      </div>
    </div>
  )
}

export default Equipment