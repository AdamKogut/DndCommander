import { SideBarItemProps } from 'src/types/sideBar';
import { ReactComponent as HealthIcon } from '../../Images/HealthIcon.svg';
import { ReactComponent as HomeIcon } from '../../Images/HomeIcon.svg';
import SideBarItem from './SideBarItem';

function SideBar() {
  const listItems: SideBarItemProps[] = [
    {
      displayText: 'Home',
      linkTarget: '/',
      VisibleIcon: HomeIcon
    },
    {
      displayText: 'Player Health',
      linkTarget: '/health',
      VisibleIcon: HealthIcon
    }
  ];

  // TODO: Make sidebar come out when page is small. Don't forget to adjust based on page width changing

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar">
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <ul className="space-y-2">
          {listItems.map((value: SideBarItemProps) => <SideBarItem key={value.displayText} {...value} />)}
        </ul>
      </div>
    </aside>
  )
}

export default SideBar