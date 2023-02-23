import { useState } from 'react';
import { clsx } from 'clsx';

type PlayerTableProps = {
  addPlayer: () => void;
  removePlayers: () => void;
}

function PlayerListModification({ addPlayer, removePlayers }: PlayerTableProps) {
  const [isSecondClick, setIsSecondClick] = useState(false);

  const HandleRemoveFirst = () => {
    setIsSecondClick(true);
  }

  const HandleRemoveSecond = () => {
    removePlayers();
    setIsSecondClick(false);
  }

  return (
    <div className='flex flex-row place-content-between space-x-4 pb-6'>
      <h2 className='text-3xl'>Player Health List</h2>
      <div className='flex flex-row place-content-end space-x-4'>
        <button onClick={addPlayer}>Add Player</button>
        <button className={clsx(isSecondClick && 'hidden', 'bg-red-500')} onClick={HandleRemoveFirst}>Remove Selected Players</button>
        <button className={clsx(!isSecondClick && 'hidden', 'bg-red-500')} onClick={HandleRemoveSecond}>Confirm Remove Players?</button>
      </div>
    </div>
  )
}

export default PlayerListModification