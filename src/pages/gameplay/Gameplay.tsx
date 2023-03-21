import { NavLink } from "react-router-dom";
import GameArea from "./components/GameArea";

export default function Gameplay() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="my-3 w-100 text-center"> GAMEPLAY </h2>
      
      <div className="d-flex justify-content-center">
        <GameArea />
      </div>

      <div className="w-100 d-flex">
        <NavLink className={'btn btn-primary m-auto mt-2'} to="/environment/student/game-select" >
          Back
        </NavLink>
      </div>
    </div>
  )
}
