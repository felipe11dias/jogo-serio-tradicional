import { Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameSeriusContext, { GameSeriusType } from "../../../context/GameContext/GameContext";
import { listActivitiesByDiscipline } from "../../../service/rest/apis/activityRestApi";
import { Activity } from "../../../types/Activity";


export default function ActivitySelect() {
  const navigate = useNavigate();
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchActivity, setSearchActivity] = useState("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    findAllActivities()
  }, [page])

  const findAllActivities = () => {
    const params = getRequestParams(searchActivity, page);

    listActivitiesByDiscipline(gameSerius.disciplineSelected, params).then(data => {
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

  const selectActivity = (activitySelected: number) => {
    saveGameSerius({ gameSelected: gameSerius.gameSelected, activitySelected, disciplineSelected: gameSerius.disciplineSelected })
    navigate("/environment/student/gameplay", { replace: true });
  }

  return (
    <div className="flex justify-center items-center flex-col">

      <h2 className="text-4xl text-textColorThird font-bold text-center mb-10 "> SELECIONE UMA ATIVIDADE </h2>

      <div className="w-full flex justify-center items-center flex-row m-2 ">
        <input
          className="w-96 px-1 py-2 rounded-lg"
          type="text"
          placeholder="Buscar por nome"
          value={searchActivity}
          onChange={onChangeSearchActivity}
        />
        <div>
          <button className="text-center w-full m-2 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg " onClick={findByActivity}>
            Buscar
          </button>
        </div>
      </div>

      <div className="w-full ">
        <table className="border-2 border-solid border-textColorThird w-full text-sm text-center text-primary dark:text-textHintColor ">
          <thead className="text-xs text-primary uppercase bg-bgTableHeaderColor dark:bg-primary dark:text-textHintColor ">
            <tr>
              <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">
                Nome
              </th>
              <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">
                Disciplina
              </th>
              <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">
                Professor
              </th>
              <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">
                Selecione
              </th>
            </tr>
          </thead>
          <tbody>
            {
              activities.length > 0 ? activities.map(activity => (
                <tr className="text-textColorSecondary" key={activity.id}>
                  <td className="border-2 border-solid border-textColorThird">{activity.name}</td>
                  <td className="border-2 border-solid border-textColorThird">{activity.discipline}</td>
                  <td className="border-2 border-solid border-textColorThird">{activity.user}</td>
                  <td className="border-2 border-solid border-textColorThird">
                    <button className="text-center my-2 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg" onClick={() => selectActivity(activity?.id)}> Selecionar </button>
                  </td>
                </tr>
              ))
              :
              <></>
            }
          </tbody>
        </table>

        {
          activities.length === 0 ?
          <div className="text-textColorThird border-2 border-solid border-textColorThird flex justify-center items-center text-center w-full">
            Nenhuma atvidade cadastrada.
          </div> :
          <></>
        }

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
      <div className="mt-6 d-flex justify-content-center">
        <Link className='text-center w-full my-5 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' to={`/environment/student/discipline-select`}>
          Voltar
        </Link>
      </div>
    </div>
  )
}
