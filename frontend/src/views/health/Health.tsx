import { clsx } from 'clsx';
import { PlayerHealth } from 'src/types/players';
import HealthModification from './HealthModification'
import PlayerTable from './PlayerTable';
import PlayerListModification from './PlayerListModification';
import AddEditModal from './EditHealthModal/AddEditModal';
import { useModal } from 'src/hooks/UseModal';
import { useAppSelector, useAppDispatch } from 'src/store';
import { changePlayers, changePlayerSelection, changePlayerHealth, changePlayerTempHealth } from 'src/services/Players';

function Health() {
  const { players } = useAppSelector((state) => state.Player);
  const dispatch = useAppDispatch();
  const { create, destroy } = useModal();

  const applyModification = (amt: number) => {
    dispatch(changePlayerHealth(amt));
  }

  const applyTempModification = (amt: number) => {
    dispatch(changePlayerTempHealth(amt));
  }

  const openEditModal = () => {
    create({
      title: 'Edit Players',
      children: <AddEditModal playerList={players} saveEdit={saveEdit} cancel={destroy} />
    });
  }

  const saveEdit = (playerList: PlayerHealth[]) => {
    dispatch(changePlayers(playerList));
    destroy();
  };

  const selectPlayer = (id: number) => {
    dispatch(changePlayerSelection(id));
  }

  return (
    <div className={clsx('flex h-[calc(100%-60px)] flex-col overflow-y-auto overflow-x-hidden p-4 sm:ml-64')}>
      <PlayerListModification openEditModal={openEditModal} />
      <PlayerTable selectPlayer={selectPlayer} players={players} />
      <HealthModification applyModification={applyModification} applyTempModification={applyTempModification} />
    </div>
  )
}

export default Health