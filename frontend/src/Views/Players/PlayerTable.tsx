import { clsx } from 'clsx';
import { PlayerHealth } from 'src/Types/Players';
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
            <th className='break-words border-y-2 border-l-2 w-[60%]'>Name</th>
            <th className='border-y-2 w-[calc(40%-40px)]'>
              Current
              <hr />
              Max
            </th>
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