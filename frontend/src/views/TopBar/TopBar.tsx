import { Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import Capture from '../../Images/Capture.jpg';
import { clsx } from "clsx";

function TopBar() {
  const navigate = useNavigate();

  const buttonStyle = (buttonText: string) => {
    return clsx("border-0 bg-transparent hover:text-sky-500",
      window.location.pathname.endsWith(buttonText) && "text-sky-500 underline decoration-4 underline-offset-8");
  }

  return (
    <Fragment>
      <img src={Capture} alt="Banner" className="h-24 w-full object-cover" />
      <div className="sticky top-0 z-10 flex h-12 w-full justify-around bg-slate-300">
        <button className={buttonStyle("/")} onClick={()=>navigate('/')}>Home</button>
        <button className={buttonStyle("/campaigns")} onClick={()=>navigate('/campaigns')}>Campaigns</button>
        <button className={buttonStyle("/combat")} onClick={()=>navigate('/combat')}>Combat</button>
        <button className={buttonStyle("/abilities")} onClick={()=>navigate('/abilities')}>Abilities</button>
        <button className={buttonStyle('/equipment')} onClick={()=>navigate('/equipment')}>Equipment</button>
        <button className={buttonStyle('/spells')} onClick={()=>navigate('/spells')}>Spells</button>
        <button className={buttonStyle("/custom")} onClick={()=>navigate('/custom')}>Custom Items</button>
      </div>
    </Fragment>
  )
}

export default TopBar
