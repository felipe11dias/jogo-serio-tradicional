import { useContext, useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { SubmitHandler, useForm } from "react-hook-form"
import GameSeriusContext, { GameSeriusType } from '../../../../context/GameContext/GameContext'
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
  size: 22,
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
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;
  const [startGame, setStartGame] = useState<boolean>(false);
  const [time, setTime] = useState<number | null>(0);
  const [activity, setActivity] = useState<IEditActivityInputs | null>(null);
  const [state, setState ] = useState<StateProps>(stateDefaultEmpty)
  const [result, setResult] = useState<ResultProps>({ questions: [], open: true, answers: [] });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    getActivity(gameSerius.activitySelected.toString()).then( data => {
      setActivity(data)
      setResult({
        ...result,
        questions: data.questions
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
    console.log(time)
  }, [state])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize]);

  const ScoreFinishGame = () => (
    <>
      <ModalResult questions={result.questions} open={result.open} answers={result.answers} />
      <h1>Fim de jogo!</h1>
    </>
  );

  const renderer = ({ minutes, seconds, completed }: { minutes: number, seconds: number, completed: boolean }) => {
    if (completed) {
      finishGame()
      return <ScoreFinishGame />;
    } else {
      setTime((minutes * 60000) + (seconds * 1000))
      return <h3>{minutes}:{seconds}</h3>;
    }
  };

  const { register, handleSubmit, reset } = useForm();

  function initStartGame(timeVar: number) {
    setTime(timeVar)
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
      //console.log("pointsAnswers", pointsAnswers)
      //console.log("pointsAnswersTable", pointsAnswersTable)
      
      for (let indexPoint = 0; indexPoint < pointsAnswers.length; indexPoint++) {
        //console.log("indexPoint", indexPoint)
        const [r, c] = pointsAnswers[indexPoint];
        const [row, col] = pointsAnswersTable[indexPoint];
        
        if(!(r === row && c === col)) {
          state.answersViews.answers[index] += "** ORDEM DE ELEMENTOS INCORRETO **";
          break;
        }
      }
    }
  }

  const getScores = () => {
    activity?.questions.map( (question, indexQuestion) => {
      question.answers.map((answer => {
        if((answer.id === parseInt(question.idAnswerCorrect)) && (answer.description.toUpperCase() === state.answersViews.answers[indexQuestion])) {
          result.answers.push(answer.id)
        }
      }))
      if(result.answers[indexQuestion] === undefined) {
        result.answers.push(-1)
      }
    })
    setResult(result)
  }

  const finishGame = () => {
    // VERIFICA CADA LETRA SELECIONADA DE CADA RESPOSTA COM O SEU PONTO NA TABELA, OU SEJA, AS LETRAS E POINTOS SELECIONADOS NA TABELA TEM QUE ESTAR EM CONFORMIDADE
    validateAnswers()
    // VERIFICA SE A RESPOSTA CORRETA DA QUESTÃO ESTÁ EM CONFORMIDADE COM A RESPOSTA DO ALUNO
    getScores()
    setTime(null)
  }

  const onSubmitHandler: SubmitHandler<any> = async (values) => {
    finishGame()
  };

  return (
    <>
      {
      (time !== null) ?
        <>
          <h1 className='w-100 text-center text-textColorSecondary font-bold'>CAÇA RESPOSTAS</h1>
          <div className='my-4'>
            <h4 className='w-100 text-center text-textColorSecondary font-bold'>Instruções:</h4>
            <p className='w-100 text-center text-textColorSecondary'>
              Para cada questão existe uma resposta no 'caça respostas'. <br/>
              Para responder uma questão selecione a questão e selecione as letras equivalentes a resposta no caça palavras. <br/>
              Você pode visualizar o conjunto de letras selecionadas de cada questão nos campos de respostas disponíveis abaixo das questões. <br/>

              <b>Observação: Certifique-se de que a ordem das letras selecionadas seja equivalentes as posições corretas na tabela do caça palavras. Caso contrário será invalidado a resposta.</b>
            </p>
          </div> 
        </>
        :
        <></>
      }
      {
      !startGame ?
        <div>
          <h1>Caça respostas</h1>
          <button type="button" onClick={() => setStartGame(true)}>Iniciar o jogo</button>
        </div> :
        <>
          {
            startGame && time === 0 ?
            <>
              <div className="">
                <h1>Selecione o tempo de jogo</h1>
                <select onChange={(event) => initStartGame(parseInt(event.target.value))}>
                  <option>Selecione</option>
                  <option value={10000}>10 sec</option>
                  <option value={20000}>20 sec</option>
                  <option value={30000}>30 sec</option>
                  <option value={40000}>40 sec</option>
                  <option value={50000}>50 sec</option>
                  <option value={60000}>1 min</option>
                  <option value={120000}>2 min</option>
                  <option value={240000}>4 min</option>
                  <option value={300000}>5 min</option>
                  <option value={1800000}>30 min</option>
                  <option value={3600000}>1 hora</option>
                </select>
              </div>
            </> :
            <>
              <div className='my-4'>
                <div className="my-2">
                  { (time !== null) ? <>Tempo restante:</> : <></>} <Countdown date={Date.now() + (time || 0)} renderer={renderer} />
                </div>
                {
                (time !== null) ?
                  <>
                    <div className='my-4'>
                      <label className='label w-100 text-center text-textColorSecondary font-bold' htmlFor='questions'>Questions:</label>
                      <div className='w-100 d-grid'>
                        {activity?.questions.map((question: AnswerQuestions, index: number) => (
                          <button key={question.id} type='button' className='m-5 p-2 rounded-md'
                            style={{ backgroundColor: state.questionColors[index], border: (state.questionSelect === index && state.questionSelect !== null) ? '3px solid black' : 0 }}
                            onClick={() => setState({
                              ...state,
                              questionSelect: state.questionSelect === index ? null : index
                            })}>
                              Question {index + 1}:<br/>
                              {question.description}
                            </button>
                        ))}
                      </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitHandler)} className='px-0'>
                      <div className='my-4'>
                          {
                            state.answers.map( (_, index) => {
                              return (
                                <div className='my-4' key={index}>
                                  <label htmlFor={'answerView' + index} style={{color: state.questionColors[index]}}>Answer {index}:</label>
                                  <input
                                    type='text'
                                    value={state.answersViews.answers[index]}
                                    readOnly={true}
                                  />
                                </div>
                              )
                            })
                          }
                      </div>
                      
                      <div className='my-4 d-flex justify-content-center'>
                        <button className='btn btn-primary text-textColorSecondary' type='submit'> Finalizar </button>
                      </div>
                      <WordSearch
                        time={time}
                        state={state}
                        setState={setState}
                        />
                    </form>
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
