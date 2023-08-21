import { Fragment, useMemo, useState } from "react";
import { clsx } from "clsx";
import { useAppDispatch } from "src/store";
import { Campaign } from "src/types/campaign";
import TextAreaInput from "src/components/TextAreaInput";
import CampaignNotes from "./CampaignNotes/CampaignNotes";
import { AddCampaign } from "src/services/Campaigns";

type CampaignContentProps = {
  Campaigns: Campaign[],
  CurrentCampaign: number,
  SetViewingCampaign: (id: number) => void,
  ViewingCampaign: number
}

function CampaignContent({ Campaigns, CurrentCampaign, SetViewingCampaign, ViewingCampaign }: CampaignContentProps) {
  const [currTab, setCurrTab] = useState('notes');
  const currentViewingCampaignInfo = useMemo(() => Campaigns.find(x => x.Id == CurrentCampaign), [Campaigns, CurrentCampaign]);
  const dispatch = useAppDispatch();

  if (currentViewingCampaignInfo === undefined && Campaigns.length > 0) {
    SetViewingCampaign(Campaigns[0].Id);
  }

  if (Campaigns.length === 0 || currentViewingCampaignInfo === undefined) {
    return (
      <div className="flex h-full w-full flex-col justify-center">
        <div className="mx-auto pt-20 pb-6">Please Add A New Campaign</div>
        <button className="mx-auto" onClick={() => dispatch(AddCampaign())}>Add New Campaign</button>
      </div>
    );
  }

  const tabButtonCss = "w-[50%] rounded-none border-0 border-b-2 border-black bg-transparent hover:text-[rgb(100,108,255)] hover:border-[rgb(100,108,255)]";

  return (
    <div className="flex h-full flex-col px-8">
      <div className="flex flex-row">
        <p className="grow pt-4 text-3xl">{currentViewingCampaignInfo.Name}</p>
        <div className="flex gap-x-4 pt-6">
          <button>Change Campaign</button>
          <button>Is GM?</button>
        </div>
      </div>
      <div className="flex flex-row px-4">
        <button
          className={clsx(tabButtonCss, currTab === 'notes' && 'border-sky-500 text-sky-500')}
          onClick={()=>setCurrTab('notes')}
        >
          Notes
        </button>
        <button
          className={clsx(tabButtonCss, currTab === 'character' && 'border-sky-500 text-sky-500')}
          onClick={()=>setCurrTab('character')}
        >
          Character Info
        </button>
      </div>
      {currTab === 'notes' ?
        <CampaignNotes
          Notes={currentViewingCampaignInfo.Notes}
          CampaignId={currentViewingCampaignInfo.Id}
        />
        : null}
    </div>
  )
}

export default CampaignContent
