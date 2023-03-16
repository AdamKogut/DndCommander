import { ChangeEvent } from 'react';
import { useModal } from 'src/hooks/UseModal';
import { changeCoin, changeCoinAmount } from 'src/services/Equipment';
import { useAppSelector, useAppDispatch } from 'src/store';
import { CoinItem } from 'src/types/equipment';
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

  const saveEdit = (playerList: CoinItem[]) => {
    dispatch(changeCoin(playerList));
    destroy();
  };

  const cn = 'p-2 border-2 rounded drop-shadow-sm';

  return (
    <div className='rounded border-2'>
      <h2 className='px-4 pt-4 text-xl'>Money</h2>
      <div className='flex flex-wrap gap-4 p-2'>
        {currentCoin.map((value: CoinItem) => {
          return (
            <div className={cn} key={value.Id}>
              <span className='break-words'>{value.Name}:</span>
              <input
                type='text'
                className='m-2 w-16 border-2'
                value={value.Amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(changeCoinAmount({ id: value.Id, amt: e.currentTarget.value}))} />
            </div>
          );
        })}
        <button className='btn-primary' onClick={openEditModal}>Edit Money Types</button>
      </div>
    </div>
  )
}

export default Money