import { useState, ChangeEvent } from 'react';
import { SpellInformation } from 'src/types/spells';
import StringInput from 'src/components/StringInput';
import RadioSwitch from 'src/components/RadioSwitch';
import TagInput from 'src/components/TagInput';
import TextAreaInput from 'src/components/TextAreaInput';

type SpellModalProps = {
  oldSpellInfo: SpellInformation;
  saveEdit: (spell: SpellInformation) => void;
  cancel: () => void;
}

function SpellModal({ oldSpellInfo, saveEdit, cancel }: SpellModalProps) {
  const [spellInfo, setSpellInfo] = useState({ ...oldSpellInfo });

  const updateSpellInfo = (key: keyof SpellInformation, value: string | boolean | string[]) => {
    setSpellInfo({
      ...spellInfo,
      [key]: value
    });
  }

  const textInput = (placeholder: string, objectItem: string) => {
    const typedObjectitem = objectItem as keyof SpellInformation;
    return (
      <StringInput
        value={spellInfo[typedObjectitem] as string}
        placeholder={placeholder}
        inputOnChange={(e: ChangeEvent<HTMLInputElement>) => updateSpellInfo(typedObjectitem, e.target.value)}
        parentClassnameOverride="col-span-2"
      />
    )
  }

  return (
    <div className='h-full max-h-full min-w-[34%]'>
      <div className='h-[calc(100%-54px)] overflow-y-auto'>
        <div className='grid grid-flow-row-dense grid-cols-2'>
          {textInput("Spell Name", "name")}
          <StringInput
            value={spellInfo.spellLevel}
            placeholder="Spell Level"
            inputOnChange={(e: ChangeEvent<HTMLInputElement>) => updateSpellInfo("spellLevel", e.target.value)}
          />
          <RadioSwitch
            isActive={spellInfo.prepared}
            setIsActive={(value: boolean) => updateSpellInfo("prepared", value)}
            label="Prepared"
          />
          {textInput("Spell Components", "components")}
          {textInput("Casting time", "castingTime")}
          {textInput("Spell Duration", "duration")}
          {textInput("Spell Range/Area", "rangeArea")}
          {textInput("Spell Damage", "damage")}
          {textInput("Attack roll/DC Save", "attackSave")}
          <TagInput
            value={spellInfo.tags}
            placeholder="Spell Tags (Press enter to add)"
            inputOnChange={(e: string[]) => updateSpellInfo("tags", e)}
            parentClassnameOverride="col-span-2"
          />
          <TextAreaInput
            value={spellInfo.description}
            inputOnChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateSpellInfo("description", e.target.value)}
            placeholder="Spell Description"
            parentClassnameOverride='col-span-2'
            visible
          />
        </div>
      </div>
      <div className='bg-slate-200 pb-1 text-right'>
        <button className='secondary-coloring mt-4 mr-4 py-1' onClick={cancel}>Cancel</button>
        <button className='secondary-coloring mt-4 mr-4 py-1' onClick={() => saveEdit(spellInfo)}>Save</button>
      </div>
    </div>
  )
}

export default SpellModal;