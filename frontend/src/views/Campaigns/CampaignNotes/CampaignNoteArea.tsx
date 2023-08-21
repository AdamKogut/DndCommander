import { useEffect, useState } from "react";
import { CampaignNote } from "src/types/campaign";
import TextAreaInput from "src/components/TextAreaInput";
import StringInput from "src/components/StringInput";
import { useAppDispatch } from "src/store";
import { UpdateCampaignNote } from "src/services/Campaigns";

type CampaignNoteAreaProps = {
  CurrNote: CampaignNote,
  CampaignId: number
}

type CampaignNoteAreaState = {
  Note: CampaignNote | undefined,
  Timer: number | undefined
}

function CampaignNoteArea({ CurrNote, CampaignId }: CampaignNoteAreaProps) {
  const dispatch = useAppDispatch();
  const [currState, setCurrState] = useState<CampaignNoteAreaState>({
    Note: undefined,
    Timer: undefined
  });

  const SaveInformation = (note: CampaignNote) => {
    dispatch(UpdateCampaignNote({
      CampaignId: CampaignId,
      Note: note
    }));
  }

  useEffect(() => {
    if (currState.Note !== undefined && currState.Timer !== undefined) {
      SaveInformation(currState.Note);
      clearTimeout(currState.Timer);
    }

    setCurrState({
      Note: { ...CurrNote },
      Timer: undefined
    });
  }, [CurrNote]);

  if (currState.Note === undefined) {
    return null;
  }
  
  const UpdateSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currState.Note === undefined) {
      return;
    }

    clearTimeout(currState.Timer);
    const newNote = {
      ...currState.Note,
      Subject: e.target.value
    };
    setCurrState({
      Note: newNote,
      Timer: setTimeout(()=>SaveInformation(newNote), 2000)
    });
  }

  const UpdateNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currState.Note === undefined) {
      return;
    }
    
    clearTimeout(currState.Timer);
    const newNote = {
      ...currState.Note,
      Value: e.target.value
    };
    setCurrState({
      Note: newNote,
      Timer: setTimeout(()=>SaveInformation(newNote), 2000)
    });
  }

  return (
    <div className="col-span-4 flex flex-col">
      <div className="mr-2 flex">
        <StringInput
          parentClassnameOverride="grow"
          placeholder="Subject"
          value={currState.Note.Subject}
          inputOnChange={UpdateSubject}
        />
        <button
          className="mt-2 h-12 bg-red-500 text-white"
        >
          Delete Note
        </button>
      </div>
      <TextAreaInput
        parentClassnameOverride="mb-16"
        placeholder="Notes"
        value={currState.Note.Value}
        visible
        inputOnChange={UpdateNote}
      />
      {/* {isScrollbarVisible ? 
        <div className="absolute bottom-0 right-20 bg-white rounded-lg"></div>
      :null} */}
    </div>
  )
}

export default CampaignNoteArea
