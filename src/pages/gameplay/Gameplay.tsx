import { NavLink } from "react-router-dom";
import GameArea from "./components/GameArea";

export default function Gameplay() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-4xl text-textColorThird font-bold text-center mb-10"> GAMEPLAY </h2>
      
      <div className="w-full px-4 d-flex justify-content-center mb-10">
        <GameArea />
      </div>

      <div className="w-100 d-flex">
        <NavLink className={'w-full my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-white font-semibold rounded-lg'} to="/environment/student/game-select" >
          Voltar
        </NavLink>
      </div>
    </div>
  )
}
