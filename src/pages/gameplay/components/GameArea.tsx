import { useContext } from "react";
import GameSeriusContext, { GameSeriusType } from "../../../context/GameContext/GameContext";
import Game from "./Game";

export default function GameArea() {
  const { gameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  return (
    <>
      { 
        gameSerius.gameSelected !== '' && gameSerius.disciplineSelected !== '' ?
        <div className="w-100 border border-3 rounded-3" style={{ minWidth: '350px', maxWidth: '80%', minHeight: 'calc(100vh - 230px)' }}>
          <Game  />
        </div>
         :
        <>SELECT GAME AND SELECT DISCIPLINE</>  
      }
    </>
  )
}
