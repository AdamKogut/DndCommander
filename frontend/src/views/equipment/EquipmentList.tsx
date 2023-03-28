import { useState, MouseEvent, useMemo } from 'react';
import { useModal } from 'src/hooks/UseModal';
import { addEquipmentItem } from 'src/services/Equipment';
import { useAppSelector, useAppDispatch } from 'src/store';
import { EquipmentItem } from 'src/types/equipment';

function EquipmentList() {
  const { currentEquipment } = useAppSelector((state) => state.Equipment);
  const dispatch = useAppDispatch();

  return (
    <div className='mb-2 w-full overflow-x-hidden lg:w-[calc(60%-8px)] xl:w-[calc(75%-8px)] 2xl:w-[calc(80%-8px)]'>
      <div className='w-full rounded border-2'>
        <h2 className='px-4 pt-4 text-xl'>Equipment</h2>
        <div className='flex flex-wrap gap-4 p-2'>
          {currentEquipment.map((value: EquipmentItem) => {
            return (
              <div className='rounded border-2 p-2 drop-shadow-sm' key={value.Id}>
                {/* <span className='w-24 break-words'>{value.Name}:</span>
                <input
                  type='text'
                  className='m-2 w-16 border-2'
                  value={value.Amount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(changeCoinAmount({ id: value.Id, amt: e.currentTarget.value}))} /> */}
              </div>
            );
          })}
          <button className='secondary-coloring h-14' onClick={() => dispatch(addEquipmentItem())}>Add Equipment Item</button>
        </div>
      </div>
    </div>
  )
}

export default EquipmentList