 
import { Outlet } from "react-router-dom";
import GameContextProvider from "../../context/GameContext/GameContextProvider";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";


export default function TemplateStudent() {

  return (
    <>
      <Header />
      
      <div className="template-container max-w-[1440px] mx-auto m-5 px-8" style={{ minHeight: 'calc(100vh - 240px)' }}>
        <GameContextProvider>
          <Outlet />
        </GameContextProvider>
      </div>

      <Footer />
    </>
  )
}