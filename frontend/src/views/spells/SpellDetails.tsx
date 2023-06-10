/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Fragment } from 'react';
import { clsx } from 'clsx';
import { SpellInformation } from 'src/types/spells';
import StringInput from 'src/components/StringInput';
import TagInput from 'src/components/TagInput';
import TextAreaInput from 'src/components/TextAreaInput';
import RadioSwitch from 'src/components/RadioSwitch';
import { EditIcon, TrashIcon } from 'src/components/Icons';

type SpellDetailsProps = {
  spell: SpellInformation;
  editSpell: (id: number) => void;
  deleteSpell: (id: number) => void;
  togglePrepared: (id: number) => void;
  isOpen: boolean;
  isDragging: boolean
}

function SpellDetails({ spell, editSpell, deleteSpell, togglePrepared, isOpen, isDragging }: SpellDetailsProps) {
  const displayText = (itemKey: keyof SpellInformation, displayString: string) => {
    if ((spell[itemKey] as string).length !== 0)
    {
      return (
        <StringInput
          placeholder={displayString}
          value={spell[itemKey] as string}
          // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
          inputOnChange={(_e: React.ChangeEvent<HTMLInputElement>) => { }}
          disabled
          inputClassnameOverride='w-min'
        />
      );
    }
    
    return null;
  }

  return (
    <Fragment>
      <tr className={clsx("w-full bg-slate-100 shadow-[0_0_4px_#ccc]", !isOpen && "hidden", isDragging && 'invisible')}>
        <td colSpan={2}>
          <div className="flex w-full flex-row flex-wrap">
            <RadioSwitch parentOverride='w-32 scale-[.8]' isActive={spell.prepared} setIsActive={() => togglePrepared(spell.id)} label="Prepared"/>
            {displayText("spellLevel", "Spell Level")}
            {displayText("castingTime", "Casting Time")}
            {displayText("duration", "Duration")}
            {displayText("rangeArea", "Range/Area")}
            {displayText("attackSave", "Attack/Save")}
            {displayText("damage", "Damage")}
            {spell.tags.length > 0 &&
              <TagInput
              placeholder='Tags'
              value={spell.tags}
              disabled={true}
              // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
              inputOnChange={(_e: string[]) => { }}
              />}
            {spell.description.length > 0 && 
              <TextAreaInput
                visible={isOpen}
                disabled
                value={spell.description}
              placeholder="Spell Description"
              parentClassnameOverride='w-full'
                // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
                inputOnChange={(_e: React.ChangeEvent<HTMLTextAreaElement>) => { }}
              />  
            }
          </div>
        </td>
        <td className='flex w-[52px] flex-col'>
          <button className='border-[rgb(231,22,15)] p-2' onClick={() => deleteSpell(spell.id)}>
            <TrashIcon className='h-6 w-8 text-[rgb(231,22,15)]' />
          </button>
          <button className='mt-2 border-black p-2' onClick={() => editSpell(spell.id)}>
            <EditIcon className='h-6 w-8 text-black' />
          </button>
        </td>
      </tr>
    </Fragment>
  )
}

export default SpellDetails;