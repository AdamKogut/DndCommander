import { Fragment, useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { PlayerHealth } from 'src/types/players';

type PlayerTableProps = {
  playerList: PlayerHealth[];
  saveEdit: (players: PlayerHealth[]) => void;
  cancel: () => void;
}

function AddEditModal({ playerList, saveEdit, cancel }: PlayerTableProps) {
  const [tempPlayerList, setTempPlayerList] = useState([...playerList]);

  const addPlayer = (e: MouseEvent<HTMLButtonElement>) => {
    const pl = [...tempPlayerList];
    pl.push({
      Id: tempPlayerList.length,
      Name: '',
      Max: 0,
      Current: 0,
      IsSelected: false
    });
    setTempPlayerList(pl);
    e.stopPropagation();
  };

  const changeName = (id: number, name: string) => {
    const pl = [...tempPlayerList];
    const foundPlayer = pl.find((x => x.Id === id));
    if (foundPlayer)
    {
      foundPlayer.Name = name;
    }

    setTempPlayerList(pl);
  }

  const changeMax = (id: number, max: string) => {
    const maxInt = +max;
    if (isNaN(maxInt))
    {
      return;
    }
    
    const pl = [...tempPlayerList];
    const foundPlayer = pl.find((x => x.Id === id));
    if (foundPlayer)
    {
      foundPlayer.Max = maxInt;
    }
    
    setTempPlayerList(pl);
  }

  const deletePlayer = (id: number) => {
    const pl = [...tempPlayerList];
    const foundPlayer = pl.findIndex((x => x.Id === id));
    if (foundPlayer !== -1)
    {
      pl.splice(foundPlayer, 1);
    }
    
    setTempPlayerList(pl);
  }

  return (
    <Fragment>
      <button onClick={addPlayer}>Add</button>
      <table className='m-4'>
        <tbody>
          {tempPlayerList.map((value: PlayerHealth) => {
            return (
              <tr key={value.Id} className='h-12 border-2'>
                <td></td>
                <td className='px-4'>
                  <input type="text" value={value.Name} onChange={(e:ChangeEvent<HTMLInputElement>) => changeName(value.Id, e.currentTarget.value)} />
                </td>
                <td className='pr-4'>
                  <input type="text" value={value.Max} onChange={(e:ChangeEvent<HTMLInputElement>) => changeMax(value.Id, e.currentTarget.value)} />
                </td>
                <td><button onClick={() => deletePlayer(value.Id)}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={cancel}>Cancel</button>
      <button onClick={() => saveEdit(tempPlayerList)}>Save</button>
    </Fragment>
  );
}

export default AddEditModal;