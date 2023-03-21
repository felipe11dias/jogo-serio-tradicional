import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";


export default function GameSelect() {
  const navigate = useNavigate();
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;


  useEffect(() => {
    saveGameSerius({gameSelected: '', activitySelected: '', disciplineSelected: ''})
  }, [])
  

  const selectGame = (gameSelected: string) => {
    saveGameSerius({gameSelected, activitySelected: gameSerius.activitySelected, disciplineSelected: gameSerius.disciplineSelected})
    navigate("/environment/student/discipline-select", { replace: true });
  }

  return (
    <div>
      <h2 className=" text-center"> GAME SELECT </h2>
      
      <div className="flex justify-around mt-10">

        <div className="m-2 border rounded-md p-2" style={{ width: '18rem' }}>
          <div className="flex flex-col items-center">
            <div className="text-center mb-2">Jogo da velha</div>
            <div  className="text-center mb-2">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </div >
            <button className="bg-blue-800 w-24 text-white px-4 py-1 mt-2 rounded-lg transition" onClick={() => selectGame('jogo_da_velha')}> SELECT </button>
          </div>
        </div>

        <div className="m-2 border rounded-md p-2" style={{ width: '18rem' }}>
          <div className="flex flex-col items-center">
            <div className="text-center mb-2">Dama</div>
            <div  className="text-center mb-2">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </div>
            <button className="bg-blue-800 w-24 text-white px-4 py-1 mt-2 rounded-lg transition" onClick={() => selectGame('dama')}> SELECT </button>
          </div>
        </div>

      </div>

    </div>
  )
}
