import { Route, Routes } from 'react-router-dom';
import Health from './views/health/Health';
import SideBar from './views/SideBar/SideBar';
import TopBar from './views/TopBar/TopBar';

function App() {
  return (
    <div className='h-[100vh] w-[100vw] overflow-y-auto overflow-x-hidden'>
      <TopBar />
      <SideBar />
      <Routes>
        <Route path="health" element={<Health />} />
      </Routes>
    </div>
  )
}

export default App
