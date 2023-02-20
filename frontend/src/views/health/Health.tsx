import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import HealthModification from './HealthModification'
import PlayerTable from './PlayerTable';

function Health() {
  const [players, setPlayers] = useState<PlayerHealth[]>([{
      Id: 1,
      IsSelected: false,
      Name: 'Thorinin M\'syde',
      Max: 45,
      Current: 12
  }]);
  const [isSetMax, setIsSetMax] = useState(false);

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

  const SetPlayerName = (id: number, name: string) => {
    const currPlayers = [...players];
    const foundPlayer = currPlayers.find((value: PlayerHealth) => value.Id === id);
    if (foundPlayer)
    {
      foundPlayer.Name = name;
      setPlayers(currPlayers);
    }
  }

  return (
    <div className={clsx('grid w-[50vw] grid-cols-1', isSetMax && 'bg-red-500')}>
      <PlayerTable selectPlayer={SelectPlayer} players={players} setPlayerName={SetPlayerName} />
      <HealthModification applyModification={ApplyModification} />
    </div>
  )
}

export default Health