import { clsx } from "clsx";
import { useAppDispatch } from "src/store";
import { CampaignNote, GetNewNote } from "src/types/campaign";
import { UpdateCampaignNote } from "src/services/Campaigns";

type CampaignNoteListProps = {
  Notes: CampaignNote[],
  CampaignId: number,
  CurrNoteId: number,
  ChangeCurrNote: (note: CampaignNote) => void;
}

function CampaignNoteList({ Notes, CampaignId, CurrNoteId, ChangeCurrNote }: CampaignNoteListProps) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        className="mb-4 w-full"
        onClick={() => dispatch(UpdateCampaignNote({ CampaignId: CampaignId, Note: GetNewNote() }))}
      >
        Add New Note
      </button>
      {Notes.map((value: CampaignNote) => (
        <button
          key={value.Id}
          className={clsx("mb-4 w-full", CurrNoteId === value.Id && "bg-blue-500 text-white")}
          onClick={()=>ChangeCurrNote(value)}
        >
          {value.Subject}
        </button>)
      )}
    </div>
  )
}

export default CampaignNoteList
