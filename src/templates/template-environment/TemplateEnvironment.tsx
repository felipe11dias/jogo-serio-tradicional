import { Outlet } from "react-router-dom";
import GameContextProvider from "../../context/GameContext/GameContextProvider";

export default function TemplateEnvironment() {
  return (
    <>
      <GameContextProvider>
        <Outlet />
      </GameContextProvider>
    </>
  )
}
