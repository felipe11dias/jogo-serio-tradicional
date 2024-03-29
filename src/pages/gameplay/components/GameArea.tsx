import { useContext } from "react";
import GameSeriusContext, { GameSeriusType } from "../../../context/GameContext/GameContext";
import Game from "./Game";

export default function GameArea() {
  const { gameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  return (
    <>
      { 
        gameSerius.gameSelected !== '' && gameSerius.disciplineSelected !== -1 && gameSerius.activitySelected !== -1 ?
        <div className="w-100 px-5 border rounded-md bg-backgroundColorSecondary" style={{ minWidth: '300px', minHeight: 'calc(100vh - 222px)' }}>
          <Game />
        </div>
         :
        <>
          <h2 className="text-2xl text-textColorThird font-bold text-center mb-10"> Selecione novamente um jogo </h2>
        </>
      }
    </>
  )
}
