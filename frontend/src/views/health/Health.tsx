import { useState } from 'react';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import HealthModification from './HealthModification'
import PlayerTable from './PlayerTable';
import PlayerListModification from './PlayerListModification';
import AddEditModal from './AddEditModal';

function Health() {
  const [players, setPlayers] = useState<PlayerHealth[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const applyModification = (amt: number) => {
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

  const openEditModal = () => {

    setIsOpen(true)
    // AddEditModal({ playerList: players, saveEdit });
  }

  const saveEdit = (playerList: PlayerHealth[] | undefined) => {
    if (playerList !== undefined) {
      setPlayers(playerList);
    }
    setIsOpen(false);
  };

  const selectPlayer = (id: number) => {
    const currPlayers = [...players];
    const foundPlayer = currPlayers.find((value: PlayerHealth) => value.Id === id);
    if (foundPlayer)
    {
      foundPlayer.IsSelected = !foundPlayer.IsSelected;
      setPlayers(currPlayers);
    }
  }

  return (
    <div className={clsx('grid w-[50vw] grid-cols-1')}>
      <PlayerListModification openEditModal={openEditModal} />
      <PlayerTable selectPlayer={selectPlayer} players={players} />
      <HealthModification applyModification={applyModification} />
      <AddEditModal playerList={players} saveEdit={saveEdit} isOpen={isOpen}/>
    </div>
  )
}

export default Health