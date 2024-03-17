import Players from './Views/Players';
import TopBar from './Views/TopBar';

function App() {
  return (
    <div className='bg-custom-grey text-black h-full w-full overflow-y-auto overflow-x-hidden dark:bg-black dark:text-white flex items-stretch flex-col'>
      <TopBar />
      <Players />
    </div>
  )
}
// TODO: Fix color scheme
export default App
