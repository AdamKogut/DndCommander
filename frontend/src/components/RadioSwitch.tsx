import { Switch } from '@headlessui/react';
import { clsx } from 'clsx';

type RadioSwitchProps = {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  label: string;
  switchBackgroundCssOverride?: string;
  switchDotCssOverride?: string;
  labelCssOverride?: string;
  parentOverride?: string;
}

function RadioSwitch({ isActive, setIsActive, label, switchBackgroundCssOverride, switchDotCssOverride, labelCssOverride, parentOverride }: RadioSwitchProps) {
  return (
    <div className={`relative z-0 m-2 ${parentOverride}`}>
      <Switch
        checked={isActive}
        id="floating_prepared"
        onChange={setIsActive}
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className={clsx(
          "relative inline-flex h-[38px] w-[74px] shrink-0 scale-75 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
          isActive ? 'bg-blue-500' : 'bg-slate-300',
          switchBackgroundCssOverride
        )}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={clsx(
            "pointer-events-none inline-block h-[34px] w-[34px] translate-y-[-11px] rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
            isActive ? 'translate-x-5' : '-translate-x-5',
            switchDotCssOverride
          )}
        />
      </Switch>
      <label
        htmlFor="floating_prepared"
        className={`absolute top-[22px] left-20 z-10 origin-[0] -translate-y-4 duration-300 dark:text-black ${labelCssOverride}`}
      >
        {label}
      </label>
    </div>
  )
}

export default RadioSwitch;