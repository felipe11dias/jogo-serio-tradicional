import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { listRatings } from "../../service/rest/apis/rankingRestApi";
import { Ranking as Rank } from "../../types/Ranking";

export default function Ranking() {
  const [ratings, setRatings] = useState<Rank[]>([]);
  const [searchRatings, setSearchRatings] = useState("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    findAllRatings()
  }, [page])

  const findAllRatings = () => {
    const params = getRequestParams(searchRatings, page);

    listRatings(params).then( data => {
      setRatings(data.content)
      setCount(data.totalPages)
    }).catch( error => {
      return null
    })
  }

  const onChangeSearchRatings = (e: any) => {
    const searchRatings = e.target.value;
    setSearchRatings(searchRatings);
  };

  const getRequestParams = (searchRatings: string, page: number) => {
    let params: any = {};

    if (searchRatings) {
      params["user"] = searchRatings;
    }

    if (page) {
      params["page"] = page - 1;
    }

    return params;
  };

  const findByRanking = () => {
    setPage(1);
    findAllRatings();
  };

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  return (
    <div className="flex justify-center items-center flex-col">
     <h2 className="text-4xl text-textColorThird font-bold text-center mb-10">CLASSIFICAÇÃO</h2>

     <div className="w-full flex justify-center items-center flex-row m-2 ">
      <input
        className="w-96 px-1 py-2 rounded-lg "
        type="text"
        placeholder="Buscar por aluno"
        value={searchRatings}
        onChange={onChangeSearchRatings}
      />
      <div>
        <button className="text-center w-full m-2 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg " onClick={findByRanking}>
          Buscar
        </button>
      </div>
    </div>

    <div className="w-full">
      <table className="border-2 border-solid border-textColorThird w-full text-sm text-center text-primary dark:text-textHintColor ">
        <thead className="text-xs text-primary uppercase bg-bgTableHeaderColor dark:bg-primary dark:text-textHintColor ">
          <tr>
            <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Jogo/Jogador</th>
            <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Disciplina/Atividade</th>
            <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Qtd. respostas corretas</th>
            <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Tempo de respostas</th>
            <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Tempo total para respostas</th>
          </tr>
        </thead>
        <tbody>
          {
            ratings.length > 0 ?
            ratings.map(ranking => {
              return (
                <tr className="text-textColorSecondary">
                  <td className="border-2 border-solid border-textColorThird px-4 py-2">{ranking.game}/{ranking.user}</td>
                  <td className="border-2 border-solid border-textColorThird px-4 py-2">{ranking.discipline}/{ranking.activity}</td>
                  <td className="border-2 border-solid border-textColorThird px-4 py-2">{ranking.questionsHit}/{ranking.questions}</td>
                  <td className="border-2 border-solid border-textColorThird px-4 py-2">{ranking.time}</td>
                  <td className="border-2 border-solid border-textColorThird px-4 py-2">{ranking.fulltime}</td>
                </tr>
              )
            }) :
            <></>
          }
        </tbody>
      </table>

      {
        ratings.length === 0 ?
        <div className="text-textColorThird border-2 border-solid border-textColorThird flex justify-center items-center text-center w-full">
          Nenhuma classificação cadastrada.
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
  </div>
  )
}
