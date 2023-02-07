import { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";


export default function DisciplineSelect() {
  const navigate = useNavigate();
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  const selectDiscipline = (disciplineSelected: string) => {
    saveGameSerius({gameSelected: gameSerius.gameSelected, disciplineSelected})
    navigate("/environment/gameplay", { replace: true });
  }

  return (
    <div>
      <h2 className="mb-5 w-100 text-center"> DISCIPLINE SELECT </h2>
      
      <Table striped bordered hover variant="dark">
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
            <td><Button variant="primary" onClick={() => selectDiscipline('logica_programacao')}> SELECT </Button></td>
          </tr>
          <tr>
            <td>Computational Introduction</td>
            <td>Information Technology</td>
            <td>Felipe Dias</td>
            <td><Button variant="primary" onClick={() => selectDiscipline('introducao_computacional')}> SELECT </Button></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
