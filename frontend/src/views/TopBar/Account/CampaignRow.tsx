import { ChangeEvent, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clsx } from 'clsx';
import DragDrop from 'src/Images/DragDrop.png';
import { Campaign } from 'src/types/campaign';
import { useAppDispatch } from 'src/store';
import { changeCampaign, removeCampaign, updateCampaignName } from 'src/services/Campaigns';

type CampaignRowProps = {
  campaign: Campaign;
  currentCampaign: number;
}

function CampaignRow({ campaign, currentCampaign }: CampaignRowProps) {
  const dispatch = useAppDispatch();
  const isButtonDisabled = useMemo(() => campaign.id === currentCampaign, [campaign.id, currentCampaign]);
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging
  } = useSortable({
    id: campaign.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  };

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCampaignName({
      id: campaign.id,
      name: e.currentTarget.value
    }));
  }

  return (
    <tr
      ref={setNodeRef}
      key={campaign.id}
      className={clsx('border-y-2 bg-white', isDragging && 'invisible')}
      style={style}
    >
      <td {...attributes} {...listeners} className='w-[40px]'>
        <img className='h-8 w-8' src={DragDrop} alt='Drag and drop icon' />
      </td>
      <td className='w-[100%] px-2 py-4'>
        <input
          className='w-[100%] border-2 px-2'
          type="text"
          value={campaign.name}
          placeholder='Campaign Name'
          onChange={updateName} />
        <div className='mt-4 flex w-full justify-between'>
          <button
            className={clsx('secondary-coloring w-[99px]', isButtonDisabled && 'opacity-30')}
            disabled={isButtonDisabled}
            onClick={() => dispatch(changeCampaign(campaign.id))}
          >
            Select
          </button>
          <button
            className={clsx('secondary-coloring w-[99px] bg-red-500', isButtonDisabled && 'opacity-30')}
            disabled={isButtonDisabled}
            onClick={() => dispatch(removeCampaign(campaign.id))}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CampaignRow;