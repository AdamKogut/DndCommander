import { CSSProperties, ChangeEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clsx } from 'clsx';
import StringInput from 'src/components/StringInput';
import { DragAndDropIcon } from 'src/components/Icons';
import { CampaignInfo } from 'src/Types/Campaigns';

type CampaignTableProps = {
  campaign: CampaignInfo;
  deleteCampaign: (id: number) => void;
  changeValue: (id: number, name: string, propertyName: keyof CampaignInfo) => void;
  selectCampaign: (id: number) => void;
  isCampaignSelected: boolean;
}

function EditCampaignRow({ campaign, deleteCampaign, changeValue, selectCampaign, isCampaignSelected }: CampaignTableProps) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: campaign.Id
  });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  return (
    <tr
      ref={setNodeRef}
      key={campaign.Id}
      className={clsx('h-12 border-y-2 bg-white border-black dark:bg-black dark:border-custom-grey', isDragging && 'invisible')}
      style={style}
    >
      <td {...attributes} {...listeners} className='w-[40px]'>
        <DragAndDropIcon className='h-8 w-8' />
      </td>
      <td className='px-2'>
        <StringInput
          value={campaign.Name}
          placeholder='Name'
          inputOnChange={(e: ChangeEvent<HTMLInputElement>) => changeValue(campaign.Id, e.currentTarget.value, 'Name')}
        />
      </td>
      <td className='pr-2'>
        <button className='w-[99px] bg-custom-red text-white my-2' onClick={() => deleteCampaign(campaign.Id)}>Delete</button>
        <button className='w-[99px] bg-custom-grey disabled:bg-white disabled:text-black mb-2 dark:disabled:bg-black dark:disabled:text-white dark:text-black' onClick={() => selectCampaign(campaign.Id)} disabled={isCampaignSelected}>{isCampaignSelected?'Selected':'Select'}</button>
      </td>
    </tr>
  );
}

export default EditCampaignRow;