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

    listDisciplines(params).then(data => {
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

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-4xl text-textColorThird font-bold text-center mb-10">DISCIPLINAS</h2>

        <div className="w-full flex justify-around flex-row m-2 ">
          <div className="flex">
            <input
              className="h-fit w-96 px-1 my-2 py-2 rounded-lg "
              type="text"
              placeholder="Buscar por nome"
              value={searchDiscipline}
              onChange={onChangeSearchDiscipline}
            />
            <div>
              <button className="h-fit w-fit text-center m-2 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg " onClick={findByDiscipline}>
                Buscar
              </button>
            </div>
          </div>
          <Link className="h-fit text-center w-38 ml-auto mr-0 my-2 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg" to={'/environment/teacher/collaboration-disciplines/create'} >Criar disciplina</Link>
        </div>

        <div className="w-full">
          <table className="border-2 border-solid border-textColorThird w-full text-sm text-center text-primary dark:text-textHintColor ">
            <thead className="text-xs text-primary uppercase bg-bgTableHeaderColor dark:bg-primary dark:text-textHintColor ">
              <tr>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Nome</th>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Tema</th>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Professor</th>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                disciplines.length > 0 ? disciplines.map((discipline, index) => (
                  <tr className="text-textColorSecondary" key={discipline.id}>
                    <td className="border-2 border-solid border-textColorThird px-4 py-2">{discipline.name}</td>
                    <td className="border-2 border-solid border-textColorThird px-4 py-2">{discipline.theme}</td>
                    <td className="border-2 border-solid border-textColorThird px-4 py-2">{discipline.user}</td>
                    <td className="flex justify-center px-4 py-2" style={(index + 1) < disciplines.length ? { borderBottom: '2px solid rgb(51 73 241 / var(--tw-border-opacity))' } : {} }>
                      {discipline.idUser === user?.id ?
                        <>
                          <ModalEdit id={discipline.id} name={discipline.name} theme={discipline.theme} findAllDisciplines={findAllDisciplines} />
                          <ModalDelete id={discipline.id} findAllDisciplines={findAllDisciplines} />
                        </> :
                        <>Nenhuma ação disponível</>
                      }
                    </td>
                  </tr>
                ))
                  :
                <></>
              }
            </tbody>
          </table>

          {
            disciplines.length === 0 ?
            <div className="text-textColorThird border-2 border-solid border-textColorThird flex justify-center items-center text-center w-full">
              Nenhuma disciplina cadastrada.
            </div> :
            <></>
          }

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

        <div className="mt-6 flex justify-center">
          <Link className='text-center w-full my-5 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' to={`/environment/teacher/home`}>
            Voltar
          </Link>
        </div>
      </div>
    </>
  )
}