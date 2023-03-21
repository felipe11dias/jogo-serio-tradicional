import { Outlet } from "react-router-dom"

export default function TemplateAccessControl() {
  return (
    <>
    <section>
    <div className="container flex items-center justify-center mx-auto min-h-[100vh] ">
      <div className="card w-96 rounded-none bg-gray-400 mb-2">
           <Outlet /> 
      </div>
     </div>
    </section>
    </>
  )
}