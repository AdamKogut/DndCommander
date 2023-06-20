import { useState, MouseEvent, useMemo } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { EquipmentItem } from 'src/types/equipment';
import EditMoneyTable from './EditMoneyTable';

type MoneyModalProps = {
  moneyList: EquipmentItem[];
  saveEdit: (moneys: EquipmentItem[]) => void;
  cancel: () => void;
}

function MoneyModal({ moneyList, saveEdit, cancel }: MoneyModalProps) {
  const [tempMoneyList, setTempMoneyList] = useState(JSON.parse(JSON.stringify(moneyList)));
  const moneyListIds = useMemo(() => tempMoneyList.map(({ id }: EquipmentItem) => id), [tempMoneyList]);

  const addMoney = (e: MouseEvent<HTMLButtonElement>) => {
    const pl = [...tempMoneyList];
    pl.push({
      id: Date.now(),
      name: '',
      amount:0
    });
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
      foundMoney.name = name;
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