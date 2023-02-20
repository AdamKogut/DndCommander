import { useState, Fragment } from 'react';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import ErrorSign from '../../Images/error-sign.svg';
import WarningSign from '../../Images/warning-sign.svg';

type PlayerTableProps = {
  player: PlayerHealth;
  setPlayerName: (id: number, name: string) => void;
}

function PlayerRow({ player, setPlayerName }: PlayerTableProps) {
  const [tempName, setTempName] = useState(player.Name);

  const resetName = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTempName(player.Name);
    e.stopPropagation();
  }

  const submitName = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPlayerName(player.Id, tempName);
    e.stopPropagation();
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(event.target.value);
  }

  const stopPropogation = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  }

  const isWarning = player.Max * .2 < player.Current && player.Max * .5 > player.Current;
  const isError = player.Max * .2 > player.Current;
  return (
    <Fragment>
      <td className='w-10'>
        <img className={clsx(!isError && 'hidden', 'w-9')} src={ErrorSign} alt='Error Icon'/>
        <img className={clsx(!isWarning && 'hidden', 'w-9')} src={WarningSign} alt='warning Icon'/>
      </td>
      <td className='flex flex-row space-x-4 py-[13px]'>
        <input className='h-9 max-w-[20vw] grow border-2' type='text' value={tempName} onChange={handleNameChange} onClick={stopPropogation} />
        <button className='h-9 py-1' onClick={resetName}>&#10005;</button>
        <button className='h-9 py-1' onClick={submitName}>&#10004;</button>
      </td>
      <td>{player.Max}</td>
      <td>{player.Current}</td>
    </Fragment>
  )
}

export default PlayerRow