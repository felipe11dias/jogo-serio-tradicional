import { useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";


export default function DisciplineSelect() {
  const navigate = useNavigate();
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  const selectDiscipline = (disciplineSelected: string) => {
    saveGameSerius({gameSelected: gameSerius.gameSelected, disciplineSelected})
    navigate("/environment/student/gameplay", { replace: true });
  }

  return (
    <div>
      <h2 className="mb-5 w-100 text-center"> DISCIPLINE SELECT </h2>
      
      <div  >
        <thead>
          <tr>
            <th>Discipline Name</th>
            <th>Theme Name</th>
            <th>Teacher</th>
            <th> SELECTION </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Programming Logic</td>
            <td>Information Technology</td>
            <td>Felipe Dias</td>
            <td><button  onClick={() => selectDiscipline('logica_programacao')}> SELECT </button></td>
          </tr>
          <tr>
            <td>Computational Introduction</td>
            <td>Information Technology</td>
            <td>Felipe Dias</td>
            <td><button  onClick={() => selectDiscipline('introducao_computacional')}> SELECT </button></td>
          </tr>
        </tbody>
      </div>
    </div>
  )
}
