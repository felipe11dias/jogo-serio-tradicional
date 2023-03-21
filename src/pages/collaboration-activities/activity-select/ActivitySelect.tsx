import { useContext } from "react";
import { Button, Table } from "react-bootstrap";
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
      <h2 className="mb-5 w-100 text-center"> ACTIVITY SELECT </h2>
      
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Activity Name</th>
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
            <td><Button variant="primary" onClick={() => selectActivity('cf64e17b-af4f-4a8e-b9b1-28f3c1996aaf')}> SELECT </Button></td>
          </tr>
          <tr>
            <td>Computational Introduction</td>
            <td>Information Technology</td>
            <td>Felipe Dias</td>
            <td><Button variant="primary" onClick={() => selectActivity('66407ef8-87e9-4781-99d5-4d36d53753f7')}> SELECT </Button></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
