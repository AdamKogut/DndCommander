import { Fragment, MouseEventHandler } from 'react';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/Types/Players';
import { ErrorIcon, WarningIcon } from 'src/components/Icons';
import Conditions from 'src/Enums/Conditions';
import { useModal } from 'src/hooks/UseModal';
import EditConditionModal from './EditConditionModal.tsx';

type PlayerRowProps = {
  player: PlayerHealth;
  selectPlayer: (id: number) => void;
  saveConditions: (playerId: number, conditions: Conditions[]) => void;
}

function PlayerRow({ player, selectPlayer, saveConditions }: PlayerRowProps) {
  const { create, destroy } = useModal();
  const isWarning = player.Max * .2 < player.Current && player.Max * .5 > player.Current;
  const isError = player.Max * .2 > player.Current;

  const editTags: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    create({
      title: 'Edit Conditions',
      children: (
        <EditConditionModal
          cancel={destroy}
          conditions={player.Conditions}
          save={internalSaveConditions}
        />
      )
    });
  }

  const internalSaveConditions = (conditions: Conditions[]) => {
    saveConditions(player.Id, conditions);
    destroy();
  }

  return (
    <Fragment>
      <tr
        key={player.Id}
        className={clsx('h-16', player.IsSelected && 'bg-custom-orange text-black', 'border-2 border-b-0 border-black dark:border-custom-grey')}
        onClick={() => selectPlayer(player.Id)}
        onKeyDown={() => selectPlayer(player.Id)}
      >
        <td className='w-[60%] break-words py-[13px] px-2'>{player.Name}</td>
        <td className='px-1 w-[calc(40%-44px)] text-center'>
          {player.Current}{player.TempHp!==0?`+${player.TempHp}`:''}
          <hr className={clsx('w-[90%] m-auto border-black', !player.IsSelected && 'dark:border-white')} />
          {player.Max}{player.TempMaxHp>0?`+${player.TempMaxHp}`:player.TempMaxHp<0?player.TempMaxHp:''}
        </td>
        <td className='w-10 h-10'>
          <ErrorIcon className={clsx(!isError && 'hidden', 'w-9 h-9')} />
          <WarningIcon className={clsx(!isWarning && 'hidden', 'w-9 h-9')} />
        </td>
      </tr>
      <tr
        key={`${player.Id}-conditions`}
        className={clsx(player.IsSelected && 'bg-custom-orange text-black border-b-black dark:border-b-custom-grey', 'border-2 border-t-0 border-black dark:border-custom-grey')}
        onClick={() => selectPlayer(player.Id)}
        onKeyDown={() => selectPlayer(player.Id)}
      >
        <td colSpan={3}>
          <div className='flex flex-wrap flex-row w-[100%] gap-2 ml-2 mb-2'>
            {player.Conditions.map((tag, index) => (
              <div
                className={clsx("rounded-full bg-custom-grey px-[.5em] py-1 text-black")}
                key={index}
              >
                <span>{Conditions[tag]}</span>
              </div>
            ))}
            <button
              className={clsx("block cursor-pointer rounded-full px-[.5em] py-1", player.IsSelected ? 'bg-black  text-custom-orange' : 'bg-custom-orange text-black')}
              onClick={editTags}
            >
              <span>Edit Conditions</span>
            </button>
          </div>
        </td>
      </tr>
    </Fragment>
  )
}

export default PlayerRow;