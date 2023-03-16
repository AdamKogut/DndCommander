import { Fragment } from "react";
import { store, useAppDispatch, useAppSelector } from "src/store";

function ViewCoin() {
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <button className="mb-2 w-full p-2">
        View Stats
      </button>
      <button className="mb-2 w-full p-2">
        View Coin
      </button>
    </Fragment>
  )
}

export default ViewCoin;