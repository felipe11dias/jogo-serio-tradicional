import { Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    const params = getRequestParams(searchDiscipline, page);

    await listDisciplines(params).then(data => {
      setDisciplines(data.content)
      setCount(data.totalPages)
    }).catch(error => {
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
    saveGameSerius({ gameSelected: gameSerius.gameSelected, activitySelected: gameSerius.activitySelected, disciplineSelected })
    navigate("/environment/student/activity-select", { replace: true });
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-4xl text-textColorThird font-bold text-center mb-10 "> SELECIONE UMA DISCIPLINA </h2>
     
     <div className="w-full flex justify-center items-center flex-row m-2 ">
      <input
            className="w-full px-1 py-2 rounded-lg "
            type="text"
            placeholder="Buscar por nome"
            value={searchDiscipline}
            onChange={onChangeSearchDiscipline}
          /> 
      <div >
         <button className="text-center w-full m-2 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg " onClick={findByDiscipline}>
            Buscar
          </button> 
      </div>

      </div>
      <div className="w-full">
        <table className="w-full text-sm text-center text-primary dark:text-textHintColor ">
          <thead className="text-xs text-primary uppercase bg-bgTableHeaderColor dark:bg-primary dark:text-textHintColor ">
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
                  <td className="px-4 py-2">{discipline.name}</td>
                  <td className="px-4 py-2">{discipline.theme}</td>
                  <td className="px-4 py-2">{discipline.user}</td>
                  <td className="text-center my-5 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg ">
                    <button onClick={() => selectDiscipline(discipline?.id)}> Selecionar </button>
                  </td>
                </tr>
              ))
                :
                <div className="  flex justify-center items-center text-center w-full">
                  Nenhuma disciplina cadastrada. 
                </div>
            }
          </tbody>
        </table>
        <div className="flex justify-center items-center text-center w-full">
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
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <Link className='text-center w-full my-5 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg ' to={`/environment/student/game-select`}>
          Voltar
        </Link>
      </div>
    </div>
  )
}
