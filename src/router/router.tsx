import {
  createBrowserRouter
} from "react-router-dom";
import FormForgetPassword from "../pages/access-control/components/forms/form-forget-password/FormForgetPassword";
import FormLogin, { loader as loaderLogin } from "../pages/access-control/components/forms/form-login/FormLogin";
import FormSignUp from "../pages/access-control/components/forms/form-sign-up/FormSignUp";
import CollaborationDisciplines from "../pages/collaboration-disciplines/CollaborationDisciplines";
import DisciplineSelect from "../pages/discipline-select/DisciplineSelect";
import ErrorPage from "../pages/error/error-page/ErrorPage";
import GameSelect from "../pages/game-select/GameSelect";
import Gameplay from "../pages/gameplay/Gameplay";
import TemplateAcessControl from "../templates/template-acess-control/TemplateAcessControl";
import TemplateEnvironment from "../templates/template-environment/TemplateEnvironment";
import TemplateStudent from "../templates/template-student/TemplateStudent";
import TemplateTeacher from "../templates/template-teacher/TemplateTeacher";


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
          },
          {
            path: "discipline-select",
            element: <DisciplineSelect />
          }
        ]
      },
      {
        path: "teacher",
        element: <TemplateTeacher />,
        children: [
          {
            path: "collaboration-disciplines",
            element: <CollaborationDisciplines />
          }
        ]
      },
      {
        path: "gameplay",
        element: <Gameplay />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

export default Router;