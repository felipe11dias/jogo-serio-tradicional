import { useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";


export default function DisciplineSelect() {
  const navigate = useNavigate();
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  const selectDiscipline = (disciplineSelected: string) => {
    saveGameSerius({gameSelected: gameSerius.gameSelected, activitySelected: gameSerius.activitySelected, disciplineSelected})
    navigate("/environment/student/activity-select", { replace: true });
  }

  return (
    <div>
      <h2 className="mb-5 text-center"> DISCIPLINE SELECT </h2>
     

    <div className="flex justify-center w-full">
    <table className="table-auto">
      <thead>
        <tr>
        <th className="px-4 py-2">Discipline Name</th>
          <th className="px-4 py-2">Theme Name</th>
          <th className="px-4 py-2">Teacher</th>
          <th className="px-4 py-2">SELECTION</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">Programming Logic</td>
          <td className="border px-4 py-2">Information Technology</td>
          <td className="border px-4 py-2">Felipe Dias</td>
          <td className="border bg-blue-800 text-center text-white px-2 py-2 transition"><button  onClick={() => selectDiscipline('logica_programacao')}> SELECT </button></td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Computational Introduction</td>
          <td className="border px-4 py-2">Information Technology</td>
          <td className="border px-4 py-2">Felipe Dias</td>
          <td className="border bg-blue-800 text-center text-white px-2 py-2 transition"><button  onClick={() => selectDiscipline('introducao_computacional')}> SELECT </button></td>
        </tr>
      </tbody>
    </table>
    </div>
   

    </div>
  )
}
