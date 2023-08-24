import { useContext } from 'react';
import { ModalContext } from 'src/Context/ModalContext';

export const useModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('useModal must be wrapped by <ModalContextProvider />!');
  }

  return modalContext;
};