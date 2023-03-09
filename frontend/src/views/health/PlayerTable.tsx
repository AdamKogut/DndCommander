import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import PlayerRow from './PlayerRow';

type PlayerTableProps = {
  players: PlayerHealth[];
  selectPlayer: (id: number) => void;
}

function PlayerTable({ players, selectPlayer }: PlayerTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th className='border-y-2'>Name</th>
          <th className='border-y-2'>Max</th>
          <th className='border-y-2'>Current</th>
          <th className='border-y-2'>Temp HP</th>
          <th className='border-y-2 border-r-2'></th>
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
              <PlayerRow player={value} />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default PlayerTable