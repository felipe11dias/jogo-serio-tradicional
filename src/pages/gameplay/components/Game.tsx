import { useContext } from "react";
import GameSeriusContext, { GameSeriusType } from "../../../context/GameContext/GameContext";
import { GAME_AIMSHOT_SEARCH, GAME_GUITAR_QUESTIONS, GAME_RESPONSE_SEARCH } from "../../../util/constants";
import AimshotResponse from "../games/aimshot-response/AimshotResponse";
import GuitarQuestions from "../games/guitar-questions/GuitarQuestions";
import ResponseSearch from "../games/response-search/ResponseSearch";

export default function Game() {
  const { gameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  return (
    <>
      { 
        gameSerius.gameSelected === GAME_GUITAR_QUESTIONS ?
          <GuitarQuestions />
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
