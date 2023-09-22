import { useState } from 'react';
import Conditions from 'src/Enums/Conditions';

type EditConditionModalProps = {
  conditions: Conditions[];
  save: (conditions: Conditions[]) => void;
  cancel: () => void;
}

function EditConditionModal({conditions, save, cancel}:EditConditionModalProps) {
  const [newConditions, setNewConditions] = useState([...conditions]);

  const toggleCondition = (condition: Conditions) => {
    const tempConditions = [...newConditions];
    const conditionIndex = tempConditions.indexOf(condition);
    if (conditionIndex === -1) {
      tempConditions.push(condition);
    }
    else {
      tempConditions.splice(conditionIndex, 1);
    }

    setNewConditions(tempConditions);
  }

  return (
    <div className='h-full max-h-full'>
      <div className='h-[calc(100%-53px)] overflow-y-auto'>
        <div className='grid grid-cols-2 md:grid-cols-3'>
          {Object.keys(Conditions).filter((k: string) => !isNaN(+k)).map((value: string) => (
            <label className='border-black mx-3 my-1 p-3 border-2 flex flex-row rounded-xl text-lg hover:bg-calltoaction dark:hover:text-black'>
              <input
                className='mr-4'
                type='checkbox'
                onChange={()=>toggleCondition(+value)}
                checked={newConditions.includes(+value)}
              />
              <span>{Conditions[+value]}</span>
            </label>
          ))}
        </div>
      </div>
      <div className='bg-primary-dark pb-1 text-right dark:bg-primary-light'>
        <button className='bg-calltoaction text-black mt-4 mr-4 py-1' onClick={cancel}>Cancel</button>
        <button className='bg-calltoaction text-black mt-4 mr-4 py-1' onClick={() => save(newConditions)}>Save</button>
      </div>
    </div>
  )
}

export default EditConditionModal;