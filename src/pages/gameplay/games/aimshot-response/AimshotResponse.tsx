import React, { useContext, useEffect, useState } from "react";
import Countdown from "react-countdown";
import GameSeriusContext, { GameSeriusType } from "../../../../context/GameContext/GameContext";
import { useAppSelector } from "../../../../redux/store";
import { User } from "../../../../redux/types/User";
import { getActivity } from "../../../../service/rest/apis/activityRestApi";
import { IEditActivityInputs } from "../../../collaboration-activities/edit-activities/EditActivities";
import ModalResult, { ResultProps } from "../../components/ModalResult";
import './style.css';

export default function AimshotResponse() {
  const user: User | null = useAppSelector(state => state.userState.user)

  const ref = React.useRef(null);
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;
  const colors = ['#1abc9c', '#4efc53', '#3498db', '#9b59b6', '#ff3f34', '#f1c40f', '#f57e33', '#48dbfb']
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [time, setTime] = useState<number | null>(0);
  const [score, setScore] = useState<number>(0);
  const [activity, setActivity] = useState<IEditActivityInputs>();
  const [result, setResult] = useState<ResultProps>({ idUser: user?.id || -1, idActivity: -1, time: '', fullTime: '', game: 'Mirando respostas', questions: [], open: true, answers: [], descriptions: [] });

  useEffect(() => {
    getActivity(gameSerius.activitySelected.toString()).then( data => {
      setActivity(data)
      setResult({
        ...result,
        questions: data.questions,
        idActivity: data.id
      })
    }).catch( error => {
      return null
    })
  }, [])

  const ScoreFinishGame = () => (
    <>
      <ModalResult game={result.game} idUser={result.idUser} idActivity={result.idActivity} time={result.time} fullTime={result.fullTime} questions={result.questions} open={result.open} answers={result.answers} descriptions={result.descriptions}  />
      <h1>Fim de jogo!</h1>;
    </>
  )

  const renderer = ({ minutes, seconds, completed }: { minutes: number, seconds: number, completed: boolean }) => {
    if (completed) {
      finishGame()
      return <ScoreFinishGame />;
    } else {
      return(
        <div className='mt-2 p-2 w-full flex justify-center'>
          <h1 className='text-2xl'>{(time !== null) ? <>Tempo restante:</> : <></>} {minutes}:{seconds}</h1>
        </div>
      )
    }
  };

  function msToTimeString(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
  
    return mins + ':' + secs;
  }

  function initStartGame(timeVar: number) {
    result.fullTime = msToTimeString(timeVar)
    setResult(result)
    setTime(timeVar)

    const boardGame = document.getElementById('board-game');
    if (boardGame) {
      // 👇 Will scroll smoothly to the top of the next section
      boardGame.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function finishGame() {
    result.time = msToTimeString(time || 0)
    const answers = document.getElementsByClassName('answer')
    Array.from(answers).forEach(answer => {
      answer.remove();
    })

    const board = document.getElementById('board')
    board?.remove();

    // Preenche as questão não marcadas a tempo com um valor incorreto.
    if(result.questions.length > result.answers.length) {
      for(var i = 0; i < (result.questions.length - result.answers.length); i++) {
        result.answers.push(-1)
      }
    }
    setResult(result)
    setTime(null)
  }

  function checkAnswer(id: number) {
    result.answers.push(id)
    setResult(result)
    const answers = document.getElementsByClassName('answer')
    Array.from(answers).forEach(answer => {
      answer.remove();
    })

    if(activity?.questions[questionIndex].idAnswerCorrect || -1 === id) {
      setScore(score + 1)
    }

    if(activity?.questions.length === (questionIndex + 1)) {
      finishGame()
    }else {
      setQuestionIndex(questionIndex + 1)
    }
  }

  function generateAnswerRandom(id: number, description: string) {
    const board = document.getElementById('board')
    const answer = document.createElement('span')
    answer.innerHTML = description;
    answer.style.width = `fit-content`
    answer.style.height = `fit-content`
    
    console.log('description: ', description)
    const boardSize = board?.getBoundingClientRect() || new DOMRect()
    const answerSize = answer?.getBoundingClientRect() || new DOMRect()
    const x = getRandomNumber(0, boardSize.width - answerSize.width)
    const y = getRandomNumber(0, boardSize.height - answerSize.height)

    console.log('board:', board)
    console.log('board:', board)
    console.log('x:', x)
    console.log('y:', y)
  
    answer.style.border = '1px solid black'
    answer.style.cursor = 'pointer'
    answer.style.position = 'relative'
    answer.style.top = `${y}px`
    answer.style.left = `${x}px`
    
    answer.title = description
    answer.id = `${id}`

    answer.addEventListener('click', () => checkAnswer(id))
    answer.classList.add('rounded')
    answer.classList.add('p-2')
    answer.classList.add('answer')

    board?.append(answer)
    
    const color = getRandomColor()
    answer.style.backgroundColor = color

    console.log('answer:', answer)
  }
  
  function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
  }
  
  //? colors
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="w-full min-height-inherit flex justify-center flex-col">
      {
        (time !== null) ?
        <>
          <h1 className='mt-2 w-100 text-center text-textColorSecondary font-bold'>MIRANDO RESPOSTAS</h1>
          <div className='my-4'>
            <h2 className='mb-4 w-100 text-textColorSecondary font-bold'>Instruções:</h2>
            <p className='w-100 text-start text-textColorSecondary'>
              Para cada questão existe as resposta no 'mirando palavras'. <br/>
              Para responder uma questão basta selecionar a resposta que você acredita ser a correta. <br/>
              Você pode visualizar o conjunto de letras selecionadas de cada questão nos campos de respostas disponíveis abaixo das questões. <br/>

              <b>Observação: Certifique-se de que a ordem das letras selecionadas seja equivalentes as posições corretas na tabela do caça palavras. Caso contrário será invalidado a resposta.</b>
            </p>
          </div>
        </> :
        <></>
      }
      {
        !startGame ? 
        <>
          <div className='flex w-full justify-center'>
            <button className='mt-2 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type="button" onClick={() => setStartGame(true)}>Iniciar o jogo</button>
          </div>
        </> 
        :
        <>
          {
            startGame && time === 0 ?
            <>
              <div className="">
                <h1>Selecione o tempo de jogo</h1>
                <select className='mt-2 p-2 bg-backgroundColorInput' onChange={(event) => initStartGame(parseInt(event.target.value))}>
                  <option>Selecione</option>
                  <option value={10000}>10 segundos</option>
                  <option value={20000}>20 segundos</option>
                  <option value={30000}>30 segundos</option>
                  <option value={40000}>40 segundos</option>
                  <option value={50000}>50 segundos</option>
                  <option value={60000}>1 minutos</option>
                  <option value={120000}>2 minutos</option>
                  <option value={240000}>4 minutos</option>
                  <option value={300000}>5 minutos</option>
                  <option value={1800000}>30 minutos</option>
                  <option value={3599999}>1 hora</option>
                </select>
              </div>
            </>
            :
            <>
              <div className="flex items-center justify-center flex-col min-w-full" id="board-game">
              
                <div className="my-2">
                  <Countdown date={Date.now() + (time || 0)} onTick={(t) => setTime(t.total)} renderer={renderer} />
                </div>
                
                {
                  (time !== null) ?
                  <div className="my-2">
                      {activity?.questions[questionIndex].description}
                  </div>
                  :
                  <></>
                }
              </div>
            </>
          }
        </>
      }

      <div className="w-full min-height-inherit" ref={ref} id="board">
        {
          startGame && (time !== null && time > 0) ? 
          activity?.questions[questionIndex].answers.map( answer => {
            return (
              <>
                { generateAnswerRandom(answer?.id, answer?.description) }
              </>
            )
          }) :
          <></>
        }
      </div>
    </div>
  )
}