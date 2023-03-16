import { Route, Routes } from 'react-router-dom';
import Equipment from './views/equipment/Equipment';
import Health from './views/health/Health';
import SideBar from './views/SideBar/SideBar';
import TopBar from './views/TopBar/TopBar';

function App() {
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
