import { ReactNode, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';

type PopoverButtonProps = {
  buttonText: string;
  overrideButtonClassname?: string;
  children: ReactNode;
  overridePopoverClassname?: string;
  overridePanelClassname?: string;
  placement: Placement;
}

export const PopoverButton = ({ buttonText, overrideButtonClassname, children, overridePopoverClassname, overridePanelClassname, placement }:PopoverButtonProps) => {
  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, { placement });

  return (
    <Popover className={overridePopoverClassname}>
      <Popover.Button
        ref={setReferenceElement}
        className={overrideButtonClassname}
      >
        {buttonText}
      </Popover.Button>

      <Transition
        enter="transition duration-160 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className={overridePanelClassname}
        >
          {children}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}