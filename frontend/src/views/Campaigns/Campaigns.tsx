import { Fragment, useEffect, useState } from "react";
import CampaignList from "./CampaignList";
import { useAppDispatch, useAppSelector } from "src/store";
import { ChangeCampaign } from "src/services/Campaigns";

function Campaigns() {
  const { Campaigns, CurrentCampaign } = useAppSelector((state) => state.Campaigns);
  const dispatch = useAppDispatch();
  const [viewingCampaign, setViewingCampaign] = useState(CurrentCampaign);

  useEffect(() => {
    if (Campaigns.length > 0 && Campaigns.findIndex(x => x.Id === CurrentCampaign) === -1) {
      dispatch(ChangeCampaign(Campaigns[0].Id));
    }

    if (Campaigns.length > 0 && Campaigns.findIndex(x => x.Id === viewingCampaign) === -1) {
      setViewingCampaign(Campaigns[0].Id);
    }
  }, [Campaigns, CurrentCampaign, viewingCampaign, dispatch]);

  return (
    <div className="mx-auto grid min-h-[calc(100vh-9rem)] w-[80%] grid-cols-5 gap-x-2 bg-neutral-300">
      <div className="col-span-1">
        <CampaignList
          Campaigns={Campaigns}
          CurrentCampaign={CurrentCampaign}
          SetViewingCampaign={setViewingCampaign}
          ViewingCampaign={viewingCampaign}
        />
      </div>
      <div className="col-span-4"></div>
    </div>
  )
}

export default Campaigns
