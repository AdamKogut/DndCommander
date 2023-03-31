import { Fragment } from 'react';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import { ErrorIcon, WarningIcon } from 'src/components/Icons';

type PlayerTableProps = {
  player: PlayerHealth;
}

function PlayerRow({ player }: PlayerTableProps) {
  const isWarning = player.Max * .2 < player.Current && player.Max * .5 > player.Current;
  const isError = player.Max * .2 > player.Current;
  return (
    <Fragment>
      <td className='w-[60%] break-words py-[13px] px-1'>{player.Name}</td>
      <td className='flex justify-around px-1'>
        <div>{player.Max}</div>
        <div>/</div>
        <div>{player.Current}</div>
        <div>/</div>
        <div>{player.TempHp}</div>
      </td>
      <td className='w-10'>
        <ErrorIcon className={clsx(!isError && 'hidden', 'w-9')} />
        <WarningIcon className={clsx(!isWarning && 'hidden', 'w-9')} />
      </td>
    </Fragment>
  )
}

export default PlayerRow