import { Link } from "react-router-dom";
import BackgroundAnimation from "../../../animation/BackgroundAnimation";
import activityImg from '../../../assets/activities.jpg';
import disciplineImg from '../../../assets/disciplines.jpg';
import gamesImg from '../../../assets/games.jpg';

export default function HomeTeacher() {

  return (
    <>
      <main>
        <section className="grid grid-cols-2 items-start mx-auto relative overflow-hidden ">
          <div className="w-full">
            <h2 className="text-white font-bold text-6xl mb-10">Welcome teacher!</h2>
            <p className="text-gray-400 text-3xl font-semibold">
              Project teacher normal mastery by typescript with react
            </p>
          </div>
          <div className="w-10 h-10">
            <BackgroundAnimation />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-white font-bold text-5xl mb-10">Functionalities:</h2>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
                  <h3 className='mb-5 hover:text-white text-gray-400 font-semibold rounded-lg text-xl'>Disciplines</h3>
                  <img className='w-80 h-80 object-cover rounded-lg' src={disciplineImg} alt="Image Disciplines" />
                  <p className="text-gray-800 text-lg text-center">Descrição do item aqui</p>
                  <Link to={'/environment/teacher/collaboration-disciplines/list'} className="w-fit my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">GO</Link>
              </div>

              <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
                <h3 className='mb-5 hover:text-white text-gray-400 font-semibold rounded-lg text-xl'>Activities</h3>
                <img className='w-80 h-80 object-cover rounded-lg' src={activityImg} alt="Image Activities" />
                <p className="text-gray-800 text-lg text-center">Descrição do item aqui</p>
                <Link to={'/environment/teacher/collaboration-activities/list'} className="w-fit my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">GO</Link>
              </div>

              <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
                <h3 className='mb-5 hover:text-white text-gray-400 font-semibold rounded-lg text-xl'>Games</h3>
                  <img className='w-80 h-80 object-cover rounded-lg' src={gamesImg} alt="Image Games" />
                  <p className="text-gray-800 text-lg text-center">Descrição do item aqui</p>
                  <Link to={'/environment/student/game-select'} className="w-fit my-5 p-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">GO</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}