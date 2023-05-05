import { Pagination } from "@mui/material";

export default function Ranking() {
  return (
    <>
      <h2 className="mb-5">Classificação</h2>

      <div className="mb-5 d-flex justify-content-between "> 
        <div style={{ maxWidth: '500px'}}>
          <input
            type="text"
            placeholder="Buscar por nome do aluno"
          />
          <button className="" >
            Buscar por nome do aluno
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
            
          </tbody>
        </table>

        <Pagination
          color="primary"
          className="my-3"
          count={0}
          page={0}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
        />

      </div>
    </>
  )
}
