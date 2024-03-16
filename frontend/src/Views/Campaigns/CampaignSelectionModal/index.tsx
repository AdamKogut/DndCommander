import { useState, MouseEvent, useMemo, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import EditCampaignTable from './EditCampaignTable';
import { CampaignInfo, CampaignsSliceState } from 'src/Types/Campaigns';
import { InitialPlayerState } from 'src/Services/PlayersService';
import { PlayersSliceState } from 'src/Types/Players';

type CampaignSelectionModalProps = {
  currentPlayerState: PlayersSliceState;
  campaignList: CampaignsSliceState;
  saveEdit: (campaigns: CampaignsSliceState) => void;
  cancel: () => void;
}

function CampaignSelectionModal({ campaignList, saveEdit, cancel, currentPlayerState }: CampaignSelectionModalProps) {
  const [tempCampaignList, setTempCampaignList] = useState<CampaignsSliceState>(JSON.parse(JSON.stringify(campaignList)));
  const campaignListIds = useMemo(() => tempCampaignList.Campaigns.map(({ Id }: CampaignInfo) => Id), [tempCampaignList]);

  useEffect(() => {
    if (campaignList.Campaigns.length == 0) {
      let newId = Date.now();
      setTempCampaignList({
        Campaigns: [{
          Id: newId,
          Name: 'A new campaign!',
          PlayerSliceInfo: currentPlayerState
        }],
        CurrentCampaign: newId
      });
    }
  }, [campaignList]);

  const addCampaign = (e: MouseEvent<HTMLButtonElement>) => {
    const pl = [...tempCampaignList.Campaigns];
    let newId = Date.now();
    pl.push({
      Id: newId,
      Name: 'A new campaign!',
      PlayerSliceInfo: InitialPlayerState 
    });

    if (pl.length !== 1) {
      newId = tempCampaignList.CurrentCampaign;
    }

    setTempCampaignList({
      Campaigns: pl,
      CurrentCampaign: newId
    });
    e.stopPropagation();
  };

  const changeDisplayValue = (id: number, value: string, propertyName: keyof CampaignInfo) => {
    const pl = [...tempCampaignList.Campaigns];
    const foundCampaign = pl.find((x => x.Id === id));
    if (foundCampaign)
    {
      // @ts-expect-error
      foundCampaign[propertyName] = value;
    }

    setTempCampaignList({
      Campaigns: pl,
      CurrentCampaign: tempCampaignList.CurrentCampaign
    });
  }

  const deleteCampaign = (id: number) => {
    const pl = [...tempCampaignList.Campaigns];
    const foundCampaign = pl.findIndex((x => x.Id === id));
    if (foundCampaign !== -1)
    {
      pl.splice(foundCampaign, 1);
    }

    let newCurrentCampaign = tempCampaignList.CurrentCampaign
    if (id == tempCampaignList.CurrentCampaign) {
      let nextCampaign = tempCampaignList.Campaigns.find(_ => true);
      if (nextCampaign === undefined) {
        newCurrentCampaign = 0;
      }
      else {
        newCurrentCampaign = nextCampaign.Id;
      }
    }
    
    setTempCampaignList({
      Campaigns: pl,
      CurrentCampaign: newCurrentCampaign
    });
  }

  const updateItems = (start: number, end: number) => {
    const pl = [...tempCampaignList.Campaigns];
    setTempCampaignList({
      Campaigns: arrayMove(pl, start, end),
      CurrentCampaign: tempCampaignList.CurrentCampaign
    });
  }

  const selectCampaign = (id: number) => {
    setTempCampaignList({
      Campaigns: tempCampaignList.Campaigns,
      CurrentCampaign: id
    })
  }

  const localCancel = () => {
    if (campaignList.Campaigns.length == 0) {
      let newId = Date.now();
      saveEdit({
        Campaigns: [{
          Id: newId,
          Name: 'A new campaign!',
          PlayerSliceInfo: currentPlayerState
        }],
        CurrentCampaign: newId
      });
      return;
    }
    else if (tempCampaignList.Campaigns.length == 0) {
      let newId = Date.now();
      saveEdit({
        Campaigns: [{
          Id: newId,
          Name: 'A new campaign!',
          PlayerSliceInfo: InitialPlayerState
        }],
        CurrentCampaign: newId
      });
      return;
    }

    cancel();
  }

  return (
    <EditCampaignTable
      campaignList={tempCampaignList}
      campaignListIds={campaignListIds}
      cancel={localCancel}
      saveEdit={saveEdit}
      addCampaign={addCampaign}
      changeValue={changeDisplayValue}
      deleteCampaign={deleteCampaign}
      updateItems={updateItems}
      selectCampaign={selectCampaign}
    />
  );
}

export default CampaignSelectionModal;