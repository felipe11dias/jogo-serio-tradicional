import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameSeriusContext, { GameSeriusType } from "../../../context/GameContext/GameContext";


export default function ActivitySelect() {
  const navigate = useNavigate();
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  const selectActivity = (activitySelected: string) => {
    saveGameSerius({gameSelected: gameSerius.gameSelected, activitySelected, disciplineSelected: gameSerius.disciplineSelected})
    navigate("/environment/student/gameplay", { replace: true });
  }

  return ( 

<div>
<h2 className="text-4xl text-textColorPrimary font-bold text-center mb-10 "> ACTIVITY SELECT </h2>

<div className="relative overflow-x-auto rounded ">
<table className="w-full text-sm text-left text-primary dark:text-textHintColor ">
  <thead className="text-xs text-primary uppercase bg-bgContainerTable dark:bg-primary dark:text-textHintColor ">
      <tr>
          <th scope="col" className="px-6 py-3">
          Activity Name
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
          <td className="w-full my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg"><button  onClick={() => selectActivity('cf64e17b-af4f-4a8e-b9b1-28f3c1996aaf')}> SELECT </button></td>
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
          <td className="w-full my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg"><button  onClick={() => selectActivity('66407ef8-87e9-4781-99d5-4d36d53753f7')}> SELECT </button></td>
          </td>
      </tr> 
  </tbody>
</table>
</div>
 
</div>
  )
}
