import { useState } from 'react';
import GameContext from './GameContext';

export interface GameSerius {
  gameSelected: string
  disciplineSelected: string
};

export const gameSeriusDefault: GameSerius = {
  gameSelected: "",
  disciplineSelected: ""
}

export default function GameContextProvider(props: any) {
  const [gameSerius, setGameSerius] = useState<GameSerius>(gameSeriusDefault);

  const saveGameSerius = (gameSerius: GameSerius) => {
    const newGameSerius: GameSerius = {
      gameSelected: gameSerius.gameSelected,
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