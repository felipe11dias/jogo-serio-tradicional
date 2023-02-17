import { useContext } from "react";
import GameSeriusContext, { GameSeriusType } from "../../../context/GameContext/GameContext";
import TicTacToe from "../games/tic-tac-toe/TicTacToe";

export default function Game() {
  const { gameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  return (
    <>
      { 
        gameSerius.gameSelected === 'jogo_da_velha' ?
         <TicTacToe />
         :
        <></>  
      }
    </>
  )
}
