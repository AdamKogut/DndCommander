import { store, useAppDispatch, useAppSelector } from "src/store";

function ViewCoin() {
  const { currentCoin } = useAppSelector((store) => store.Equipment);
  const dispatch = useAppDispatch();

  // 286 + 26 * num coin
  if (window.innerHeight < (286 + 26 * 4))// currentCoin.length))
  {
    return (
      <button className="w-full">
        View coin
      </button>
    )
  } //TODO: make refresh on page resizing

  return (
    <div>
      <table className='w-[100%] table-fixed'>
        <tbody>
          <tr>
            <td className="text-right">Gold:</td>
            <td>32</td>
          </tr>
          <tr>
            <td className="text-right">Gold:</td>
            <td>32</td>
          </tr>
          <tr>
            <td className="text-right">Gold:</td>
            <td>32</td>
          </tr>
          <tr>
            <td className="text-right">Gold:</td>
            <td>32</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewCoin;