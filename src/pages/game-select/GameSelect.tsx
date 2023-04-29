import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundAnimation from "../../animation/BackgroundAnimation";
import aimshotImg from '../../assets/aimshot.jpg';
import responseSearchImg from '../../assets/response-search.jpg';
import ticTacToyImg from '../../assets/tic-tac-toy.jpg';
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";

export default function GameSelect() {
  const navigate = useNavigate();
  
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;

  useEffect(() => {
    saveGameSerius({ gameSelected: '', activitySelected: '', disciplineSelected: '' })
  }, [])

  const selectGame = (gameSelected: string) => {
    saveGameSerius({ gameSelected, activitySelected: gameSerius.activitySelected, disciplineSelected: gameSerius.disciplineSelected })
    navigate("/environment/student/discipline-select", { replace: true });
  }

  return (
    <main>
      <section className="grid grid-cols-2 items-start mx-auto relative overflow-hidden ">
        <div className="w-full">
          <h2 className="text-textColorPrimary font-bold text-6xl mb-10">Seja Bem-vindo!</h2>
          <p className="text-textHintColor text-3xl font-semibold">
           Projetos descrição
          </p>
        </div>
        <div className="w-10 h-10">
          <BackgroundAnimation />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-textColorPrimary font-bold text-5xl mb-10">Jogos:</h2>

        {/*GridContainer*/}

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
                <h3 className='mb-5 hover:text-textColorPrimary text-textHintColor font-semibold rounded-lg text-xl'>Jogo da Velha</h3>
                <img className='w-80 h-80 object-cover rounded-lg' src={ticTacToyImg} alt="Image Tic Tac Toy" />
                <p className="text-textColorPrimary text-lg text-center">Descrição do item aqui</p>
                <button className="w-40 my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg" onClick={() => selectGame('jogo_da_velha')}>Selecionar</button>
            </div>

            <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
              <h3 className='mb-5 hover:text-textColorPrimary text-textHintColor font-semibold rounded-lg text-xl'>Response Search</h3>
              <img className='w-80 h-80 object-cover rounded-lg' src={responseSearchImg} alt="Image Response Search" />
              <p className="text-textColorPrimary text-lg text-center">Descrição do item aqui</p>
              <button className="w-40 my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg" onClick={() => selectGame('response_select')}>Selecionar</button>
            </div>

            <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
              <h3 className='mb-5 hover:text-textColorPrimary text-textHintColor font-semibold rounded-lg text-xl'>Aimshot Response</h3>
                <img className='w-80 h-80 object-cover rounded-lg' src={aimshotImg} alt="Image Aimshot Response" />
                <p className="text-textColorPrimary text-lg text-center">Descrição do item aqui</p>
                <button className="w-40 my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg" onClick={() => selectGame('aimshot_response')}>Selecionar</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
