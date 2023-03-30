import { Fragment } from "react";
import { Popover, Transition } from '@headlessui/react';

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
      <div className='flex flex-row  place-content-between pt-6 lg:flex-col lg:place-content-start lg:gap-y-8 lg:pt-0'>
        <Popover className='h-[60px] w-[33%] lg:ml-4 lg:w-32'>
          <Popover.Button className='h-full w-full bg-[rgb(231,22,15)] text-white'>
            Damage
          </Popover.Button>

          <Transition
            enter="transition duration-160 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="relative bottom-52 left-16 z-0 flex flex-col gap-y-2 rounded-lg border-2 bg-slate-100 p-4 shadow-2xl lg:-left-8 lg:-top-4">
              {negativeModificationValues.map((value: number) => {
                const stringValue = value > 0 ? `+${value}` : value;
                return <button key={value} className='bg-[rgb(231,22,15)] text-white' onClick={() => applyModification(value)}>{stringValue}</button>;
              })}
            </Popover.Panel>
          </Transition>
        </Popover>
        <Popover className='h-[60px] w-[33%] lg:ml-4 lg:w-32'>
          <Popover.Button className='h-full w-full bg-[rgb(32,150,243)] text-white'>
            Heal
          </Popover.Button>

          <Transition
            enter="transition duration-160 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="relative bottom-[440px] right-16 z-0 flex flex-col gap-y-2 rounded-lg border-2 bg-slate-100 p-4 shadow-2xl lg:-left-8 lg:-top-4">
              <h5 className="w-full border-b-2 border-black text-lg">Temp HP</h5>
              {tempModificationValues.map((value: number) => {
                const stringValue = value > 0 ? `+${value}` : value;
                return <button key={value} className='border-[rgb(32,150,243)]' onClick={() => applyTempModification(value)}>{stringValue}</button>;
              })}
              <h5 className="w-full border-b-2 border-black text-lg">Normal HP</h5>
              <button className='bg-[rgb(32,150,243)] text-white' onClick={() => applyModification(0)}>Max</button>
              {positiveModificationValues.map((value: number) => {
                const stringValue = value > 0 ? `+${value}` : value;
                return <button key={value} className='border-[rgb(32,150,243)]' onClick={() => applyModification(value)}>{stringValue}</button>;
              })}
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </Fragment>
  )
}

export default HealthModification