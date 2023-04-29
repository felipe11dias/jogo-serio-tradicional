import React, { useContext, useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import GameSeriusContext, { GameSeriusType } from "../../../../context/GameContext/GameContext";
import { getActivities } from "../../../../service/rest/apis/activityRestApi";
import { Activity } from "../../../../types/Activity";
import { IEditActivityInputs } from "../../../collaboration-activities/edit-activities/EditActivities";
import './style.css';


const FORM_MOCK: Activity = {
  id: 0,
  idUser: 1,
  idDiscipline: 1,
  user: '',
  discipline: '',
  name: "TESTE",
  questions: [
    {
      id: 0,
      description: "Questão 1",
      answers: [
        {
          id: 0,
          description: "Resposta 1"
        },
        {
          id: 1,
          description: "Resposta 2"
        }
      ],
      idAnswerCorrect: 0
    },
    {
      id: 1,
      description: "Questão 2",
      answers: [
        {
          id: 0,
          description: "Resposta 1"
        },
        {
          id: 1,
          description: "Resposta 2"
        }
      ],
      idAnswerCorrect: 0
    },
    {
      id: 2,
      description: "Questão 3",
      answers: [
        {
          id: 0,
          description: "Resposta 1"
        },
        {
          id: 1,
          description: "Resposta 2"
        }
      ],
      idAnswerCorrect: 0
    }
  ]
}

export default function AimshotResponse() {
  const ref = React.useRef(null);
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;
  const colors = ['#1abc9c', '#4efc53', '#3498db', '#9b59b6', '#ff3f34', '#f1c40f', '#f57e33', '#48dbfb']
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [time, setTime] = useState<number | null>(0);
  const [score, setScore] = useState<number>(0);
  const [activities, setActivities] = useState<IEditActivityInputs>();

  useEffect(() => {
    getActivities(gameSerius.activitySelected.toString()).then( data => {
      setActivities(data)
    }).catch( error => {
      toast.error('Error: ' + error?.message)
      return null
    })
  }, [])

  const ScoreFinishGame = () => <span>Você acertou {score} questões!</span>;

// Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: { minutes: number, seconds: number, completed: boolean }) => {
    if (completed) {
      // Render a completed state
      finishGame()
      return <ScoreFinishGame />;
    } else {
      // Render a countdown
      return <h3>{minutes}:{seconds}</h3>;
    }
  };

  function initStartGame(timeVar: number) {
    setTime(timeVar)
  }

  function finishGame() {
    const answers = document.getElementsByClassName('answer')
    Array.from(answers).forEach(answer => {
      answer.remove();
    })
    setTime(null)
    const board = document.getElementById('board')
    board?.remove();
  }

  function checkAnswer(id: number) {
    const answers = document.getElementsByClassName('answer')
    Array.from(answers).forEach(answer => {
      answer.remove();
    })

    if(activities?.questions[questionIndex].idAnswerCorrect || -1 === id) {
      setScore(score + 1)
    }

    if(activities?.questions.length === (questionIndex + 1)) {
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
        !startGame ? 
        <>
          <div>
            <h1>Aimshot Response</h1>
            <button type="button" onClick={() => setStartGame(true)}>Iniciar o jogo</button>
          </div>
        </> 
        :
        <>
          {
            startGame && time === 0 ?
            <>
              <div className="">
                <h1>Choose the time</h1>
                <ul className="time-list">
                  <li>
                    <button className="" onClick={() => initStartGame(10000)} >10 sec</button>
                  </li>
                  <li>
                    <button className="" onClick={() => initStartGame(20000)} >20 sec</button>
                  </li>
                  <li>
                    <button className="" onClick={() => initStartGame(30000)} >30 sec</button>
                  </li>
                  <li>
                    <button className="" onClick={() => initStartGame(60000)} >1 min.</button>
                  </li>
                  <li>
                    <button className="" onClick={() => setTime(120000)} >2 min.</button>
                  </li>
                </ul>
              </div>
            </>
            :
            <>
              <div className="flex items-center justify-center flex-col min-w-full">
              
                <div className="my-2">
                  { (time !== null) ? <>Tempo restante:</> : <></>} <Countdown date={Date.now() + (time || 0)} renderer={renderer} />
                </div>
                
                {
                  (time !== null) ?
                  <div className="my-2">
                      activities?.questions[questionIndex].description + '?'
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
          activities?.questions[questionIndex].answers.map( answer => {
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