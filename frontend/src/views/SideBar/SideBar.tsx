import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSideBar } from 'src/services/SideBar';
import { useAppSelector } from 'src/store';
import { SideBarItemProps } from 'src/types/sideBar';
import { ReactComponent as HealthIcon } from '../../Images/HealthIcon.svg';
import { ReactComponent as HomeIcon } from '../../Images/HomeIcon.svg';
import SideBarItem from './SideBarItem';

function SideBar() {
  const { SideBarOpen } = useAppSelector((store) => store.SideBar);
  const dispatch = useDispatch();
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
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <ul className='text-right'>
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="ml-4 mt-[-16px] inline-flex items-center rounded-lg p-2 text-sm text-gray-500 focus:bg-transparent focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
            onClick={() => dispatch(toggleSideBar())}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className='h-[40px]' viewBox="0 0 1024 1024">
              <path fill="#000000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
            </svg>
          </button>
        </ul>
        <ul className="space-y-2">
          {listItems.map((value: SideBarItemProps) => <SideBarItem key={value.displayText} {...value} />)}
        </ul>
      </div>
    </aside>
  )
}

export default SideBar