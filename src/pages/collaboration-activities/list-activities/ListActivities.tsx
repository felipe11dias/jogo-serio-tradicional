import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/store";
import { listActivities } from "../../../service/rest/apis/activityRestApi";
import { Activity } from "../../../types/Activity";
import ModalDelete from "./components/ModalDelete";
import ModalViewQuestions from "./components/ModalViewQuestions";
import './style.css';

export default function ListActivities() {
  const user = useAppSelector(state => state.userState.user)
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    listActivities().then( data => {
      setActivities(data)
    }).catch( error => {
      return null
    })
  }, [])

  return (
    <>
      <h2 className="mb-5">Painel colaborativo</h2>

      <div className="mb-5 d-flex justify-content-between "> 
        <div style={{ maxWidth: '500px'}}>
          <input
            placeholder="Buscar por nome"
          />
          <button className="" >
            Buscar
          </button>
        </div>
        <Link className="btn btn-success mr-0 ml-auto" to={'/environment/teacher/collaboration-activities/create'} >Criar atividade</Link>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Disciplina</th>
              <th>Professor</th>
              <th>Questões</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              activities.length > 0 ? activities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.name}</td>
                  <td>{activity.discipline}</td>
                  <td>{activity.user}</td>
                  <td><ModalViewQuestions questions={activity.questions} /></td>
                  { activity.idUser === user?.id ? 
                    <>
                      <ModalDelete id={activity.id} />
                    </> : 
                    <></> }
                </tr>
              ))
              :
              <p> Nenhuma atividade cadastrada. </p>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}