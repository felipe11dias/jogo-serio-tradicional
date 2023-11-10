import {
  Navigate,
  Outlet,
  Route,
  createHashRouter,
  createRoutesFromElements
} from "react-router-dom";
import FormForgetPassword from "../pages/access-control/components/forms/form-forget-password/FormForgetPassword";
import FormSignUp from "../pages/access-control/components/forms/form-sign-up/FormSignUp";
import Login from "../pages/access-control/login/Login";
import CollaborationActivities from "../pages/collaboration-activities/CollaborationActivities";
import ActivitySelect from "../pages/collaboration-activities/activity-select/ActivitySelect";
import CreateActivities from "../pages/collaboration-activities/create-activities/CreateActivities";
import EditActivities from "../pages/collaboration-activities/edit-activities/EditActivities";
import ListActivities from "../pages/collaboration-activities/list-activities/ListActivities";
import CollaborationDisciplines from "../pages/collaboration-disciplines/CollaborationDisciplines";
import CreateDiscipline from "../pages/collaboration-disciplines/create-discipline/CreateDiscipline";
import ListDisciplines from "../pages/collaboration-disciplines/list-disciplines/ListDisciplines";
import DisciplineSelect from "../pages/discipline-select/DisciplineSelect";
import GameSelect from "../pages/game-select/GameSelect";
import Gameplay from "../pages/gameplay/Gameplay";
import HomeTeacher from "../pages/home/teacher/Home";
import Ranking from "../pages/ranking/Ranking";
import TemplateAccessControl from "../templates/template-access-control/TemplateAccessControl";
import TemplateEnvironment from "../templates/template-environment/TemplateEnvironment";
import TemplateStudent from "../templates/template-student/TemplateStudent";
import TemplateTeacher from "../templates/template-teacher/TemplateTeacher";
import RequireUser from "./requireUser";

export enum ROLES {
  STUDENT,
  TEACHER
}

const Router = createHashRouter(
  createRoutesFromElements(
      <Route  path="/" element={<Outlet />}>
        <Route index element={<Navigate to="/access-control/login" />} />
        
        <Route path="access-control" element={<TemplateAccessControl />}>
          <Route
            path="login" 
            element={<Login />}
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
          <Route element={<RequireUser allowedRoles={[ROLES[ROLES.STUDENT], ROLES[ROLES.TEACHER]]} />}> 
            <Route
              path="student"
              element={<TemplateStudent />}
            >
              <Route
                path="game-select"
                element={<GameSelect />}
              />
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
              <Route
                path="ranking"
                element={<Ranking />}
              />
            </Route>
          </Route>

          <Route element={<RequireUser allowedRoles={[ROLES[ROLES.TEACHER]]} />}>
            <Route
              path="teacher"
              element={<TemplateTeacher />}
            >
              <Route
                path="home"
                element={<HomeTeacher />}
              />
              
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
                <Route
                  path="edit/:id"
                  element={<EditActivities />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
  ), {
    basename: "/jogo-serio-tradicional",
  });

export default Router;