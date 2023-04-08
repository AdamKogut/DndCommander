import { ChangeEvent, useState, KeyboardEvent, useMemo } from 'react';

type TagInputProps = {
  placeholder: string;
  value: string[];
  inputClassnameOverride?: string;
  labelClassnameOverride?: string;
  parentClassnameOverride?: string;
  inputOnChange: (e: string[]) => void;
}

function TagInput({ placeholder, value, inputClassnameOverride, inputOnChange, labelClassnameOverride, parentClassnameOverride }: TagInputProps) {
  const [tags, setTags] = useState<string[]>(value);
  const [currentText, setCurrentText] = useState('');
  const idPlaceholder = useMemo(() => placeholder.replace(/\s/g, ''), [placeholder]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }
    const value = e.currentTarget.value
    if (!value.trim()) return;
    setTags([...tags, value]);
    setCurrentText('');
    inputOnChange(tags);
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.currentTarget.value);
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
    inputOnChange(tags);
  }

  return (
    <div className={`relative m-2 ${parentClassnameOverride}`}>
      <div className='flex flex-wrap gap-2 align-middle'>
          <input
            onKeyDown={handleKeyDown}
            onChange={onChange}
            type="text"
            id={`floating_${idPlaceholder}`}
            className={`peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 ${inputClassnameOverride}`}
            placeholder=" "
            value={currentText}
          />
          <label
            htmlFor={`floating_${idPlaceholder}`}
            className={`absolute top-4 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 ${labelClassnameOverride}`}
          >
            {placeholder}
          </label>
          { tags.map((tag, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              className="block cursor-pointer rounded-full bg-[rgb(218,216,216)] px-[.5em] py-1"
              key={index}
              onClick={() => removeTag(index)}
            >
              <span>{tag}</span>
              <button
                className="ml-[.5em] inline-flex h-[20px] w-[20px] cursor-pointer justify-center rounded-full bg-[rgb(48,48,48)] p-0 align-middle text-[18px] leading-none text-[#fff]"
                onClick={() => removeTag(index)}
              >
                &times;
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TagInput;