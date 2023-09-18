import { clsx } from 'clsx';
import { PlayerHealth } from 'src/Types/Players';
import HealthModification from './HealthModification'
import PlayerTable from './PlayerTable';
import PlayerListModification from './PlayerListModification';
import AddEditModal from './EditHealthModal';
import { useModal } from 'src/Hooks/UseModal';
import { useAppSelector, useAppDispatch } from 'src/Store';
import { addUpdatePlayer, updatePlayerList } from 'src/Services/PlayersService';
import Conditions from 'src/Enums/Conditions';

function Players() {
  const playerList = useAppSelector((state) => state.Player).Players;
  const dispatch = useAppDispatch();
  const { create, destroy } = useModal();

  const applyModification = (amt: number) => {
    playerList.forEach((currPlayer: PlayerHealth) => {
      if (currPlayer.IsSelected) {
        const newPlayer = { ...currPlayer };
        if (amt === 0) {
          newPlayer.Current = newPlayer.Max + newPlayer.TempMaxHp;
        }
        else if (amt < 0 && newPlayer.TempHp > 0) {
          const remaining = amt + newPlayer.TempHp;
          if (remaining < 0) {
            newPlayer.TempHp = 0;
            newPlayer.Current += remaining;
          }
          else {
            newPlayer.TempHp = remaining;
          }
        }
        else {
          newPlayer.Current += amt;
        }
        dispatch(addUpdatePlayer(newPlayer));
      }
    });
  }

  const applyTempModification = (amt: number) => {
    playerList.forEach((currPlayer: PlayerHealth) => {
      if (currPlayer.IsSelected) {
        const newPlayer = { ...currPlayer };
        newPlayer.TempHp += amt;
        dispatch(addUpdatePlayer(newPlayer));
      }
    });
  }

  const openEditModal = () => {
    create({
      title: 'Edit Players',
      children: <AddEditModal playerList={playerList} saveEdit={saveEdit} cancel={destroy} />
    });
  }

  const saveEdit = (playerList: PlayerHealth[]) => {
    for (const playerIndex in playerList) {
      const player = playerList[playerIndex];
      if (player.Current > player.Max + player.TempMaxHp) {
        player.Current = player.Max + player.TempMaxHp;
      }
    }

    dispatch(updatePlayerList(playerList));
    destroy();
  };

  const selectPlayer = (id: number) => {
    const foundPlayer = playerList.find(x => x.Id === id);
    if (foundPlayer !== undefined) {
      const updatePlayer = { ...foundPlayer };
      updatePlayer.IsSelected = !updatePlayer.IsSelected;
      dispatch(addUpdatePlayer(updatePlayer));
    }
  }

  const saveConditions = (playerId: number, conditions: Conditions[]) => {
    const foundPlayer = playerList.find(x => x.Id === playerId);
    if (foundPlayer !== undefined) {
      const updatePlayer = { ...foundPlayer };
      updatePlayer.Conditions = conditions;
      dispatch(addUpdatePlayer(updatePlayer));
    }
  }

  return (
    <div className={clsx('flex h-full flex-col overflow-y-hidden overflow-x-hidden p-4 sm:mx-12')}>
      <PlayerListModification openEditModal={openEditModal} />
      <PlayerTable selectPlayer={selectPlayer} players={playerList} saveConditions={saveConditions}/>
      <HealthModification applyModification={applyModification} applyTempModification={applyTempModification} />
    </div>
  )
}

export default Players;