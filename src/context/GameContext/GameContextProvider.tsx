import { useState } from 'react';
import GameContext from './GameContext';

export interface GameSerius {
  gameSelected: string
  activitySelected: number
  disciplineSelected: number
};

export const gameSeriusDefault: GameSerius = {
  gameSelected: "",
  activitySelected: -1,
  disciplineSelected: -1
}

export default function GameContextProvider(props: any) {
  const [gameSerius, setGameSerius] = useState<GameSerius>(gameSeriusDefault);

  const saveGameSerius = (gameSerius: GameSerius) => {
    const newGameSerius: GameSerius = {
      gameSelected: gameSerius.gameSelected,
      activitySelected: gameSerius.activitySelected,
      disciplineSelected: gameSerius.disciplineSelected,
    };
    setGameSerius(newGameSerius);
  };

  return (
    <GameContext.Provider value={{ gameSerius, saveGameSerius }}>
      {props.children}
    </GameContext.Provider>
  );
}