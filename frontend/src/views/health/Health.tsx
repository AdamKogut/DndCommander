import { useState } from 'react';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import HealthModification from './HealthModification'
import PlayerTable from './PlayerTable';
import PlayerListModification from './PlayerListModification';
import AddEditModal from './AddEditModal';

function Health() {
  const [players, setPlayers] = useState<PlayerHealth[]>([]);
  const [addEditPlayer, setAddEditPlayer] = useState<PlayerHealth>();

  const ApplyModification = (amt: number) => {
    const currPlayers = [...players];
    currPlayers.forEach((value: PlayerHealth) => {
      if (value.IsSelected) {
        if (amt === 0) {
          value.Current = value.Max;
        }
        else {
          value.Current += amt
        }
      }
    });
    setPlayers(currPlayers);
  }

  const SelectPlayer = (id: number) => {
    const currPlayers = [...players];
    const foundPlayer = currPlayers.find((value: PlayerHealth) => value.Id === id);
    if (foundPlayer)
    {
      foundPlayer.IsSelected = !foundPlayer.IsSelected;
      setPlayers(currPlayers);
    }
  }

  const AddPlayer = () => {
    setAddEditPlayer({
      Id: players.length,
      Name: '',
      Max: 0,
      Current: 0,
      IsSelected: false
    })
  }

  const EditPlayer = (id: number) => {
    const foundPlayer = players.find((value: PlayerHealth) => value.Id === id);
    if (foundPlayer)
    {
      setAddEditPlayer(foundPlayer);
    }
  }

  const RemovePlayers = () => {
    const currPlayers = [...players];
    const playerIds: number[] = [];
    currPlayers.forEach((value: PlayerHealth) => {
      if (value.IsSelected) {
        playerIds.push(value.Id);
      }
    });
    playerIds.forEach((value: number) => {
      currPlayers.splice(currPlayers.findIndex((playerValue: PlayerHealth) => value == playerValue.Id), 1);
    })
    setPlayers(currPlayers);
  }

  const saveAddEdit = (player: PlayerHealth | undefined) => {
    if (player === undefined) {
      return;
    }

    const currPlayers = [...players];

    if (player.Id === players.length) {
      currPlayers.push(player);
    }
    else {
      const foundPlayer = currPlayers.find((value: PlayerHealth) => value.Id === player.Id);
      if (foundPlayer === undefined)
      {
        return;
      }

      foundPlayer.Name = player.Name;
      foundPlayer.Max = player.Max;
    }

    setPlayers(currPlayers);
  }

  return (
    <div className={clsx('grid w-[50vw] grid-cols-1')}>
      <PlayerListModification addPlayer={AddPlayer} removePlayers={RemovePlayers} />
      <PlayerTable selectPlayer={SelectPlayer} players={players} editPlayer={EditPlayer} />
      <HealthModification applyModification={ApplyModification} />
      <AddEditModal player={addEditPlayer} saveAddEdit={saveAddEdit} />
    </div>
  )
}

export default Health