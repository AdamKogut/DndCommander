import { useNavigate } from 'react-router-dom';
import { toggleSideBar } from "src/services/SideBar";
import { useAppDispatch } from "src/store";
import { SideBarItemProps } from '../types/sideBar';
import { HealthIcon, HomeIcon, OpenBookIcon, BackpackIcon, SwordIcon } from './Icons';
import { clsx } from 'clsx';

export const AvailableLinks: SideBarItemProps[] = [
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
    VisibleIcon: SwordIcon
  },
  {
    displayText: 'Equipment',
    linkTarget: '/equipment',
    VisibleIcon: BackpackIcon
  },
  {
    displayText: 'Spells',
    linkTarget: '/spell',
    VisibleIcon: OpenBookIcon
  }
];

export function LinkItem({ displayText, linkTarget, VisibleIcon }: SideBarItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(toggleSideBar());
    navigate(linkTarget);
  }

  const isCurrentTab = window.location.pathname === linkTarget;

  return (
    <button
      onClick={handleClick}
      className={clsx("secondary-coloring flex w-full items-center p-2 text-base font-normal",
        "sm:hover:bg-tertiary sm:hover:text-primary sm:w-[15vw] sm:justify-center sm:rounded-b-none",
        "md:w-[18vw]",
        !isCurrentTab && "sm:text-tertiary sm:bg-transparent")}
      // className={clsx("-b-none sm:bg-transparent sm:text-tertiary md:w-[18vw]",
      //   window.location.pathname === linkTarget && "sm:bg-tertiary sm:text-primary")}
    >
      <VisibleIcon aria-hidden="true" className="h-8 w-8 transition duration-75"/>
      <span className="ml-3 sm:hidden md:inline">{displayText}</span>
    </button>
  )
}