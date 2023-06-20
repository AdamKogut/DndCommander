// import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { changeCampaign } from './services/Campaigns';
// import { useAppDispatch, useAppSelector } from './store';
// import Equipment from './views/equipment/Equipment';
// import Health from './views/health/Health';
// import SideBar from './views/SideBar/SideBar';
// import Spells from './views/spells/Spells';
import TopBar from './views/Topbar/TopBar';
import Campaigns from './views/Campaigns/Campaigns';

function App() {
  // const appDispatch = useAppDispatch();
  // const campaignInfo = useAppSelector((store) => store.Campaigns);
  // useEffect(() => {
  //   appDispatch(changeCampaign(campaignInfo.currentCampaign));
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className='primary-coloring h-full w-full overflow-y-auto overflow-x-hidden'>
      <TopBar />
      {/* <SideBar /> */}
      <Routes>
        <Route path="campaigns" element={<Campaigns />} />
      </Routes>
    </div>
  )
}

export default App
