import { ChangeEvent, useEffect, useMemo, useRef } from 'react';

type TextAreaInputProps = {
  placeholder: string;
  value: string;
  inputClassnameOverride?: string;
  labelClassnameOverride?: string;
  parentClassnameOverride?: string;
  inputOnChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  visible: boolean;
}

function TextAreaInput({ placeholder, value, inputClassnameOverride, inputOnChange, labelClassnameOverride, parentClassnameOverride, disabled, visible }: TextAreaInputProps) {
  const idPlaceholder = useMemo(() => placeholder.replace(/\s/g, ''), [placeholder]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef !== null && textAreaRef.current !== null) {
      textAreaRef.current.style.height = (textAreaRef.current?.scrollHeight) + "px";
    }
  }, [textAreaRef, value, visible]);

  return (
    <div className={`relative m-2 mt-6 ${parentClassnameOverride}`}>
      <textarea
        id={`floating_${idPlaceholder}`}
        className={`peer block w-full appearance-none overflow-y-hidden rounded-t-lg border-0 border-b-2 border-gray-300 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 ${inputClassnameOverride}`}
        placeholder=" "
        value={value}
        wrap='hard'
        rows={1}
        ref={textAreaRef}
        onChange={inputOnChange}
        disabled={disabled ?? false}
      />
      <label
        htmlFor={`floating_${idPlaceholder}`}
        className={`absolute top-4 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 ${labelClassnameOverride}`}
      >
        {placeholder}
      </label>
    </div>
  )
}

export default TextAreaInput;