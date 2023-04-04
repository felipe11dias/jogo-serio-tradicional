import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameSeriusContext, { GameSeriusType } from "../../context/GameContext/GameContext";
import BackgroundAnimation from "../../animation/BackgroundAnimation";
import loginImg from '../../assets/login.jpg'

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
          <h2 className="text-white font-bold text-6xl mb-10">Welcome to Game Project</h2>
          <p className="text-gray-400 text-3xl font-semibold">
            Project project student normal mastery by typescript with react
          </p>

        </div>
        <div className="w-10 h-10">
          <BackgroundAnimation />
        </div>
      </section>




      <section className="mt-10">
        <h2 className="text-white font-bold text-5xl mb-10">Games:</h2>






        {/*GridContainer*/}



        <div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
              <h3 className='mb-5 hover:text-white text-gray-400 font-semibold rounded-lg text-xl'>Jogo da velha</h3>
              <img className='w-full h-full object-cover rounded-lg' src={loginImg} alt="" />
              <p className="text-gray-800 text-lg text-center">Descrição do item aqui</p>
              <button className="w-40 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={() => selectGame('jogo_da_velha')}>Select</button>
            </div>

            <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
            <h3 className='mb-5 hover:text-white text-gray-400 font-semibold rounded-lg text-xl'>Response_select</h3>
              <img className='w-full h-full object-cover rounded-lg' src={loginImg} alt="" />
              <p className="text-gray-800 text-lg text-center">Descrição do item aqui</p>
              <button className="w-40 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={() => selectGame('response_select')}>Select</button>
            </div>

            <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
            <h3 className='mb-5 hover:text-white text-gray-400 font-semibold rounded-lg text-xl'>NULL</h3>
              <img className='w-full h-full object-cover rounded-lg' src={loginImg} alt="" />
              <p className="text-gray-800 text-lg text-center">Descrição do item aqui</p>
              <button className="w-40 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">Select</button>
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}
