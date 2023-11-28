import { useContext, useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import GameSeriusContext, { GameSeriusType } from '../../../../context/GameContext/GameContext'
import { useAppSelector } from '../../../../redux/store'
import { User } from '../../../../redux/types/User'
import { getActivity } from '../../../../service/rest/apis/activityRestApi'
import { Answer } from '../../../collaboration-activities/create-activities/CreateActivities'
import { AnswerQuestions, IEditActivityInputs } from '../../../collaboration-activities/edit-activities/EditActivities'
import ModalResult, { ResultProps } from '../../components/ModalResult'
import WordSearch from './WordSearch'
import './styles.css'
import { Mode, Point } from './types'


export interface AnswersViews {
  answers: string[]
  pointsAnswers: Array<Array<Point>>
  pointsAnswersTable: Array<Array<Point>>
}

export type StateProps = {
  questionSelect: number | null
  questionColors: string[]
  answers: Answer[]
  answersViews: AnswersViews
  windowSize: { width: number, height: number }
  size: number
  modes: Mode[]
  debug: boolean
  highlightAnswers: boolean
}

const stateDefaultEmpty: StateProps = {
  questionSelect: null,
  questionColors: [],
  answers: [],
  answersViews: {
    answers: [],
    pointsAnswers: [],
    pointsAnswersTable: []
  },
  windowSize: {
    width: 0,
    height: 0
  },
  size: 10,
  modes: [
    'horizontal',
    'vertical',
    'diagonal',
    'reversed'
  ],
  debug: false,
  highlightAnswers: false
}

export default function ResponseSearch () {
  const user: User | null = useAppSelector(state => state.userState.user)
  
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;
  const [startGame, setStartGame] = useState<boolean>(false);
  const [time, setTime] = useState<number | null>(0);
  const [activity, setActivity] = useState<IEditActivityInputs | null>(null);
  const [state, setState ] = useState<StateProps>(stateDefaultEmpty)
  const [result, setResult] = useState<ResultProps>({ idUser: user?.id || -1, idActivity: -1, time: '', fullTime: '', game: 'Caça respostas', questions: [], open: true, answers: [], descriptions: [] });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  useEffect(() => {
    setState({
      ...state,
      questionColors: getColors(),
      answers: getAnswer(),
      answersViews: getAnswersViews(),
      windowSize: windowSize
    })
  }, [activity])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize]);

  const ScoreFinishGame = () => (
    <div className='h-full w-full flex justify-center'>
      <ModalResult game={result.game} idUser={result.idUser} idActivity={result.idActivity} time={result.time} fullTime={result.fullTime} questions={result.questions} open={result.open} answers={result.answers}  descriptions={result.descriptions} />
      <h1 className='h-full w-full text-center text-4xl'>Fim de jogo!</h1>
    </div>
  );

  const renderer = ({ minutes, seconds, completed }: { minutes: number, seconds: number, completed: boolean }) => {
    if (completed) {
      finishGame()
      return <ScoreFinishGame />;
    } else {
      return (
      <div className='mt-2 p-2 w-full flex justify-center'>
         <h1 className='text-2xl'>{(time !== null) ? <>Tempo restante:</> : <></>} {minutes}:{seconds}</h1>
      </div>
      );
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
    setResult({
      ...result,
      fullTime: msToTimeString(timeVar)
    })
    setTime(timeVar)

    setTimeout(() => {
      const board = document.getElementById('board-game');
      if (board) {
        // 👇 Will scroll smoothly to the top of the next section
        board.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  }

  const getAnswer = (): Answer[] => {
    let answers: Answer[] = [];
    activity?.questions.map( (aq) => {
      const answerFinded: Answer | null = aq.answers.find( answer => {
        return answer.id === parseInt(aq.idAnswerCorrect);
      }) || null

      if(answerFinded === null) {
        alert("Erro em encontrar resposta")
      }else {
        return answers.push(answerFinded)
      }
    })

    return answers
  }

  const getAnswersViews = (): AnswersViews => {
    return {
      answers: Array(activity?.questions.length).fill(''),
      pointsAnswers: Array(activity?.questions.length).fill([]),
      pointsAnswersTable: Array(activity?.questions.length).fill([])
    }
  }

  const getColors = (): string[] => {
    return Array.from(Array(activity?.questions.length).keys()).map( _ => '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
  }

  const handleWindowResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    if(activity !== null) {
      setState({
        ...state,
        windowSize: windowSize
      })
    }
  };

  const validateAnswers = () => {
    for (let index = 0; index < state.answersViews.answers.length; index++) {
      const pointsAnswers = state.answersViews.pointsAnswers[index];
      const pointsAnswersTable = state.answersViews.pointsAnswersTable[index];
      
      console.log(pointsAnswers)
      console.log(pointsAnswersTable)

      for (let indexPoint = 0; indexPoint < pointsAnswers.length; indexPoint++) {
        const [r, c] = pointsAnswers[indexPoint];
        
        if(!indexOfForArrays([r, c], pointsAnswersTable)) {
          state.answersViews.answers[index] += "** ORDEM DE ELEMENTOS INCORRETO **";
          break;
        }
        
      }
    }
  }

 function indexOfForArrays(searchArray: any, array: any) {
    var searchJson = JSON.stringify(searchArray);
    var arrJson = array.map(JSON.stringify);

    return !!arrJson.indexOf(searchJson);
  };

  const getScores = () => {
    activity?.questions.map( (question, indexQuestion) => {
      question.answers.map((answer => {
        if((answer.id === parseInt(question.idAnswerCorrect)) && (answer.description.toUpperCase().replaceAll(' ', '') === state.answersViews.answers[indexQuestion].toUpperCase().replaceAll(' ', ''))) {
          result.answers.push(answer.id)
        }
      }))
      if(result.answers[indexQuestion] === undefined) {
        result.answers.push(-1)
      }
      result.descriptions.push(state.answersViews.answers[indexQuestion])
    })
    setResult(result)
  }

  const finishGame = () => {
    const timeAux: number | null = time
    if(timeAux != null) {
      result.time = msToTimeString(timeAux || 0)
    }
    setResult(result)
    // VERIFICA CADA LETRA SELECIONADA DE CADA RESPOSTA COM O SEU PONTO NA TABELA, OU SEJA, AS LETRAS E PONTOS SELECIONADOS NA TABELA TEM QUE ESTAR EM CONFORMIDADE
    validateAnswers()
    // VERIFICA SE A RESPOSTA CORRETA DA QUESTÃO ESTÁ EM CONFORMIDADE COM A RESPOSTA DO ALUNO
    getScores()
    setTime(null)
  }

  return (
    <>
      {
      (time !== null) ?
        <div className='my-4'>
          <h1 className='mt-2 w-100 text-center text-textColorSecondary font-bold'>CAÇA RESPOSTAS</h1>
          <div className='my-4'>
            <h2 className='mb-4 w-100 text-textColorSecondary font-bold'>Instruções:</h2>
            <p className='w-100 text-start text-textColorSecondary'>
              Para cada questão existe uma resposta no 'caça respostas'. <br/>
              Para responder uma questão selecione a questão e selecione as letras equivalentes a resposta no caça palavras. <br/>
              Você pode visualizar o conjunto de letras selecionadas de cada questão nos campos de respostas disponíveis abaixo das questões. <br/>

              <b>Observação: Certifique-se de que a ordem das letras selecionadas seja equivalentes as posições corretas na tabela do caça palavras. Caso contrário será invalidado a resposta.</b>
            </p>
          </div> 
        </div>
        :
        <></>
      }
      {
      !startGame ?
        <div className='flex w-full justify-center'>
          <button className='mt-2 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type="button" onClick={() => setStartGame(true)}>Iniciar o jogo</button>
        </div> :
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
            </> :
            <>
              <div className={'my-4 ' + time === null ? 'h-full w-full text-center' : ''}>
                <div className={"my-2 " + time === null ? 'flex justify-center h-full w-full text-center' : ''} id="board-game">
                  <Countdown date={Date.now() + (time || 0)} onTick={(t) => setTime(t.total)} renderer={renderer} />
                </div>
                {
                (time !== null) ?
                  <>
                    <div className='my-4'>
                      <label className='label w-100 text-center text-textColorSecondary font-bold' htmlFor='questions'>Questões:</label>
                      <div className='w-100 d-grid'>
                        {activity?.questions.map((question: AnswerQuestions, index: number) => (
                          <button key={question.id} type='button' className='m-5 p-2 rounded-md'
                            style={{ backgroundColor: state.questionColors[index], border: (state.questionSelect === index && state.questionSelect !== null) ? '3px solid black' : 0 }}
                            onClick={() => setState({
                              ...state,
                              questionSelect: state.questionSelect === index ? null : index
                            })}>
                              Questão {index + 1}:<br/>
                              {question.description}
                            </button>
                        ))}
                      </div>
                    </div>
                    <div className='px-0'>
                      <div className='my-4'>
                          {
                            state.answers.map( (_, index) => {
                              return (
                                <div className='my-4' key={index}>
                                  <label htmlFor={'answerView' + index} style={{color: state.questionColors[index]}}>Resposta {index+1}:</label>
                                  <input
                                  className='rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none'
                                    type='text'
                                    value={state.answersViews.answers[index]}
                                    readOnly={true}
                                  />
                                </div>
                              )
                            })
                          }
                      </div>
                      
                      <div className='my-4 w-full flex justify-center'>
                        <button className='mt-2 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type='button' onClick={finishGame}> Finalizar </button>
                      </div>
                      <WordSearch
                        state={state}
                        setState={setState}
                        />
                    </div>
                  </> :
                  <></>
                }
              </div>
            </>
          }
        </>
      }
    </>
  )
}
