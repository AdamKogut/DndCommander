import { Link } from "react-router-dom";
import { SideBarItemProps } from '../../types/sideBar';

function SideBarItem({displayText, linkTarget, VisibleIcon} : SideBarItemProps) {
  return (
    <li>
      <Link to={linkTarget} className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
          <VisibleIcon aria-hidden="true" className="h-8 w-8 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
        <span className="ml-3">{displayText}</span>
      </Link>
    </li>
  )
}

export default SideBarItem;