import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import PlayerRow from './PlayerRow';

type PlayerTableProps = {
  players: PlayerHealth[];
  selectPlayer: (id: number) => void;
}

function PlayerTable({ players, selectPlayer }: PlayerTableProps) {
  return (
    <div className='h-full w-full overflow-y-auto'>
      <table className={'w-[100%] table-fixed'}>
        <thead>
          <tr>
            <th className='break-words border-y-2 border-l-2'>Name</th>
            <th className='w-14 border-y-2 md:w-16'>Max</th>
            <th className='w-16 border-y-2 md:w-20'>Current</th>
            <th className='w-12 border-y-2 md:w-14 lg:w-20'>Temp HP</th>
            <th className='w-9 border-y-2 border-r-2 md:w-12 lg:w-14'></th>
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
    </div>
  )
}

export default PlayerTable