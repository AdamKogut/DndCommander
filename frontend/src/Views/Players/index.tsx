import { clsx } from 'clsx';
import { PlayerHealth } from 'src/Types/Players';
import HealthModification from './HealthModification'
import PlayerTable from './PlayerTable';
import PlayerListModification from './PlayerListModification';
import AddEditModal from './EditHealthModal';
import { useModal } from 'src/hooks/UseModal';
import { useAppSelector, useAppDispatch } from 'src/Store';
import { InitialPlayerState, addUpdatePlayer, updatePlayerList } from 'src/Services/PlayersService';
import Conditions from 'src/Enums/Conditions';
import CampaignSelectionModal from '../Campaigns/CampaignSelectionModal';
import { CampaignsSliceState } from 'src/Types/Campaigns';
import { updateCampaignSlice } from 'src/Services/CampaignsService';

function Players() {
  const playerList = useAppSelector((state) => state.Player);
  const campaignList = useAppSelector((state) => state.Campaign);
  const dispatch = useAppDispatch();
  const { create, destroy } = useModal();

  const applyModification = (amt: number) => {
    playerList.Players.forEach((currPlayer: PlayerHealth) => {
      if (currPlayer.IsSelected) {
        const newPlayer = { ...currPlayer };
        if (amt === 0) {
          newPlayer.Current = newPlayer.Max + newPlayer.TempMaxHp;
        }
        else if (amt < 0 && newPlayer.TempHp > 0) {
          const remaining = amt + newPlayer.TempHp;
          if (remaining < 0) {
            newPlayer.TempHp = 0;
            newPlayer.Current += remaining;
          }
          else {
            newPlayer.TempHp = remaining;
          }
        }
        else {
          newPlayer.Current += amt;
        }
        dispatch(addUpdatePlayer(newPlayer));
      }
    });
  }

  const applyTempModification = (amt: number) => {
    playerList.Players.forEach((currPlayer: PlayerHealth) => {
      if (currPlayer.IsSelected) {
        const newPlayer = { ...currPlayer };
        newPlayer.TempHp += amt;
        dispatch(addUpdatePlayer(newPlayer));
      }
    });
  }

  const openEditModal = () => {
    create({
      title: 'Edit Players',
      children: <AddEditModal playerList={playerList.Players} saveEdit={saveEdit} cancel={destroy} />
    });
  }

  const openCampaignModal = () => {
    create({
      title: 'Edit Campaigns',
      children: <CampaignSelectionModal campaignList={campaignList} currentPlayerState={playerList} saveEdit={saveCampaignEdit} cancel={destroy} />
    });
  }

  const saveCampaignEdit = (campaignList: CampaignsSliceState) => {
    dispatch(updateCampaignSlice(campaignList));
    dispatch(updatePlayerList(campaignList.Campaigns.find(x => x.Id == campaignList.CurrentCampaign)?.PlayerSliceInfo.Players ?? InitialPlayerState.Players));
    destroy();
  };

  const saveEdit = (playerList: PlayerHealth[]) => {
    for (const playerIndex in playerList) {
      const player = playerList[playerIndex];
      if (player.Current > player.Max + player.TempMaxHp) {
        player.Current = player.Max + player.TempMaxHp;
      }
    }

    dispatch(updatePlayerList(playerList));
    destroy();
  };

  const selectPlayer = (id: number) => {
    const foundPlayer = playerList.Players.find(x => x.Id === id);
    if (foundPlayer !== undefined) {
      const updatePlayer = { ...foundPlayer };
      updatePlayer.IsSelected = !updatePlayer.IsSelected;
      dispatch(addUpdatePlayer(updatePlayer));
    }
  }

  const saveConditions = (playerId: number, conditions: Conditions[]) => {
    const foundPlayer = playerList.Players.find(x => x.Id === playerId);
    if (foundPlayer !== undefined) {
      const updatePlayer = { ...foundPlayer };
      updatePlayer.Conditions = conditions;
      dispatch(addUpdatePlayer(updatePlayer));
    }
  }

  return (
    <div className={clsx('flex h-full flex-col overflow-y-hidden overflow-x-hidden p-4 sm:mx-12')}>
      <PlayerListModification openEditModal={openEditModal} openCampaignModal={openCampaignModal} />
      <PlayerTable selectPlayer={selectPlayer} players={playerList.Players} saveConditions={saveConditions}/>
      <HealthModification applyModification={applyModification} applyTempModification={applyTempModification} />
    </div>
  )
}

export default Players;