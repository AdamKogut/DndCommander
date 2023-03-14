import { toggleSideBar } from 'src/services/SideBar';
import { useAppDispatch } from 'src/store';

function CloseSideBar() {
  const dispatch = useAppDispatch();

  return (
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
  )
}

export default CloseSideBar