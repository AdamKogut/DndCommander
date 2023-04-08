import { useState, ChangeEvent } from 'react';
import { SpellInformation } from 'src/types/spells';
import StringInput from 'src/components/StringInput';
import RadioSwitch from 'src/components/RadioSwitch';
import TagInput from 'src/components/TagInput';

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
          <div className={`relative m-2`}>
            <RadioSwitch
              isActive={spellInfo.prepared}
              setIsActive={(value: boolean) => updateSpellInfo("prepared", value)}
              label="Prepared"
            />
          </div>
          {textInput("Spell Components", "components")}
          {textInput("Casting time", "castingTime")}
          {textInput("Spell Duration", "duration")}
          {textInput("Spell Range/Area", "rangeArea")}
          {textInput("Spell Damage", "damage")}
          {textInput("Attack roll/DC Save", "attackSave")}
          <TagInput
            value={spellInfo.tags}
            placeholder="Spell Tags"
            inputOnChange={(e: string[]) => updateSpellInfo("tags", e)}
            parentClassnameOverride="col-span-2"
          />
          <div className={`relative col-span-2 m-2`}>
            <textarea
              id="floating_description"
              className={`peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500`}
              placeholder=" "
              value={spellInfo.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateSpellInfo("description", e.target.value)}
            />
            <label
              htmlFor="floating_description"
              className={`absolute top-4 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500`}
            >
              Spell Description
            </label>
          </div>
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