import { arrayMove } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { PlusIcon } from 'src/components/Icons';
import SortableList from 'src/components/SortableList';
import { addEquipmentItem, changeEquipment, changeEquipmentItem, removeEquipmentItem } from 'src/services/Equipment';
import { useAppSelector, useAppDispatch } from 'src/store';
import { EquipmentItem } from 'src/types/equipment';
import EquipmentItemView from './EquipmentItemView';

function EquipmentList() {
  const { currentEquipment } = useAppSelector((state) => state.Equipment);
  const dispatch = useAppDispatch();

  const equipmentIds = useMemo(() => currentEquipment.map(({ Id }: EquipmentItem) => Id), [currentEquipment]);

  const updateItems = (start: number, end: number) => {
    const pl = [...currentEquipment];
    dispatch(changeEquipment(arrayMove(pl, start, end)));
  }

  const updateName = (id: number, name: string) => {
    const currItem = currentEquipment.find(x => x.Id === id);
    if (currItem) {
      dispatch(changeEquipmentItem({
        ...currItem,
        Name: name
      }));
    }
  }

  const updateAmount = (id: number, amt: number) => {
    const currItem = currentEquipment.find(x => x.Id === id);
    if (currItem) {
      dispatch(changeEquipmentItem({
        ...currItem,
        Amount: amt
      }));
    }
  }

  const deleteItem = (id: number) => {
    dispatch(removeEquipmentItem(id));
  }

  const rows = currentEquipment.map((value: EquipmentItem) => (
    <EquipmentItemView
      key={value.Id}
      item={value}
      updateAmount={updateAmount}
      updateName={updateName}
      deleteItem={deleteItem}
    />
  ));

  return (
    <div className='mb-2 w-full overflow-x-hidden lg:w-[calc(60%-8px)] xl:w-[calc(75%-8px)] 2xl:w-[calc(80%-8px)]'>
      <div className='w-full rounded border-2'>
        <h2 className='px-4 pt-4 text-xl'>Equipment</h2>
        <table className='mx-4 mt-4 w-[calc(100%-32px)] table-fixed border-separate border-spacing-y-4 p-2'>
          <tbody>
            <SortableList idList={equipmentIds} setArray={updateItems} itemList={rows} />
          </tbody>
        </table>
        <button className='secondary-coloring mb-4 ml-4 rounded-full p-3' onClick={() => dispatch(addEquipmentItem())}>
          <PlusIcon className='h-6 w-6'/>
        </button>
      </div>
    </div>
  )
}

export default EquipmentList