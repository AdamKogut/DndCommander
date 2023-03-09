import { Fragment } from "react";

type HealthModificationProps = {
  applyModification: (amt: number) => void;
  applyTempModification: (amt: number) => void;
}

function HealthModification({ applyModification, applyTempModification }: HealthModificationProps) {
  const modificationValues = [-10, -5, -1, 1, 5, 10];
  const tempModificationValues = [1, 5];

  return (
    <Fragment>
      <div className='flex flex-row place-content-between pt-6'>
        {modificationValues.map((value: number) => {
          const stringValue = value > 0 ? `+${value}` : value;
          return <button key={value} className='btn-primary' onClick={() => applyModification(value)}>{stringValue}</button>;
        })}
        <button key={'max'} className='btn-primary' onClick={() => applyModification(0)}>Max</button>
      </div>
      <div className='flex flex-row gap-x-4 pt-6'>
        {tempModificationValues.map((value: number) => {
          return (
            <button
              key={value}
              className='btn-primary'
              onClick={() => applyTempModification(value)}>
              {`+${value} Temp HP`}
            </button>
          );
        })}
      </div>
    </Fragment>
  )
}

export default HealthModification