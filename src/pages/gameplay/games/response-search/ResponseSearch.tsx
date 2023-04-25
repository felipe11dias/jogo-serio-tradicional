import { useEffect, useState } from 'react'
import { Answer, AnswerQuestions, IFormInputs } from '../../../collaboration-activities/create-activities/CreateActivities'
import WordSearch from './WordSearch'
import './styles.css'
import { Mode, Point } from './types'

const FORM_MOCK: IFormInputs = {
  name: "TESTE",
  theme: "PROGRAMACAO",
  answerQuestions: [
    {
      id: 0,
      question: "Questão 1",
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
      answerCorrect: 0
    },
    {
      id: 1,
      question: "Questão 2",
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
      answerCorrect: 0
    },
    {
      id: 2,
      question: "Questão 3",
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
      answerCorrect: 0
    }
  ]
}

export default function ResponseSearch () {

  const getAnswer = (): Answer[] => {
    let answers: Answer[] = [];
    FORM_MOCK.answerQuestions.map( (aq) => {
      const answerFinded: Answer | null = aq.answers.find( answer => {
        return answer.id === aq.answerCorrect;
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
      answers: Array(FORM_MOCK.answerQuestions.length).fill(''),
      pointsAnswers: Array(FORM_MOCK.answerQuestions.length).fill([]),
      pointsAnswersTable: Array(FORM_MOCK.answerQuestions.length).fill([])
    }
  }

  const getColors = (): string[] => {
    return Array.from(Array(FORM_MOCK.answerQuestions.length).keys()).map( _ => '#' + Math.floor(Math.random()*16777215).toString(16))
  }

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const stateDefault: StateProps = {
    questionSelect: null,
    questionColors: getColors(),
    answers: getAnswer(),
    answersViews: getAnswersViews(),
    windowSize: windowSize,
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

  const [ state, setState ] = useState<StateProps>(stateDefault)

  const handleWindowResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    setState({
      ...state,
      windowSize: windowSize
    })
  };

  useEffect(() => {
    console.log(windowSize)
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize]);

  const validateAnswers = () => {
    for (let index = 0; index < state.answersViews.answers.length; index++) {
      const pointsAnswers = state.answersViews.pointsAnswers[index];
      const pointsAnswersTable = state.answersViews.pointsAnswersTable[index];

      console.log(state.answersViews.answers.length)
      
      for (let indexPoint = 0; indexPoint < pointsAnswers.length; indexPoint++) {
        console.log(pointsAnswers)
        console.log(pointsAnswersTable)
        const [r, c] = pointsAnswers[indexPoint];
        const [row, col] = pointsAnswersTable[indexPoint];
        
        if(!(r === row && c === col)) {
          state.answersViews.answers[index] += "** INCORRECT ORDER ELEMENTES **";
          break;
        }
      }
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    
    // VERIFICA CADA LETRA SELECIONADA DE CADA RESPOSTA COM O SEU PONTO NA TABELA, OU SEJA, AS LETRAS E POINTOS SELECIONADOS NA TABELA TEM QUE ESTAR EM CONFORMIDADE
    validateAnswers()
    
    console.log(state.answersViews)
  }

  return (
    <div className='my-4'>
      <h1 className='w-100 text-center text-white font-bold'>CAÇA RESPOSTAS</h1>
      <div className='my-4'>
      <h4 className='w-100 text-center text-white font-bold'>Instruções:</h4>
      <p className='w-100 text-center text-white'>
        Para cada questão existe uma resposta no caça palavras. <br/>
        Para responder uma questão selecione a questão e selecione as letras equivalentes a resposta no caça palavras. <br/>
        Você pode visualizar o conjunto de letras selecionadas de cada questão nos campos de respostas disponíveis abaixo das questões. <br/>

        <b>Observação: Certifique-se de que a ordem das letras selecionadas seja equivalentes as posições corretas na tabela do caça palavras. Caso contrário será invalidado a resposta.</b>
      </p>
      </div>
      <div className='my-4'>
        <label className='label w-100 text-center text-white font-bold' htmlFor='questions'>Questions:</label>
        <div className='w-100 d-grid'>
          {FORM_MOCK.answerQuestions.map((aq: AnswerQuestions, index: number) => (
            <button key={aq.id} type='button' className='m-5 p-2 rounded-md'
              style={{ backgroundColor: state.questionColors[index], border: (state.questionSelect === index && state.questionSelect !== null) ? '3px solid black' : 0 }}
              onClick={() => setState({
                ...state,
                questionSelect: state.questionSelect === index ? null : index
              })}>
                Question {index + 1}:<br/>
                {aq.question}
              </button>
          ))}
        </div>
      </div>
      <form onSubmit={ (e) => handleSubmit(e) } className='px-0'>
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
          <button className='btn btn-primary text-white' type='submit'> Finalizar </button>
        </div>
        <WordSearch
          state={state}
          setState={setState}
          />
      </form>
    </div>
  )
}

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
  windowSize: {width: number, height: number}
  size: number
  modes: Mode[]
  debug: boolean
  highlightAnswers: boolean
}