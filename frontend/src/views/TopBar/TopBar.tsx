import { toggleSideBar } from 'src/services/SideBar';
import { useAppDispatch } from 'src/store';
import { ReactComponent as AccountIcon} from '../../Images/AccountIcon.svg';

function TopBar() {
  const dispatch = useAppDispatch();

  return (
    <div className="sticky top-0 flex h-[60px] w-full flex-row place-content-between bg-slate-200">
      {/* hamburger button */}
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="ml-4 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 focus:bg-transparent focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:invisible"
        onClick={() => dispatch(toggleSideBar())}
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="h-[40px]" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      {/* account button */}
      <AccountIcon className=' mr-4 h-[60px]' />
    </div>
  )
}

export default TopBar