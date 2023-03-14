import { clsx } from 'clsx';
import { Fragment, useMemo } from 'react';
import { useAppSelector } from 'src/store';
import { SideBarItemProps } from 'src/types/sideBar';
import { ReactComponent as HealthIcon } from '../../Images/HealthIcon.svg';
import { ReactComponent as HomeIcon } from '../../Images/HomeIcon.svg';
import { ReactComponent as SpellIcon } from '../../Images/OpenBookIcon.svg';
import { ReactComponent as EquipmentIcon } from '../../Images/BackpackIcon.svg';
import { ReactComponent as CombatIcon } from '../../Images/SwordIcon.svg';
import SideBarItem from './SideBarItem';
import CloseSideBar from './CloseSideBar';
import ViewCoin from './ViewCoin';

function SideBar() {
  const { SideBarOpen } = useAppSelector((store) => store.SideBar);
  const listItems: SideBarItemProps[] = useMemo(() => {
    return [
      {
        displayText: 'Home',
        linkTarget: '/',
        VisibleIcon: HomeIcon
      },
      {
        displayText: 'Player Health',
        linkTarget: '/health',
        VisibleIcon: HealthIcon
      },
      {
        displayText: 'Combat',
        linkTarget: '/combat',
        VisibleIcon: CombatIcon
      },
      {
        displayText: 'Equipment',
        linkTarget: '/equipment',
        VisibleIcon: EquipmentIcon
      },
      {
        displayText: 'Spells',
        linkTarget: '/spell',
        VisibleIcon: SpellIcon
      }
    ];
  }, []);

  const shouldBeOpen = SideBarOpen || window.innerWidth > 640;

  return (
    <aside
      id="default-sidebar"
      className={
        clsx("fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0",
          shouldBeOpen && "transform-none",
          !shouldBeOpen && "-translate-x-full"
        )}
      aria-label="Sidebar">
      <div className="flex h-full flex-col overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <div className='grow'>
          <CloseSideBar />
          <ul className="space-y-2">
            {listItems.map((value: SideBarItemProps) => <SideBarItem key={value.displayText} {...value} />)}
          </ul>
        </div>
        <ViewCoin />
      </div>
    </aside>
  )
}

export default SideBar