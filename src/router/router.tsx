import {
  createBrowserRouter
} from "react-router-dom";
import Login from "../pages/login/Login";
import TemplateAcessControl from "../templates/template-acess-control/TemplateAcessControl";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <TemplateAcessControl />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <div>ESSA ROTA NAO EXISTE</div>
  }
]);

export default Router;