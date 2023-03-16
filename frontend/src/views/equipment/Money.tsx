import { ChangeEvent } from 'react';
import { useModal } from 'src/hooks/UseModal';
import { changeCoin, changeCoinAmount } from 'src/services/Equipment';
import { useAppSelector, useAppDispatch } from 'src/store';
import { EquipmentItem } from 'src/types/equipment';
import MoneyModal from './MoneyModal/MoneyModal';

function Money() {
  const { currentCoin } = useAppSelector((state) => state.Equipment);
  const dispatch = useAppDispatch();
  const { create, destroy } = useModal();

  const openEditModal = () => {
    create({
      title: 'Edit Players',
      children: <MoneyModal moneyList={currentCoin} saveEdit={saveEdit} cancel={destroy} />
    });
  }

  const saveEdit = (playerList: EquipmentItem[]) => {
    dispatch(changeCoin(playerList));
    destroy();
  };

  return (
    <div className='mb-2 w-full overflow-x-hidden lg:ml-2 lg:w-[40%] xl:w-[25%] 2xl:w-[20%]'>
      <div className='w-full rounded border-2'>
        <h2 className='px-4 pt-4 text-xl'>Money</h2>
        <div className='flex flex-wrap gap-4 p-2'>
          {currentCoin.map((value: EquipmentItem) => {
            return (
              <div className='rounded border-2 p-2 drop-shadow-sm' key={value.Id}>
                <span className='w-24 break-words'>{value.Name}:</span>
                <input
                  type='text'
                  className='m-2 w-16 border-2'
                  value={value.Amount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(changeCoinAmount({ id: value.Id, amt: e.currentTarget.value}))} />
              </div>
            );
          })}
          <button className='btn-primary h-14' onClick={openEditModal}>Edit Money Types</button>
        </div>
      </div>
    </div>
  )
}

export default Money