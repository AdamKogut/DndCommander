import { Fragment, useState, useEffect } from 'react';
import { PlayerHealth } from 'src/types/players';

type PlayerTableProps = {
  player: PlayerHealth | undefined;
  saveAddEdit: (player: PlayerHealth | undefined) => void;
}

function AddEditModal({ player, saveAddEdit }: PlayerTableProps) {
  const [name, setName] = useState('');
  const [max, setMax] = useState(0);

  useEffect(() => {
    setName(player === undefined ? '' : player.Name);
    setMax(player === undefined ? 0 : player.Max);
  }, [player]);

  if (player === undefined)
  {
    return <Fragment />
  }

  const onSubmitClick = () => {
    player.Max = max;
    player.Name = name;

    saveAddEdit(player);
  }

  const onCancelClick = () => {
    saveAddEdit(undefined);
  }

  return (
    <Fragment>
    </Fragment>
  )
}

export default AddEditModal;