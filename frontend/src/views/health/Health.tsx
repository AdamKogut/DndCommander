import { useState } from 'react';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import HealthModification from './HealthModification'
import PlayerTable from './PlayerTable';
import PlayerListModification from './PlayerListModification';
import AddEditModal from './EditHealthModal/AddEditModal';
import { useModal } from 'src/hooks/UseModal';

function Health() {
  const [players, setPlayers] = useState<PlayerHealth[]>([]);
  const { create, destroy } = useModal();

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
    create({
      title: 'Edit Players',
      children: <AddEditModal playerList={players} saveEdit={saveEdit} cancel={destroy} />
    });
  }

  const saveEdit = (playerList: PlayerHealth[]) => {
    setPlayers(playerList);
    destroy();
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
    </div>
  )
}

export default Health