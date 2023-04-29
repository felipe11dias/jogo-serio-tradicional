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
      <h2 className="text-4xl text-textColorPrimary font-bold text-center mb-10 "> DISCIPLINE SELECT </h2>
      
    <div className="relative overflow-x-auto rounded ">
    <table className="w-full text-sm text-left text-primary dark:text-textHintColor ">
        <thead className="text-xs text-primary uppercase bg-bgContainerTable dark:bg-primary dark:text-textHintColor ">
            <tr>
                <th scope="col" className="px-6 py-3">
                Nome da disciplina
                </th>
                <th scope="col" className="px-6 py-3">
                Nome do Tema
                </th>
                <th scope="col" className="px-6 py-3">
                Professor
                </th>
                <th scope="col" className="px-6 py-3">
                SELEÇÃO
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-textColorPrimary border-b dark:bg-primary dark:border-primary">
                <th scope="row" className="px-6 py-4 font-medium text-primary whitespace-nowrap dark:textColorPrimary">
                Programming Logic	
                </th>
                <td className="px-6 py-4">
                Information Technology	
                </td>
                <td className="px-6 py-4">
                Felipe Dias	
                </td>
                <td className="px-6 py-4">
                <td className="w-full my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg"><button  onClick={() => selectDiscipline('logica_programacao')}> Selecionar </button></td>
                </td>
            </tr>
            <tr className="bg-textColorPrimary border-b dark:bg-primary dark:border-primary">
                <th scope="row" className="px-6 py-4 font-medium text-primary whitespace-nowrap dark:textColorPrimary">
                Computational Introduction	
                </th>
                <td className="px-6 py-4">
                Information Technology	
                </td>
                <td className="px-6 py-4">
                Felipe Dias	
                </td>
                <td className="px-6 py-4">
                <td className="w-full my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40  text-textColorPrimary font-semibold rounded-lg"><button  onClick={() => selectDiscipline('introducao_computacional')}> Selecionar </button></td>
                </td>
            </tr> 
            
        </tbody>
    </table>
</div>
    </div>
    
  )
}
