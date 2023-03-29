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
      {/* Have two buttons, one that says heal and other says damage (blue/red) then 
        once user clicks on it it brings up a sub menu with +/- 1/5/10 and temp health, it only disappears when user
        clicks away */}
      <div className='flex flex-row  place-content-between pt-6 lg:w-[500px]'>
        {modificationValues.map((value: number) => {
          const stringValue = value > 0 ? `+${value}` : value;
          return <button key={value} className='secondary-coloring px-3' onClick={() => applyModification(value)}>{stringValue}</button>;
        })}
      </div>
      <div className='flex flex-row gap-x-4 pt-6'>
        {tempModificationValues.map((value: number) => {
          return (
            <button
              key={value}
              className='secondary-coloring'
              onClick={() => applyTempModification(value)}>
              {`+${value} Temp HP`}
            </button>
          );
        })}
        <button key={'max'} className='secondary-coloring' onClick={() => applyModification(0)}>Max HP</button>
      </div>
    </Fragment>
  )
}

export default HealthModification