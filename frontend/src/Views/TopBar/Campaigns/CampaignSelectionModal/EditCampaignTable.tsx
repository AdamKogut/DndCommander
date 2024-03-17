import { MouseEvent } from 'react';
import { clsx } from 'clsx';
import SortableList from 'src/components/SortableList';
import EditCampaignRow from './EditCampaignRow';
import { UniqueIdentifier } from '@dnd-kit/core';
import { CampaignInfo, CampaignsSliceState } from 'src/Types/Campaigns';

type EditCampaignTableProps = {
  campaignList: CampaignsSliceState;
  campaignListIds: UniqueIdentifier[];
  saveEdit: (campaigns: CampaignsSliceState) => void;
  cancel: () => void;
  addCampaign: (e: MouseEvent<HTMLButtonElement>) => void;
  changeValue: (id: number, value: string, propertyName: keyof CampaignInfo) => void;
  deleteCampaign: (id: number) => void;
  updateItems: (start: number, end: number) => void;
  selectCampaign: (id: number) => void;
}

function EditCampaignTable({
  campaignList,
  campaignListIds,
  saveEdit,
  cancel,
  addCampaign,
  deleteCampaign,
  updateItems,
  changeValue,
  selectCampaign
}: EditCampaignTableProps) {
  const rows = campaignList.Campaigns.map((value: CampaignInfo) => {
    return (
      <EditCampaignRow
        key={value.Id}
        campaign={value}
        deleteCampaign={deleteCampaign}
        changeValue={changeValue}
        selectCampaign={selectCampaign}
        isCampaignSelected={value.Id==campaignList.CurrentCampaign}
      />
    )
  })

  return (
    <div className='h-full max-h-full min-w-[34%]'>
      <button className='my-4 ml-4 mr-20 bg-calltoaction text-black' onClick={addCampaign}>Add Campaign</button>
      <div className='h-[calc(100%-127px)] overflow-y-auto'>
        <table className={'w-[100%] table-fixed'}>
          <thead>
            <tr className={clsx(campaignList.Campaigns.length === 0 && 'hidden')}>
              <td className='w-8'></td>
              <td className='px-2'></td>
              <td className='w-[110px] px-2'></td>
            </tr>
          </thead>
          <tbody>
            <SortableList idList={campaignListIds} setArray={updateItems} itemList={rows} />
          </tbody>
        </table>
      </div>
      <div className='bg-primary-dark pb-1 w-full text-right dark:bg-primary-light'>
        <button className='bg-calltoaction text-black mt-4 mr-4 py-1' onClick={cancel}>Cancel</button>
        <button className='bg-calltoaction text-black mt-4 mr-4 py-1' onClick={() => saveEdit(campaignList)}>Save</button>
      </div>
    </div>
  );
}

export default EditCampaignTable;