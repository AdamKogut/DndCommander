import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import PlayerRow from './PlayerRow';

type PlayerTableProps = {
  players: PlayerHealth[];
  selectPlayer: (id: number) => void;
  setPlayerName: (id: number, name: string) => void;
}

function PlayerTable({ players, selectPlayer, setPlayerName }: PlayerTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th className='border-y-2 border-l-2'></th>
          <th className='border-y-2'>Name</th>
          <th className='border-y-2'>Max</th>
          <th className='border-y-2 border-r-2'>Current</th>
        </tr>
      </thead>
      <tbody>
        {players.map((value: PlayerHealth) => {
          return (
            <tr
              key={value.Id}
              className={clsx('h-16', value.IsSelected && 'bg-sky-300', 'border-2')}
              onClick={() => selectPlayer(value.Id)}
              onKeyDown={() => selectPlayer(value.Id)}
            >
              <PlayerRow player={value} setPlayerName={setPlayerName} />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default PlayerTable