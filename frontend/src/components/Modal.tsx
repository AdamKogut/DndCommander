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
      <div className="fixed inset-0 flex h-[100vh] w-[100vw] items-center justify-center sm:h-auto sm:p-4">
        <Dialog.Panel className="mx-auto h-[100vh] w-[100vw] min-w-[33vw] bg-white sm:h-auto sm:max-h-[80vh] sm:min-w-[33vw] sm:max-w-[80vw] sm:rounded sm:p-4 lg:max-w-[55vw] 2xl:max-w-[40vw]">
          <Dialog.Title className='rounded-t-md bg-slate-200 p-2 text-xl'>{title}</Dialog.Title>
          <div className='h-[calc(100%-60px)] overflow-y-auto border-x-2 sm:h-auto sm:max-h-[calc(80vh-90px)]'>
            {children}
          </div>

          <div className='flex justify-end gap-x-3 rounded-b-md bg-slate-200 p-2'>
            {onCancel && <button className='btn-primary py-1' onClick={onInternalCancel}>Cancel</button>}
            {onConfirm && <button className='btn-primary py-1' onClick={onInternalConfirm}>Save</button>}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}