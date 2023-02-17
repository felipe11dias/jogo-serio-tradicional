import { Outlet } from "react-router-dom";
import UserContextProvider from "../../context/UserContext/UserContextProvider";

export default function TemplateEnvironment() {
  return (
    <>
      <UserContextProvider>
        <Outlet />
      </UserContextProvider>
    </>
  )
}
