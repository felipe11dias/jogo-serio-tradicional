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

    listActivitiesByDiscipline(gameSerius.disciplineSelected, params).then( data => {
      setActivities(data.content)
      setCount(data.totalPages)
    }).catch( error => {
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
    <div>
      <h2 className="text-4xl text-white font-bold text-center mb-10 "> SELECIONE UMA ATIVIDADE </h2>

      <div className="mb-5 d-flex justify-content-between "> 
        <div style={{ maxWidth: '500px'}}>
          <input
            type="text"
            placeholder="Buscar por nome"
            value={searchActivity}
            onChange={onChangeSearchActivity}
          />
          <button className="" onClick={findByActivity}>
            Buscar
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto rounded ">
        <table className="w-full text-sm text-left text-primary dark:text-textHintColor ">
          <thead className="text-xs text-primary uppercase bg-bgContainerTable dark:bg-primary dark:text-textHintColor ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Disciplina
              </th>
              <th scope="col" className="px-6 py-3">
                Professor
              </th>
              <th scope="col" className="px-6 py-3">
                Selecione
              </th>
            </tr>
          </thead>
          <tbody>
            {
              activities.length > 0 ? activities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.name}</td>
                  <td>{activity.discipline}</td>
                  <td>{activity.user}</td>
                  <td className="w-full my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"><button onClick={() => selectActivity(activity?.id)}> Selecionar </button></td>
                </tr>
              ))
              :
              <p> Nenhuma atividade cadastrada. </p>
            }
          </tbody>
        </table>

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
      <div className="mt-4 d-flex justify-content-center">
        <Link className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' to={`/environment/student/discipline-select`}>
          Voltar
        </Link>
      </div>
    </div>
  )
}
