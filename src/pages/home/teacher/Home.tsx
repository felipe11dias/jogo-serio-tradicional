import { Link } from "react-router-dom";
import BackgroundAnimation from "../../../animation/BackgroundAnimation";
import activityImg from '../../../assets/activities.jpg';
import disciplineImg from '../../../assets/disciplines.jpg';
import gamesImg from '../../../assets/games.jpg';
import { useAppSelector } from "../../../redux/store";
import { User } from "../../../redux/types/User";

export default function HomeTeacher() {
  const user: User | null = useAppSelector(state => state.userState.user)

  return (
    <>
      <main>
        <section className="grid grid-cols-2 items-start mx-auto relative overflow-hidden ">
          <div className="w-full">
            <h2 className="text-textColorThird font-bold text-6xl mb-10">Bem vindo professor {user?.name}!</h2>
         
          </div>
          <div className="w-10 h-10">
            <BackgroundAnimation />
          </div>
        </section>

        <p className="text-textColorSecondary text-3xl font-semibold">
              Crie disciplinas e atividades para os jogos do sistema. Primeiro crie sua disciplina, depois associe a
               disciplina criada a uma nova atividade ou a uma atividade já existente. Sua nova disciplina e atividade ficam a disposição para serem aplicadas durante os jogos.
            </p>
            
        <section className="mt-10">
          <h2 className="text-textColorThird font-bold text-5xl mb-10">Funcionalidades:</h2>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
                  <h3 className='mb-5 hover:text-textColorPrimary text-textColorSecondary font-semibold rounded-lg text-xl'>Disciplinas</h3>
                  <img className='w-80 h-80 object-cover rounded-lg' src={disciplineImg} alt="Image Disciplines" />
                  <p className="text-textColorSecondary text-lg text-center">Crie, edite ou remova suas disciplinas e visualize todas as disciplinas contida no ambiente colaborativo.</p>
                  <Link to={'/environment/teacher/collaboration-disciplines/list'} className="w-fit my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg">Acessar</Link>
              </div>

              <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
                <h3 className='mb-5 hover:text-textColorPrimary text-textColorSecondary font-semibold rounded-lg text-xl'>Atividades</h3>
                <img className='w-80 h-80 object-cover rounded-lg' src={activityImg} alt="Image Activities" />
                <p className="text-textColorSecondary text-lg text-center">Crie, edite ou remova suas atividades e visualize todas as atividades contida no ambiente colaborativo.</p>
                <Link to={'/environment/teacher/collaboration-activities/list'} className="w-fit my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg">Acessar</Link>
              </div>

              <div className="flex flex-col items-center justify-center bg-backgroundColorSecondary rounded-lg p-6">
                <h3 className='mb-5 hover:text-textColorPrimary text-textColorSecondary font-semibold rounded-lg text-xl'>Jogos</h3>
                  <img className='w-80 h-80 object-cover rounded-lg' src={gamesImg} alt="Image Games" />
                  <p className="text-textColorSecondary text-lg text-center">Jogue jogos e tenha a experiência de aprendizado dos estudantes no ambiente colaborativo.</p>
                  <Link to={'/environment/student/game-select'} className="w-fit my-5 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg">Acessar</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}