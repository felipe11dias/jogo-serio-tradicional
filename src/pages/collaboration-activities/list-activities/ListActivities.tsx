import { Pagination } from "@mui/material";
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
  const [searchActivity, setSearchActivity] = useState("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    findAllActivities()
  }, [page])

  const findAllActivities = () => {
    const params = getRequestParams(searchActivity, page);

    listActivities(params).then( data => {
      setActivities(data.content)
      setCount(data.totalPages)
    }).catch( error => {
      return null
    })
  }

  const onChangeSearchActivity = (e: any) => {
    const searchActivity = e.target.value;
    setSearchActivity(searchActivity);
  };

  const getRequestParams = (searchActivity: string, page: number) => {
    let params: any = {};

    if (searchActivity) {
      params["activity"] = searchActivity;
    }

    if (page) {
      params["page"] = page - 1;
    }

    return params;
  };

  const findByActivity = () => {
    setPage(1);
    findAllActivities();
  };

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <>
      <h2 className="mb-5">Painel colaborativo</h2>

      <div className="mb-5 d-flex justify-content-between "> 
        <div style={{ maxWidth: '500px'}}>
          <input
            type="text"
            placeholder="Buscar por nome"
            value={searchActivity}
            onChange={onChangeSearchActivity}
          />
          <button className="" onClick={findByActivity}>
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
                      <Link to={`/environment/teacher/collaboration-activities/edit/${activity.id}`}>Editar</Link>
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

        <Pagination
          color="primary"
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          onChange={handlePageChange}
        />
      </div>
    </>
  )
}