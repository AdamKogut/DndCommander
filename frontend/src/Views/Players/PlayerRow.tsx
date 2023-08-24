import { Fragment } from 'react';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/Types/Players';
import { ErrorIcon, WarningIcon } from 'src/Components/Icons';

type PlayerTableProps = {
  player: PlayerHealth;
}

function PlayerRow({ player }: PlayerTableProps) {
  const isWarning = player.Max * .2 < player.Current && player.Max * .5 > player.Current;
  const isError = player.Max * .2 > player.Current;
  return (
    <Fragment>
      <td className='w-[60%] break-words py-[13px] px-1'>{player.Name}</td>
      <td className='px-1 w-[calc(40%-44px)] text-center'>
        {player.Current}{player.TempHp!==0?`+${player.TempHp}`:''}
        <hr  className='w-[90%] m-auto'/>
        {player.Max}{player.TempMaxHp!==0?`+${player.TempMaxHp}`:''}
      </td>
      <td className='w-10 h-10'>
        <ErrorIcon className={clsx(!isError && 'hidden', 'w-9 h-9')} />
        <WarningIcon className={clsx(!isWarning && 'hidden', 'w-9 h-9')} />
      </td>
    </Fragment>
  )
}

export default PlayerRow