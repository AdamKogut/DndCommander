import { createContext, ReactNode, useCallback, useState } from 'react';
import { Modal } from 'src/Components/Modal';

type Modal = {
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

type ModalContextType = {
  create: (newModal: Modal) => boolean;
  destroy: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

type InternalModalProps = {
  modal: Modal | null;
  destroy: () => void;
}

const InternalModal = ({ modal, destroy }: InternalModalProps) => {
  if (!modal)
  {
    return null;
  }

  const { title, children, onConfirm, onCancel, onClose } = modal;

  const onLocalCancel = () => {
    if (onCancel) {
      onCancel();
      destroy();
    }
  };

  const onLocalConfirm = () => {
    if (onConfirm) {
      onConfirm();
      destroy();
    }
  };

  const onLocalClose = () => {
    if (onClose) {
      onClose();
      destroy();
    }
  };

  return (
    <Modal
      isOpen
      title={title}
      onCancel={onCancel ? onLocalCancel : undefined}
      onConfirm={onConfirm ? onLocalConfirm : undefined}
      onClose={onClose ? onLocalClose : undefined}
    >
      {children}
    </Modal>
  )
}

type ModalContextProviderProps = {
  children: ReactNode
}

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [currentModal, setCurrentModal] = useState<Modal | null>(null);

  const create = useCallback((newModal: Modal) => {
    if (currentModal !== null) {
      return false;
    }

    setCurrentModal(newModal);
    return true;
  }, [currentModal]);

  const destroy = useCallback(() => {
    setCurrentModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ create, destroy }}>
      <InternalModal modal={currentModal} destroy={destroy}/>
      {children}
    </ModalContext.Provider>
  )
}