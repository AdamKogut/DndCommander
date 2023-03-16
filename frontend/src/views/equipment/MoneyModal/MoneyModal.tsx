import { useState, MouseEvent, useMemo } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { CoinItem } from 'src/types/equipment';
import EditMoneyTable from './EditMoneyTable';

type MoneyModalProps = {
  moneyList: CoinItem[];
  saveEdit: (moneys: CoinItem[]) => void;
  cancel: () => void;
}

function MoneyModal({ moneyList, saveEdit, cancel }: MoneyModalProps) {
  const [tempMoneyList, setTempMoneyList] = useState(JSON.parse(JSON.stringify(moneyList)));
  const moneyListIds = useMemo(() => tempMoneyList.map(({ Id }: CoinItem) => Id), [tempMoneyList]);

  const addMoney = (e: MouseEvent<HTMLButtonElement>) => {
    const pl = [...tempMoneyList];
    pl.push({
      Id: Date.now(),
      Name: '',
      Amount:0
    });
    console.log(pl)
    setTempMoneyList(pl);
    e.stopPropagation();
  };

  const changeName = (id: number, name: string) => {
    if (name.length > 22)
    {
      return;
    }
    const pl = [...tempMoneyList];
    const foundMoney = pl.find((x => x.Id === id));
    if (foundMoney)
    {
      foundMoney.Name = name;
    }

    setTempMoneyList(pl);
  }

  const deleteMoney = (id: number) => {
    const pl = [...tempMoneyList];
    const foundMoney = pl.findIndex((x => x.Id === id));
    if (foundMoney !== -1)
    {
      pl.splice(foundMoney, 1);
    }
    
    setTempMoneyList(pl);
  }

  const updateItems = (start: number, end: number) => {
    const pl = [...tempMoneyList];
    setTempMoneyList(arrayMove(pl, start, end));
  }

  return (
    <EditMoneyTable
      MoneyList={tempMoneyList}
      MoneyListIds={moneyListIds}
      cancel={cancel}
      saveEdit={saveEdit}
      addMoney={addMoney}
      changeName={changeName}
      deleteMoney={deleteMoney}
      updateItems={updateItems}/>
  );
}

export default MoneyModal;