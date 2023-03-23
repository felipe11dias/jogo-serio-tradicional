import {
  Navigate,
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import FormForgetPassword from "../pages/access-control/components/forms/form-forget-password/FormForgetPassword";
import FormLogin from "../pages/access-control/components/forms/form-login/FormLogin";
import FormSignUp from "../pages/access-control/components/forms/form-sign-up/FormSignUp";
import CollaborationActivities from "../pages/collaboration-activities/CollaborationActivities";
import ActivitySelect from "../pages/collaboration-activities/activity-select/ActivitySelect";
import CreateActivities from "../pages/collaboration-activities/create-activities/CreateActivities";
import ListActivities from "../pages/collaboration-activities/list-activities/ListActivities";
import CollaborationDisciplines from "../pages/collaboration-disciplines/CollaborationDisciplines";
import CreateDiscipline from "../pages/collaboration-disciplines/create-discipline/CreateDiscipline";
import ListDisciplines from "../pages/collaboration-disciplines/list-disciplines/ListDisciplines";
import DisciplineSelect from "../pages/discipline-select/DisciplineSelect";
import GameSelect from "../pages/game-select/GameSelect";
import Gameplay from "../pages/gameplay/Gameplay";
import TemplateAccessControl from "../templates/template-access-control/TemplateAccessControl";
import TemplateEnvironment from "../templates/template-environment/TemplateEnvironment";
import TemplateStudent from "../templates/template-student/TemplateStudent";
import TemplateTeacher from "../templates/template-teacher/TemplateTeacher";

/*
const PrivateWrapper = ({ auth: any = { isAuthenticated: boolean } }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/access-control/login" />;
};
*/

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      
      <Route index element={<Navigate to="/access-control/login" />} />
      <Route path="access-control" element={<TemplateAccessControl />}>
        <Route
          path="login" 
          element={<FormLogin />}
        />
        <Route
          path="forget-password"
          element={<FormForgetPassword />}
        />
        <Route
          path="sign-up"
          element={<FormSignUp />}
        />
      </Route>

      <Route path="environment" element={<TemplateEnvironment />}>
        <Route
          path="student"
          element={<TemplateStudent />}
        >
          <Route
            path="game-select"
            element={<GameSelect />}
          />,
          <Route
            path="discipline-select"
            element={<DisciplineSelect />}
          />
          <Route
            path="activity-select"
            element={<ActivitySelect />}
          />
          <Route
            path="gameplay"
            element={<Gameplay />}
          />
        </Route>

        <Route
          path="teacher"
          element={<TemplateTeacher />}
        >
          <Route
            path="collaboration-disciplines"
            element={<CollaborationDisciplines />}
          >
            <Route
              path="list"
              element={<ListDisciplines />}
            />
            
            <Route
              path="create"
              element={<CreateDiscipline />}
            />
          </Route>

          <Route
            path="collaboration-activities"
            element={<CollaborationActivities />}
          >
            <Route
              path="list"
              element={<ListActivities />}
            />
            <Route
              path="create"
              element={<CreateActivities />}
            />
          </Route>
        </Route>
      </Route>
    </Route>
  ));

export default Router;