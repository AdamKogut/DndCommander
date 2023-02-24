import { Fragment, useState, useEffect } from 'react';
import { useModal } from 'src/hooks/UseModal';
import { PlayerHealth } from 'src/types/players';

type PlayerTableProps = {
  playerList: PlayerHealth[];
  saveEdit: (players: PlayerHealth[] | undefined) => void;
  isOpen: boolean;
}

function AddEditModal({ playerList, saveEdit, isOpen }: PlayerTableProps) {
  const [tempPlayerList, setTempPlayerList] = useState([...playerList]);
  const { create } = useModal();

  const onSubmitClick = () => {
    saveEdit(tempPlayerList)
  }

  const onCancelClick = () => {
    saveEdit(undefined);
  }

  const children = <button>HI</button>

  useEffect(() => {
    if (isOpen) {
      create({
        title: 'Edit Players',
        children,
        onCancel: onCancelClick,
        onConfirm: onSubmitClick
      });
    }
  }, [isOpen]);

  return null
}

export default AddEditModal;