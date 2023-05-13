import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/store";
import { listActivities } from "../../../service/rest/apis/activityRestApi";
import { Activity } from "../../../types/Activity";
import ModalDelete from "./components/ModalDelete";
import ModalViewQuestions from "./components/ModalViewQuestions";
import './style.css';

export default function ListActivities() {
  const user = useAppSelector(state => state.userState.user)
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchActivity, setSearchActivity] = useState("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    findAllActivities()
  }, [page])

  const findAllActivities = () => {
    const params = getRequestParams(searchActivity, page);

    listActivities(params).then(data => {
      setActivities(data.content)
      setCount(data.totalPages)
    }).catch(error => {
      return null
    })
  }

  const onChangeSearchActivity = (e: any) => {
    const searchActivity = e.target.value;
    setSearchActivity(searchActivity);
  };

  const getRequestParams = (searchActivity: string, page: number) => {
    let params: any = {};

    if (searchActivity) {
      params["activity"] = searchActivity;
    }

    if (page) {
      params["page"] = page - 1;
    }

    return params;
  };

  const findByActivity = () => {
    setPage(1);
    findAllActivities();
  };

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-4xl text-textColorThird font-bold text-center mb-10">ATIVIDADES</h2>

        <div className="w-full flex justify-around items-center flex-row m-2">
          <div className="flex">
            <input
              className="h-fit w-96 px-1 my-2 py-2 rounded-lg"
              type="text"
              placeholder="Buscar por nome"
              value={searchActivity}
              onChange={onChangeSearchActivity}
            />
            <div>
              <button className="h-fit w-fit text-center m-2 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg " onClick={findByActivity}>
                Buscar
              </button>
            </div>
          </div>

          <Link className="h-fit text-center w-38 my-5 ml-auto mr-o p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg" to={'/environment/teacher/collaboration-activities/create'} >Criar atividade</Link>
        </div>


        <div className="w-full ">
          <table className="border-2 border-solid border-textColorThird w-full text-sm text-center text-primary dark:text-textHintColor ">
            <thead className="text-xs text-primary uppercase bg-bgTableHeaderColor dark:bg-primary dark:text-textHintColor ">
              <tr>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Nome</th>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Disciplina</th>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Professor</th>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Questões</th>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                activities.length > 0 ? activities.map((activity, index) => (
                  <tr className="text-textColorSecondary" key={activity.id}>
                    <td className="border-2 border-solid border-textColorThird px-4 py-2">{activity.name}</td>
                    <td className="border-2 border-solid border-textColorThird px-4 py-2">{activity.discipline}</td>
                    <td className="border-2 border-solid border-textColorThird px-4 py-2">{activity.user}</td>
                    <td className="border-2 border-solid border-textColorThird px-4 py-2"><ModalViewQuestions questions={activity.questions} /></td>
                    <td className="flex justify-center px-4 py-2" style={(index + 1) < activities.length ? { borderBottom: '2px solid rgb(51 73 241 / var(--tw-border-opacity))' } : {} }>
                      {activity.idUser === user?.id ?
                        <>
                          <Link className="w-16 mx-2 my-auto rounded p-2 bg-yellow-400 text-white hover:scale-125 hover:cursor-pointer" to={`/environment/teacher/collaboration-activities/edit/${activity.id}`}>Editar</Link>
                          <ModalDelete id={activity.id} />
                        </> :
                        <>Nenhuma ação disponível</>
                      }
                    </td>
                  </tr>
                ))
                  :
                <div className="flex justify-center items-center text-center w-full">
                  Nenhuma atividade cadastrada.
                </div>
              }
            </tbody>
          </table>

          <div className="flex justify-center items-center text-center w-full">
            <Pagination
              color="primary"
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}