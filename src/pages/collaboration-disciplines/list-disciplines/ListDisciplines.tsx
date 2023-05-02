import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/store";
import { listDisciplines } from "../../../service/rest/apis/disciplineRestApi";
import { Discipline } from "../../../types/Discipline";
import ModalDelete from "./components/ModalDelete";
import ModalEdit from "./components/ModalEdit";

export default function ListDisciplines() {
  const user = useAppSelector(state => state.userState.user)
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [searchDiscipline, setSearchDiscipline] = useState("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    findAllDisciplines()
  }, [page])

  const findAllDisciplines = () => {
    const params = getRequestParams(searchDiscipline, page);

    listDisciplines(params).then( data => {
      setDisciplines(data.content)
      setCount(data.totalPages)
    }).catch( error => {
      return null
    })
  }

  const onChangeSearchDiscipline = (e: any) => {
    const searchDiscipline = e.target.value;
    setSearchDiscipline(searchDiscipline);
  };

  const getRequestParams = (searchDiscipline: string, page: number) => {
    let params: any = {};

    if (searchDiscipline) {
      params["discipline"] = searchDiscipline;
    }

    if (page) {
      params["page"] = page - 1;
    }

    return params;
  };

  const findByDiscipline = () => {
    setPage(1);
    findAllDisciplines();
  };

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <>
      <h2 className="mb-5">Collaborate dashboard</h2>

      <div className="mb-5 d-flex justify-content-between "> 
        <div style={{ maxWidth: '500px'}}>
          <input
            type="text"
            placeholder="Buscar por nome"
            value={searchDiscipline}
            onChange={onChangeSearchDiscipline}
          />
          <button className="" onClick={findByDiscipline}>
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