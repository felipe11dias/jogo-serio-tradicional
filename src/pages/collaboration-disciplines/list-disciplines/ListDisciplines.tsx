import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/store";
import { listDisciplines } from "../../../service/rest/apis/disciplineRestApi";
import { Discipline } from "../../../types/Discipline";
import ModalDelete from "./components/ModalDelete";
import ModalEdit from "./components/ModalEdit";

export default function ListDisciplines() {
  const user = useAppSelector(state => state.userState.user)
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  
  useEffect(() => {
    listDisciplines().then( data => {
      setDisciplines(data)
    }).catch( error => {
      toast.error('Error: ' + error?.message)
      return null
    })
  }, [])

  return (
    <>
      <h2 className="mb-5">Collaborate dashboard</h2>

      <div className="mb-5 d-flex justify-content-between "> 
        <div style={{ maxWidth: '500px'}}>
          <input
            placeholder="Buscar por nome"
          />
          <button className="" >
            Buscar
          </button>
        </div>
        <Link className="btn btn-success mr-0 ml-auto" to={'/environment/teacher/collaboration-disciplines/create'} >Criar disciplina</Link>
      </div>

      <div>
        <table align="center">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tema</th>
              <th>Professor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              disciplines.length > 0 ? disciplines.map(discipline => (
                <tr key={discipline.id}>
                  <td>{discipline.name}</td>
                  <td>{discipline.theme}</td>
                  <td>{discipline.user}</td>
                  <td>
                    { discipline.idUser === user?.id ? 
                    <>
                      <ModalEdit id={discipline.id} />
                      <ModalDelete id={discipline.id} />
                    </> : 
                    <></> }
                  </td>
                </tr>
              ))
              :
              <p> Nenhuma disciplina cadastrada. </p>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}