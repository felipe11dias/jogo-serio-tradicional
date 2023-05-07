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
    <>
      <h2 className="mb-5">Classificação</h2>

      <div className="mb-5 d-flex justify-content-between "> 
        <div style={{ maxWidth: '500px'}}>
          <input
            type="text"
            placeholder="Buscar por nome"
            value={searchRatings}
            onChange={onChangeSearchRatings}
          />
          <button className="" onClick={findByRanking}>
            Buscar por aluno
          </button>
        </div>
      </div>

      <div>
        <table align="center">
          <thead>
            <tr>
              <th>Jogo</th>
              <th>Jogador</th>
              <th>Atividade</th>
              <th>Qtd. respostas corretas</th>
              <th>Tempo de respostas</th>
              <th>Tempo total para respostas</th>
            </tr>
          </thead>
          <tbody>
            {
              ratings.length > 0 ?
              ratings.map(ranking => {
                return (
                  <>
                    <td>{ranking.game}</td>
                    <td>{ranking.user}</td>
                    <td>{ranking.activity}</td>
                    <td>{ranking.questionsHit}</td>
                    <td>{ranking.time}</td>
                    <td>{ranking.fulltime}</td>
                  </>
                )
              }) :
              <>
                <p> Nenhuma classifição disponível </p>
              </>
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
