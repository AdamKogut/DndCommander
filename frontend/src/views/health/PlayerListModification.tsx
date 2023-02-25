type PlayerTableProps = {
  openEditModal: () => void;
}

function PlayerListModification({ openEditModal }: PlayerTableProps) {
  return (
    <div className='flex flex-row place-content-between space-x-4 pb-6'>
      <h2 className='text-3xl'>Player Health List</h2>
      <div className='flex flex-row place-content-end space-x-4'>
        <button className="btn-primary" onClick={openEditModal}>Edit Players</button>
      </div>
    </div>
  )
}

export default PlayerListModification