type PlayerListModificationProps = {
  openEditModal: () => void;
}

function PlayerListModification({ openEditModal }: PlayerListModificationProps) {
  return (
    <div className='flex flex-row place-content-between space-x-4 pb-6'>
      <h2 className='text-3xl'>Player Health List</h2>
      <div className='flex flex-row place-content-end space-x-4'>
        <button className="bg-custom-orange text-black" onClick={openEditModal}>Edit Players</button>
      </div>
    </div>
  )
}

export default PlayerListModification