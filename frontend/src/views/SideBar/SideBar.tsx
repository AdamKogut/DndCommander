import { clsx } from 'clsx';
import { useAppSelector } from 'src/store';
import { SideBarItemProps } from 'src/types/sideBar';
import { LinkItem, AvailableLinks } from 'src/components/Links';
import CloseSideBar from './CloseSideBar';

function SideBar() {
  const { SideBarOpen } = useAppSelector((store) => store.SideBar);

  const shouldBeOpen = SideBarOpen && window.innerWidth <= 640;

  return (
    <aside
      id="default-sidebar"
      className={
        clsx("primary-coloring-dark fixed top-0 left-0 z-40 h-full w-64 -translate-x-full transition-transform",
          shouldBeOpen && "transform-none",
          !shouldBeOpen && "-translate-x-full"
        )}
      aria-label="Sidebar">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
        <div className='grow'>
          <CloseSideBar />
          <ul className="space-y-2">
            {AvailableLinks.map((value: SideBarItemProps) => <ul key={value.displayText}><LinkItem {...value} /></ul>)}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default SideBar