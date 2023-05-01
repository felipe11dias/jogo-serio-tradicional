import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GameSeriusContext, { GameSeriusType } from "../../../context/GameContext/GameContext";
import { listActivitiesByDiscipline } from "../../../service/rest/apis/activityRestApi";
import { Activity } from "../../../types/Activity";


export default function ActivitySelect() {
  const navigate = useNavigate();
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    listActivitiesByDiscipline(gameSerius.disciplineSelected).then( data => {
      setActivities(data)
    }).catch( error => {
      toast.error('Error: ' + error?.message)
      return null
    })
  }, [])

  const selectActivity = (activitySelected: number) => {
    saveGameSerius({ gameSelected: gameSerius.gameSelected, activitySelected, disciplineSelected: gameSerius.disciplineSelected })
    navigate("/environment/student/gameplay", { replace: true });
  }

  return (
    <div>
      <h2 className="text-4xl text-white font-bold text-center mb-10 "> SELECIONE UMA ATIVIDADE </h2>

      <div className="relative overflow-x-auto rounded ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-teal-100 dark:bg-gray-700 dark:text-gray-400 ">
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
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <Link className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' to={`/environment/student/discipline-select`}>
          Voltar
        </Link>
      </div>
    </div>
  )
}
