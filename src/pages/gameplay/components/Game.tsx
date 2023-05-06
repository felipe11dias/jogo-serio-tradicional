import { useContext } from "react";
import GameSeriusContext, { GameSeriusType } from "../../../context/GameContext/GameContext";
import { GAME_AIMSHOT_SEARCH, GAME_RESPONSE_SEARCH } from "../../../util/constants";
import AimshotResponse from "../games/aimshot-response/AimshotResponse";
import ResponseSearch from "../games/response-search/ResponseSearch";
import TicTacToe from "../games/tic-tac-toe/TicTacToe";

export default function Game() {
  const { gameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  return (
    <>
      { 
        gameSerius.gameSelected === 'jogo_da_velha' ?
          <TicTacToe />
         : gameSerius.gameSelected === GAME_RESPONSE_SEARCH ?
          <ResponseSearch />
         :  gameSerius.gameSelected === GAME_AIMSHOT_SEARCH ?
          <AimshotResponse />
         :
        <></>   
      }
    </>
  )
}
