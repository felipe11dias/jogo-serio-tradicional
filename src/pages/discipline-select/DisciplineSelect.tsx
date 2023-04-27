import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";
import { listDisciplines } from "../../service/rest/apis/disciplineRestApi";
import { Discipline } from "../../types/Discipline";


export default function DisciplineSelect() {
  const navigate = useNavigate();
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  
  useEffect(() => {
    listDisciplines().then( data => {
      console.log(data)
      setDisciplines(data)
    }).catch( error => {
      toast.error('Error: ' + error?.message)
      return null
    })
  }, [])

  const selectDiscipline = (disciplineSelected: number) => {
    saveGameSerius({gameSelected: gameSerius.gameSelected, activitySelected: gameSerius.activitySelected, disciplineSelected})
    navigate("/environment/student/activity-select", { replace: true });
  }

  return (
    <div>
      <h2 className="text-4xl text-white font-bold text-center mb-10 "> DISCIPLINE SELECT </h2>
      
      <div className="relative overflow-x-auto rounded ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-teal-100 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Theme
              </th>
              <th scope="col" className="px-6 py-3">
                Teacher
              </th>
              <th scope="col" className="px-6 py-3">
                SELECTION
              </th>
            </tr>
          </thead>
          <tbody>
            {
              disciplines.length > 0 ? disciplines.map(discipline => (
                <tr key={discipline.id}>
                  <td>{discipline.name}</td>
                  <td>{discipline.theme}</td>
                  <td>{discipline.user}</td>
                  <td className="w-full my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
                    <button onClick={() => selectDiscipline(discipline?.id)}> SELECT </button>
                  </td>
                </tr>
              ))
              :
              <p> List empty </p>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
