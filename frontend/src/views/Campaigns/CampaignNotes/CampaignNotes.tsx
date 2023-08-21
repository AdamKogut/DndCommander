import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "src/store";
import { CampaignNote, GetNewNote } from "src/types/campaign";
import { UpdateCampaignNote } from "src/services/Campaigns";
import CampaignNoteList from "./CampaignNoteList";
import CampaignNoteArea from "./CampaignNoteArea";

type CampaignNotesProps = {
  Notes: CampaignNote[],
  CampaignId: number
}

function CampaignNotes({ Notes, CampaignId }: CampaignNotesProps) {
  const [currNote, setCurrNote] = useState<CampaignNote | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Notes.length === 0) {
      setCurrNote(undefined);
    }
    else if (currNote === undefined && Notes.length > 0) {
      setCurrNote(Notes[0]);
    }
  }, [Notes, currNote]);

  if (currNote === undefined) {
    return (
      <div className="flex h-full w-full flex-col justify-center">
        <div className="mx-auto pt-20 pb-6">Please Add A New Note</div>
        <button
          className="mx-auto"
          onClick={() => dispatch(UpdateCampaignNote({ CampaignId: CampaignId, Note: GetNewNote() }))}
        >
          Add New Note
        </button>
      </div>
    )
  }

  const ChangeCurrNote = (note: CampaignNote) => {
    setCurrNote(note);
  }

  return (
    <div className="mt-6 grid w-full grid-cols-5 gap-4">
      <CampaignNoteList
        Notes={Notes}
        CampaignId={CampaignId}
        CurrNoteId={currNote.Id}
        ChangeCurrNote={ChangeCurrNote}
      />
      <CampaignNoteArea
        CurrNote={currNote}
        CampaignId={CampaignId}
      />
    </div>
  )
}

export default CampaignNotes
