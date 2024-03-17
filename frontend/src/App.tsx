import Players from './Views/Players';
import TopBar from './Views/TopBar';

function App() {
  return (
    <div className='bg-primary-light text-primary-dark h-full w-full overflow-y-auto overflow-x-hidden dark:bg-primary-dark dark:text-primary-light flex items-stretch flex-col'>
      <TopBar />
      <Players />
    </div>
  )
}
// TODO: Fix color scheme
export default App
