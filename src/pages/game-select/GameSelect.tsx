import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../../animation/BackgroundAnimation";
import aimshotImg from '../../assets/aimshot.jpg';
import guitarQuestionsImg from '../../assets/guitar_question.jpg';
import responseSearchImg from '../../assets/response-search.jpg';
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";
import { useAppSelector } from "../../redux/store";
import { User } from "../../redux/types/User";
import { ROLES } from "../../router/router";
import { GAME_AIMSHOT_SEARCH, GAME_GUITAR_QUESTIONS, GAME_RESPONSE_SEARCH } from "../../util/constants";

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
    <main >
      <section className="grid grid-cols-2 items-start mx-auto relative overflow-hidden ">
        <div className="w-full py-2">
          <h2 className="text-textHintColor text-3xl font-semibold py-5 text-6xl		">Bem vindo {user?.role === ROLES[ROLES.STUDENT] ? 'estudante' : 'professor'} {user?.name}!</h2>
       
        </div>
      
        <div className="w-10 h-10">
          <BackgroundAnimation />
        </div>
      </section>
      <p className="text-textColorSecondary text-3xl font-semibold text-3xl">
        Jogue e estude. Selecione o jogo e se divirta estudando.
         Após selecionar o jogo você deve selecionar a disciplina e atividade que serão aplicadas durante a jogatina.
         Supere seus colegas e veja seu nome no topo do ranking.
      </p>
          
      <section className="mt-10">
        <h2 className="text-textColorThird font-bold text-5xl mb-10">Jogos:</h2>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="flex flex-col items-center justify-between bg-backgroundColorSecondary rounded-lg p-6">
              <h3 className='mb-5  text-textColorSecondary font-semibold rounded-lg text-xl'>Guitarra das questões</h3>
              <img className='w-80 h-80 object-cover rounded-lg' src={guitarQuestionsImg} alt="Image Guitar Questions" />
              <p className="text-textColorSecondary text-lg text-center">O jogo da velha lorem is pun e tc ete udhaiuwhd awhdo aihwodih aowi hdaw.</p>
              <button className="w-40 my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg" onClick={() => selectGame(GAME_GUITAR_QUESTIONS)}>Selecionar</button>
            </div>

            <div className="flex flex-col items-center justify-between bg-backgroundColorSecondary rounded-lg p-6">
              <h3 className='mb-5  text-textColorSecondary font-semibold rounded-lg text-xl'>Caça respostas</h3>
              <img className='w-80 h-80 object-cover rounded-lg' src={responseSearchImg} alt="Image Response Search" />
              <p className="text-textColorSecondary text-lg text-center">Semelhante ao caça palavras tradicional, mas você deve encontrar as respostas das questões contidas na tabela de letras. Selecione as respostas corretas no menor tempo e acertividade possivel.</p>
              <button className="w-40 my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg" onClick={() => selectGame(GAME_RESPONSE_SEARCH)}>Selecionar</button>
            </div>

            <div className="flex flex-col items-center justify-between bg-backgroundColorSecondary rounded-lg p-6">
              <h3 className='mb-5  text-textColorSecondary font-semibold rounded-lg text-xl'>Mirando respostas</h3>
                <img className='w-80 h-80 object-cover rounded-lg' src={aimshotImg} alt="Image Aimshot Response" />
                <p className="text-textColorSecondary text-lg text-center">Encontre as respostas corretas com uma única tentativa por questão. Selecione as respostas corretas no menor tempo e acertividade possivel.</p>
                <button className="w-40 my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg" onClick={() => selectGame(GAME_AIMSHOT_SEARCH)}>Selecionar</button>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
