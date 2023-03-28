import { ReactNode } from 'react';
import { Dialog } from "@headlessui/react";
import { clsx } from 'clsx';

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
}

export const Modal = ({ isOpen, title, children, onCancel, onConfirm, onClose }: ModalProps) => {
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

  const onInternalClose = () => {
    if (onClose)
    {
      return onClose();
    }
  }

  return (
    <Dialog open={isOpen} onClose={onInternalCancel} className='relative z-50'>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex h-full w-full items-center justify-center sm:h-auto sm:p-4">
        <Dialog.Panel className="primary-coloring mx-auto h-full w-full min-w-[33%] bg-white sm:h-[80%] sm:max-h-[80%] sm:min-w-[33%] sm:max-w-[80%] sm:rounded sm:p-4 lg:max-w-[55%] 2xl:max-w-[40%]">
          <Dialog.Title className='rounded-t-md bg-slate-200 p-2 text-xl'>{title}</Dialog.Title>
          <div className={clsx('h-[calc(100%-60px)] overflow-hidden border-x-2', (onConfirm || onCancel || onClose) && 'h-[calc(100%-90px)]')}>
            {children}
          </div>

          <div className='flex justify-end gap-x-3 rounded-b-md bg-slate-200 p-2'>
            {onCancel && <button className='secondary-coloring py-1' onClick={onInternalCancel}>Cancel</button>}
            {onConfirm && <button className='secondary-coloring py-1' onClick={onInternalConfirm}>Save</button>}
            {onClose && <button className='secondary-coloring py-1' onClick={onInternalClose}>Close</button>}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}