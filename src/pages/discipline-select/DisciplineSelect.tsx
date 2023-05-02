import { Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";
import { listDisciplines } from "../../service/rest/apis/disciplineRestApi";
import { Discipline } from "../../types/Discipline";


export default function DisciplineSelect() {
  const navigate = useNavigate();
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [searchDiscipline, setSearchDiscipline] = useState("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    findAllDisciplines()
  }, [page])

  const findAllDisciplines = async () => {
    console.log("findAllDisciplines")
    const params = getRequestParams(searchDiscipline, page);

    await listDisciplines(params).then( data => {
      console.log(data)
      setDisciplines(data.content)
      setCount(data.totalPages)
    }).catch( error => {
      toast.error('Error: ' + error?.message)
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

  const selectDiscipline = (disciplineSelected: number) => {
    saveGameSerius({gameSelected: gameSerius.gameSelected, activitySelected: gameSerius.activitySelected, disciplineSelected})
    navigate("/environment/student/activity-select", { replace: true });
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-4xl text-white font-bold text-center mb-10 "> SELECIONE UMA DISCIPLINA </h2>

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
      </div>
      
      <div className="relative overflow-x-auto rounded ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-teal-100 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Tema
              </th>
              <th scope="col" className="px-6 py-3">
                Professor
              </th>
              <th scope="col" className="px-6 py-3">
                Selecione
              </th>
            </tr>
          </thead>
          <tbody>
            {
              disciplines.length > 0 ? disciplines.map(discipline => (
                <tr key={discipline.id}>
                  <td>{discipline.name}</td>
                  <td>{discipline.theme}</td>
                  <td>{discipline.user}</td>
                  <td className="w-full my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
                    <button onClick={() => selectDiscipline(discipline?.id)}> Selecionar </button>
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
      <div className="mt-4 d-flex justify-content-center">
        <Link className='w-full my-5 py-2 px-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' to={`/environment/student/game-select`}>
          Voltar
        </Link>
      </div>
    </div>
  )
}
