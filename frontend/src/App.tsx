import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { changeCampaign } from './services/Campaigns';
import { store, useAppDispatch, useAppSelector } from './store';
import Equipment from './views/equipment/Equipment';
import Health from './views/health/Health';
import SideBar from './views/SideBar/SideBar';
import TopBar from './views/TopBar/TopBar';

function App() {
  const appDispatch = useAppDispatch();
  const campaignInfo = useAppSelector((store) => store.Campaigns);
  useEffect(() => {
    appDispatch(changeCampaign(campaignInfo.currentCampaign));
  }, []);

  return (
    <div className='h-full w-full overflow-y-auto overflow-x-hidden'>
      <TopBar />
      <SideBar />
      <Routes>
        <Route path="health" element={<Health />} />
        <Route path='equipment' element={<Equipment />}/>
      </Routes>
    </div>
  )
}

export default App
