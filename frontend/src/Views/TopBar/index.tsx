import { useModal } from 'src/hooks/UseModal';
import { useAppSelector, useAppDispatch } from 'src/Store';
import { InitialPlayerState, updatePlayerList } from 'src/Services/PlayersService';
import CampaignSelectionModal from '../TopBar/Campaigns/CampaignSelectionModal';
import { CampaignsSliceState } from 'src/Types/Campaigns';
import { updateCampaignSlice } from 'src/Services/CampaignsService';
import { HamburgerIcon } from 'src/components/Icons';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function TopBar() {
  const playerList = useAppSelector((state) => state.Player);
  const campaignList = useAppSelector((state) => state.Campaign);
  const dispatch = useAppDispatch();
  const { create, destroy } = useModal();

  const openCampaignModal = () => {
    create({
      title: 'Edit Campaigns',
      children: <CampaignSelectionModal campaignList={campaignList} currentPlayerState={playerList} saveEdit={saveCampaignEdit} cancel={destroy} />
    });
  }

  const saveCampaignEdit = (campaignList: CampaignsSliceState) => {
    dispatch(updateCampaignSlice(campaignList));
    dispatch(updatePlayerList(campaignList.Campaigns.find(x => x.Id == campaignList.CurrentCampaign)?.PlayerSliceInfo.Players ?? InitialPlayerState.Players));
    destroy();
  };

  return (
    <div className='h-12 w-full flex bg-custom-orange'>
      <div className='grow' />
      <Menu as="div">
        <Menu.Button className='p-1 mr-4'>
          <HamburgerIcon className='h-10 w-10 dark:text-black' />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-custom-orange text-black' : 'text-gray-900 dark:bg-custom-grey'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={openCampaignModal}
                  >
                    Campaigns
                  </button>
                  )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default TopBar;