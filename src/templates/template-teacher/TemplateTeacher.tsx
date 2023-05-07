 
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";


export default function TemplateTeacher() {

  return (
    <>
      <Header bg="dark" variant="dark" />
      
      <div className="template-container max-w-[1440px] mx-auto m-5 " style={{ minHeight: 'calc(100vh - 233px)' }}>
        <Outlet />
      </div>

      <Footer />
    </>
  )
}