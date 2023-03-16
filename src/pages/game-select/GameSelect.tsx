import { useContext, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";


export default function GameSelect() {
  const navigate = useNavigate();
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;


  useEffect(() => {
    saveGameSerius({gameSelected: '', disciplineSelected: ''})
  }, [])
  

  const selectGame = (gameSelected: string) => {
    saveGameSerius({gameSelected, disciplineSelected: gameSerius.disciplineSelected})
    navigate("/environment/student/discipline-select", { replace: true });
  }

  return (
    <div>
      <h2 className="mb-5 w-100 text-center"> GAME SELECT </h2>
      
      <div className="d-flex justify-content-around">
        <div className="m-2" style={{ width: '18rem' }}>
          <div>
            <div>Jogo da velha</div>
            <div>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </div>
            <button  onClick={() => selectGame('jogo_da_velha')}> SELECT </button>
          </div>
        </div>

        <div className="m-2" style={{ width: '18rem' }}>
          <div>
            <div>Dama</div>
            <div>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </div>
            <button  onClick={() => selectGame('dama')}> SELECT </button>
          </div>
        </div>
      </div>
    </div>
  )
}
