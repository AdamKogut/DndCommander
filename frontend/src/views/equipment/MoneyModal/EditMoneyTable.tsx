import { MouseEvent } from 'react';
import { clsx } from 'clsx';
import { CoinItem } from 'src/types/equipment';
import SortableList from 'src/components/SortableList';
import EditMoneyRow from './EditMoneyRow';
import { UniqueIdentifier } from '@dnd-kit/core';

type EditMoneyTableProps = {
  MoneyList: CoinItem[];
  MoneyListIds: UniqueIdentifier[];
  saveEdit: (moneys: CoinItem[]) => void;
  cancel: () => void;
  addMoney: (e: MouseEvent<HTMLButtonElement>) => void;
  changeName: (id: number, name: string) => void;
  deleteMoney: (id: number) => void;
  updateItems: (start: number, end: number) => void;
}

function EditMoneyTable({
  MoneyList,
  MoneyListIds,
  saveEdit,
  cancel,
  addMoney,
  changeName,
  deleteMoney,
  updateItems
}: EditMoneyTableProps) {
  const rows = MoneyList.map((value: CoinItem) => {
    return (
      <EditMoneyRow
        key={value.Id}
        Money={value}
        deleteMoney={deleteMoney}
        changeName={changeName}
      />
    )
  })

  return (
    <div className='h-full max-h-full min-w-[34%]'>
      <button className='btn-primary my-4 ml-4 mr-20' onClick={addMoney}>Add Money</button>
      <div className='h-[calc(100%-127px)] overflow-y-auto'>
        <table className={'w-[100%] table-fixed'}>
          <thead>
            <tr className={clsx(MoneyList.length === 0 && 'hidden')}>
              <td className='w-8'></td>
              <td className='px-2'>Currency Name</td>
              <td className='w-[110px] px-2'></td>
            </tr>
          </thead>
          <tbody>
            <SortableList idList={MoneyListIds} setArray={updateItems} itemList={rows} />
          </tbody>
        </table>
      </div>
      <div className='bg-slate-200 pb-1 text-right'>
        <button className='btn-primary mt-4 mr-4 py-1' onClick={cancel}>Cancel</button>
        <button className='btn-primary mt-4 mr-4 py-1' onClick={() => saveEdit(MoneyList)}>Save</button>
      </div>
    </div>
  );
}

export default EditMoneyTable;