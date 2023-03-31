import { AccountIcon, HamburgerIcon } from 'src/components/Icons';
import { AvailableLinks, LinkItem } from 'src/components/Links';
import { useModal } from 'src/hooks/UseModal';
import { toggleSideBar } from 'src/services/SideBar';
import { useAppDispatch } from 'src/store';
import { SideBarItemProps } from 'src/types/sideBar';
import Account from './Account/Account';

function TopBar() {
  const { create } = useModal();
  const dispatch = useAppDispatch();

  const openAccount = () => {
    create({
      title: 'Account Info',
      children: <Account />,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose: () => { }
    });
  }

  return (
    <div className="primary-coloring-dark border-b-tertiary sticky top-0 flex h-[60px] w-full flex-row place-content-between border-b-2">
      {/* hamburger button */}
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="ml-4 inline-flex items-center rounded-lg p-2 text-sm focus:bg-transparent focus:outline-none focus:ring-2 sm:hidden"
        onClick={() => dispatch(toggleSideBar())}
      >
        <span className="sr-only">Open sidebar</span>
        <HamburgerIcon className="h-[40px]"/>
      </button>

      <div className='hidden sm:flex'>
        {AvailableLinks.map((value: SideBarItemProps) => <LinkItem key={value.linkTarget} {...value} />)}
      </div>

      {/* account button */}
      <AccountIcon className='mr-4 h-[60px] cursor-pointer' onClick={openAccount} />
    </div>
  )
}

export default TopBar