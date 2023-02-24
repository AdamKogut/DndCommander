import { ReactNode } from 'react';
import { Dialog } from "@headlessui/react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const Modal = ({ isOpen, title, children, onCancel, onConfirm }: ModalProps) => {
  const onInternalConfirm = () => {
    if (onConfirm)
    {
      return onConfirm();
    }
  }

  const onInternalCancel = () => {
    if (onCancel)
    {
      return onCancel();
    }
  }

  return (
    <Dialog open={isOpen} onClose={onInternalCancel} className='relative z-50'>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto min-w-[33vw] max-w-[80vw] rounded bg-white p-4">
          <Dialog.Title className='rounded-t-md bg-slate-200 p-2 text-xl'>{title}</Dialog.Title>
          <div className='border-x-2'>
            {children}
          </div>

          <div className='flex justify-end gap-x-3 rounded-b-md bg-slate-200 p-2'>
            {onCancel && <button className='py-1' onClick={onInternalCancel}>Cancel</button>}
            {onConfirm && <button className='py-1' onClick={onInternalConfirm}>Save</button>}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}