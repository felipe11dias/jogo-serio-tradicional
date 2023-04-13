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
      <h2 className="text-4xl text-white font-bold text-center mb-10 "> DISCIPLINE SELECT </h2>
      
    <div className="relative overflow-x-auto rounded ">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-teal-100 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Discipline Name
                </th>
                <th scope="col" className="px-6 py-3">
                Theme Name
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Programming Logic	
                </th>
                <td className="px-6 py-4">
                Information Technology	
                </td>
                <td className="px-6 py-4">
                Felipe Dias	
                </td>
                <td className="px-6 py-4">
                <td className="w-full my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"><button  onClick={() => selectDiscipline('logica_programacao')}> SELECT </button></td>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Computational Introduction	
                </th>
                <td className="px-6 py-4">
                Information Technology	
                </td>
                <td className="px-6 py-4">
                Felipe Dias	
                </td>
                <td className="px-6 py-4">
                <td className="w-full my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"><button  onClick={() => selectDiscipline('introducao_computacional')}> SELECT </button></td>
                </td>
            </tr> 
        </tbody>
    </table>
</div>



    </div>
    
  )
}
