import { useContext } from "react";
import GameSeriusContext, { GameSeriusType } from "../../../context/GameContext/GameContext";
import Game from "./Game";

export default function GameArea() {
  const { gameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  return (
    <>
      { 
        gameSerius.gameSelected !== '' && gameSerius.disciplineSelected !== '' ?
        <div className="w-100 px-5 border rounded-md bg-textHintColor" style={{ minWidth: '300px', minHeight: 'calc(100vh - 230px)' }}>
          <Game  />
        </div>
         :
        <>
          <h2 className="text-2xl text-white font-bold text-center mb-10">      SELECT GAME AND SELECT DISCIPLINE </h2>
   
        </>  
      }
    </>
  )
}
