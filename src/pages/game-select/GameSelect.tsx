import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../../animation/BackgroundAnimation";
import aimshotImg from '../../assets/aimshot.jpg';
import responseSearchImg from '../../assets/response-search.jpg';
import ticTacToyImg from '../../assets/tic-tac-toy.jpg';
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";
import { useAppSelector } from "../../redux/store";
import { User } from "../../redux/types/User";
import { ROLES } from "../../router/router";
import { GAME_AIMSHOT_SEARCH, GAME_RESPONSE_SEARCH } from "../../util/constants";

export default function GameSelect() {
  const user: User | null = useAppSelector(state => state.userState.user)

  const navigate = useNavigate();
  
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  useEffect(() => {
    saveGameSerius({ gameSelected: '', activitySelected: gameSerius.activitySelected, disciplineSelected: gameSerius.disciplineSelected })
  }, [])

  const selectGame = (gameSelected: string) => {
    saveGameSerius({ gameSelected, activitySelected: gameSerius.activitySelected, disciplineSelected: gameSerius.disciplineSelected })
    navigate("/environment/student/discipline-select", { replace: true });
  }

  return (
    <main>
      <section className="grid grid-cols-2 items-start mx-auto relative overflow-hidden ">
        <div className="w-full">
          <h2 className="text-white font-bold text-6xl mb-10">Bem vindo {user?.role === ROLES[ROLES.STUDENT] ? 'estudante' : 'professor'} {user?.name}!</h2>
          <p className="text-gray-400 text-3xl font-semibold">
            Jogue e estude. Selecione o jogo e se divirta estudando.
             Após selecionar o jogo você deve selecionar a disciplina e atividade que serão aplicadas durante a jogatina.
             Supere seus colegas e veja seu nome no topo do ranking.
          </p>
        </div>
        <div className="w-10 h-10">
          <BackgroundAnimation />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-white font-bold text-5xl mb-10">Jogos:</h2>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
                <h3 className='mb-5 hover:text-white text-gray-400 font-semibold rounded-lg text-xl'>Jogo da Velha</h3>
                <img className='w-80 h-80 object-cover rounded-lg' src={ticTacToyImg} alt="Image Tic Tac Toy" />
                <p className="text-white text-lg text-center">Descrição do item aqui</p>
                <button className="w-40 my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={() => selectGame('jogo_da_velha')}>Selecionar</button>
            </div>

            <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
              <h3 className='mb-5 hover:text-white text-gray-400 font-semibold rounded-lg text-xl'>Caça respostas</h3>
              <img className='w-80 h-80 object-cover rounded-lg' src={responseSearchImg} alt="Image Response Search" />
              <p className="text-white text-lg text-center">Semelhante ao caça palavras tradicional, mas você deve encontrar as respostas das questões contidas na tabela de letras. Selecione as respostas corretas no menor tempo e acertividade possivel.</p>
              <button className="w-40 my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={() => selectGame(GAME_RESPONSE_SEARCH)}>Selecionar</button>
            </div>

            <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
              <h3 className='mb-5 hover:text-white text-gray-400 font-semibold rounded-lg text-xl'>Mirando respostas</h3>
                <img className='w-80 h-80 object-cover rounded-lg' src={aimshotImg} alt="Image Aimshot Response" />
                <p className="text-white text-lg text-center">Encontre as respostas corretas com uma única tentativa por questão. Selecione as respostas corretas no menor tempo e acertividade possivel.</p>
                <button className="w-40 my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={() => selectGame(GAME_AIMSHOT_SEARCH)}>Selecionar</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
