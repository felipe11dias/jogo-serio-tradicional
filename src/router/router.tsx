import {
  createBrowserRouter
} from "react-router-dom";
import FormForgetPassword from "../pages/access-control/components/forms/form-forget-password/FormForgetPassword";
import FormLogin, { loader as loaderLogin } from "../pages/access-control/components/forms/form-login/FormLogin";
import FormSignUp from "../pages/access-control/components/forms/form-sign-up/FormSignUp";
import ErrorPage from "../pages/error/error-page/ErrorPage";
import GameSelect from "../pages/game-select/GameSelect";
import TemplateAcessControl from "../templates/template-acess-control/TemplateAcessControl";
import TemplateEnvironment from "../templates/template-environment/TemplateEnvironment";
import TemplateStudent from "../templates/template-student/TemplateStudent";


const Router = createBrowserRouter([
  {
    path: "access-control",
    element: <TemplateAcessControl />,
    children: [
      {
        path: "login",
        element: <FormLogin />,
        loader: loaderLogin
      },
      {
        path: "forget-password",
        element: <FormForgetPassword />,
      },
      {
        path: "sign-up",
        element: <FormSignUp />,
      },
    ],
  },
  {
    path: "environment",
    element: <TemplateEnvironment />,
    children: [
      {
        path: "student",
        element: <TemplateStudent />,
        children: [
          {
            path: "game-select",
            element: <GameSelect />
          }
        ]
      },
      {
        path: "teacher",
        element: <div> Professores </div>
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

export default Router;