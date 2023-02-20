type HealthModificationProps = {
  applyModification: (amt: number) => void;
}

function HealthModification({ applyModification }: HealthModificationProps) {
  const modificationValues = [-10, -5, -1, 1, 5, 10];

  return (
    <div className='flex flex-row place-content-between pt-6'>
      {modificationValues.map((value: number) => {
        const stringValue = value > 0 ? `+${value}` : value;
        return <button key={value} onClick={() => applyModification(value)}>{stringValue}</button>;
      })}
      <button key={'max'} onClick={() => applyModification(0)}>Max</button>
    </div>
  )
}

export default HealthModification