import { ChangeEvent, useMemo } from 'react';

type StringInputProps = {
  placeholder: string;
  value: string;
  inputClassnameOverride?: string;
  labelClassnameOverride?: string;
  parentClassnameOverride?: string;
  inputOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorString?: string;
}

function StringInput({
  placeholder,
  value,
  inputClassnameOverride,
  inputOnChange,
  labelClassnameOverride,
  parentClassnameOverride,
  disabled,
  errorString
}: StringInputProps) {
  const idPlaceholder = useMemo(() => placeholder.replace(/\s/g, ''), [placeholder]);

  return (
    <div className={`relative z-0 m-2 ${parentClassnameOverride}`}>
      <input
        type="text"
        id={`floating_${idPlaceholder}`}
        className={`bg-primary-light text-primary-dark peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-accent px-2.5 pb-1 pt-5 text-sm focus:border-calltoaction focus:outline-none focus:ring-0 dark:bg-primary-dark dark:text-primary-light ${inputClassnameOverride}`}
        placeholder=" "
        value={value}
        onChange={inputOnChange}
        size={value.length}
        disabled={disabled ?? false}
      />
      {errorString && <div className='text-xs text-calltoaction-red'>{errorString}</div>}
      <label
        htmlFor={`floating_${idPlaceholder}`}
        className={`text-accent absolute top-5 left-2.5 z-10 origin-[0] -translate-y-5 scale-75 text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-calltoaction dark:text-primary-light ${labelClassnameOverride}`}
      >
        {placeholder}
      </label>
    </div>
  )
}

export default StringInput;