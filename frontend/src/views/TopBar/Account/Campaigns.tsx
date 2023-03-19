import { useMemo } from 'react';
import SortableList from 'src/components/SortableList';
import { useAppDispatch, useAppSelector } from 'src/store';
import { Campaign } from 'src/types/campaign';
import CampaignRow from './CampaignRow';
import { addCampaign, changeCampaignOrder } from 'src/services/Campaigns';

function Campaigns() {
  const { campaigns, currentCampaign } = useAppSelector((store) => store.Campaigns);
  const dispatch = useAppDispatch();
  const campaignIds = useMemo(() => campaigns.map(({ id }: Campaign) => id), [campaigns]);
  const rows = campaigns.map((value: Campaign) => {
    return (
      <CampaignRow
        key={value.id}
        campaign={value}
        currentCampaign={currentCampaign}
      />
    )
  })

  const updateItems = (start: number, end: number) => {
    dispatch(changeCampaignOrder({
      start: start,
      end: end
    }));
  }

  return (
    <div className='m-1 rounded border-2 p-1'>
      <div className='flex flex-row place-content-between space-x-4 pb-6'>
        <h2 className='text-3xl'>Campaigns</h2>
        <div className='flex flex-row place-content-end space-x-4'>
          <button className="btn-primary" onClick={() => dispatch(addCampaign())}>Add Campaign</button>
        </div>
      </div>
      <table className={'mx-2 w-[calc(100%-16px)] table-fixed border-2'}>
        <tbody>
          <SortableList idList={campaignIds} setArray={updateItems} itemList={rows} />
        </tbody>
      </table>
    </div>
  );
}

export default Campaigns;