import { createContext } from 'react';
import { GameSerius } from './GameContextProvider';

export type GameSeriusType = {
  gameSerius: GameSerius,
  saveGameSerius: (newGameSerius: GameSerius) => void
};

const GameSeriusContext = createContext<GameSeriusType | null>(null);

export default GameSeriusContext;