import clsx from "clsx";
import { Fragment } from "react";
import { AddCampaign } from "src/services/Campaigns";
import { useAppDispatch } from "src/store";
import { Campaign } from "src/types/campaign";

type CampaignListProps = {
  Campaigns: Campaign[],
  CurrentCampaign: number,
  SetViewingCampaign: (id: number) => void,
  ViewingCampaign: number
}

function CampaignList({ Campaigns, CurrentCampaign, SetViewingCampaign, ViewingCampaign }: CampaignListProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-12 bg-neutral-300">
        <button className="m-5" onClick={() => dispatch(AddCampaign())}>Add New Campaign</button>
      </div>
      <div className="mb-3 flex grow flex-col">
        {Campaigns.map((value: Campaign) => (
          <button
            key={value.Id}
            className={clsx("mx-5 mt-3", ViewingCampaign === value.Id && "bg-blue-400 text-white")}
            onClick={() => SetViewingCampaign(value.Id)}
          >
            {value.Name}
            {CurrentCampaign === value.Id ? (
              <Fragment>
                <br />
                <p className="text-xs">Selected</p>
              </Fragment>
            ):null}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CampaignList
