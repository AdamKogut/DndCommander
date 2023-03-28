import { useNavigate } from 'react-router-dom';
import { toggleSideBar } from "src/services/SideBar";
import { useAppDispatch } from "src/store";
import { SideBarItemProps } from '../types/sideBar';
import { ReactComponent as HealthIcon } from '../Images/HealthIcon.svg';
import { ReactComponent as HomeIcon } from '../Images/HomeIcon.svg';
import { ReactComponent as SpellIcon } from '../Images/OpenBookIcon.svg';
import { ReactComponent as EquipmentIcon } from '../Images/BackpackIcon.svg';
import { ReactComponent as CombatIcon } from '../Images/SwordIcon.svg';

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

export function LinkItem({ displayText, linkTarget, VisibleIcon }: SideBarItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(toggleSideBar());
    navigate(linkTarget);
  }

  return (
    <li>
      <button onClick={handleClick} className="secondary-coloring flex w-full items-center rounded-lg p-2 text-base font-normal">
        <VisibleIcon aria-hidden="true" className="h-8 w-8 transition duration-75 "/>
        <span className="ml-3">{displayText}</span>
      </button>
    </li>
  )
}