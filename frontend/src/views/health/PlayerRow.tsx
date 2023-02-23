import { Fragment } from 'react';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import ErrorSign from '../../Images/error-sign.svg';
import WarningSign from '../../Images/warning-sign.svg';
import EditButton from '../../Images/edit-button.svg';

type PlayerTableProps = {
  player: PlayerHealth;
  editPlayer: (id: number) => void;
}

function PlayerRow({ player, editPlayer }: PlayerTableProps) {
  const onEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    editPlayer(player.Id);
  }

  const isWarning = player.Max * .2 < player.Current && player.Max * .5 > player.Current;
  const isError = player.Max * .2 > player.Current;
  return (
    <Fragment>
      <td>
        <button className='p-[3px]' onClick={onEditButtonClick}>
          <img className='w-9' src={EditButton} alt='Edit Icon' />
        </button>
      </td>
      <td className='w-[60%] py-[13px]'>{player.Name}</td>
      <td>{player.Max}</td>
      <td>{player.Current}</td>
      <td className='w-10'>
        <img className={clsx(!isError && 'hidden', 'w-9')} src={ErrorSign} alt='Error Icon'/>
        <img className={clsx(!isWarning && 'hidden', 'w-9')} src={WarningSign} alt='warning Icon'/>
      </td>
    </Fragment>
  )
}

export default PlayerRow