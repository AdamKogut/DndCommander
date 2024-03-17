import { Fragment } from "react";
import { PopoverButton } from "src/components/PopoverButton";

type HealthModificationProps = {
  applyModification: (amt: number) => void;
  applyTempModification: (amt: number) => void;
}

function HealthModification({ applyModification, applyTempModification }: HealthModificationProps) {
  const negativeModificationValues = [-10, -5, -1];
  const positiveModificationValues = [10, 5, 1];
  const tempModificationValues = [5, 1];

  return (
    <Fragment>
      <div className='flex flex-row  place-content-between pt-6 lg:place-content-start lg:gap-y-8 lg:pt-0'>
        <PopoverButton
          buttonText="Damage"
          overrideButtonClassname="h-full w-full bg-custom-red text-white"
          overridePopoverClassname="h-[60px] w-[128px] lg:ml-4 lg:w-32"
          overridePanelClassname="flex flex-col gap-y-2 rounded-lg border-2 bg-custom-orange text-white p-4 shadow-2xl"
          placement="top-end"
        >
          {negativeModificationValues.map((value: number) => {
            const stringValue = value > 0 ? `+${value}` : value;
            return <button key={value} className='bg-custom-red text-white' onClick={() => applyModification(value)}>{stringValue}</button>;
          })}
        </PopoverButton>
        {/* TODO: Make widths less hardcoded */}
        <PopoverButton
          buttonText="Heal"
          overrideButtonClassname="h-full w-full bg-custom-blue text-white lg:ml-4 lg:w-32"
          overridePopoverClassname="h-[60px] w-[128px]"
          overridePanelClassname="flex flex-col gap-y-2 rounded-lg border-2 bg-custom-orange text-black p-4 shadow-2xl w-[150%]"
          placement="top-start"
        >
          <div className="grid grid-cols-2 gap-4 pr-2 border-r-black">
            <h5 className="w-full border-b-2 border-black text-lg col-span-2">Temp HP</h5>
            {tempModificationValues.map((value: number) => {
              const stringValue = value > 0 ? `+${value}` : value;
              return <button key={value} className='bg-custom-blue text-white' onClick={() => applyTempModification(value)}>{stringValue}</button>;
            })}
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <h5 className="w-full border-b-2 border-black text-lg col-span-2">Normal HP</h5>
            <button className='bg-custom-blue text-white' onClick={() => applyModification(0)}>Max</button>
            {positiveModificationValues.map((value: number) => {
              const stringValue = value > 0 ? `+${value}` : value;
              return <button key={value} className='bg-custom-blue text-white' onClick={() => applyModification(value)}>{stringValue}</button>;
            })}
          </div>
        </PopoverButton>
      </div>
    </Fragment>
  )
}

export default HealthModification;