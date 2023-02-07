import { NavLink } from "react-router-dom";
import GameArea from "./components/GameArea";

export default function Gameplay() {
  return (
    <div>
      <h2 className="my-5 w-100 text-center"> GAMEPLAY </h2>
      
      <div className="d-flex justify-content-center">
        <GameArea />
      </div>

      <div className="w-100 d-flex">
        <NavLink className={'btn btn-primary m-auto mt-5'} to="/environment/student/game-select" >
          Back
        </NavLink>
      </div>
    </div>
  )
}
