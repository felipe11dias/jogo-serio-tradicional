import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import GameContextProvider from "../../context/GameContext/GameContextProvider";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";


export default function TemplateStudent() {

  return (
    <>
      <Header bg="dark" variant="dark" />
      
      <Container className="template-container" style={{ minHeight: 'calc(100vh - 96px)' }}>
        <GameContextProvider>
          <Outlet />
        </GameContextProvider>
      </Container>

      <Footer />
    </>
  )
}