import { useState } from 'react'
import { Answer, AnswerQuestions, IFormInputs } from '../../../collaboration-disciplines/create-discipline/CreateDiscipline'
import WordSearch from './WordSearch'
import './styles.css'
import { Mode, Point } from './types'

const SIZES = [10, 15, 20, 25, 30]

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

const MODES: { label: string, value: Mode }[] = [
  {
    label: 'Horizontal',
    value: 'horizontal'
  },
  {
    label: 'Vertical',
    value: 'vertical'
  },
  {
    label: 'Diagonal',
    value: 'diagonal'
  },
  {
    label: 'Trás pra frente',
    value: 'reversed'
  }
]

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

  const getAnswersViewrs = (): AnswersViewrs => {
    return {
      answers: Array(FORM_MOCK.answerQuestions.length).fill(''),
      pointsAnswers: Array(FORM_MOCK.answerQuestions.length).fill([])
    }
  }

  const getColors = (): string[] => {
    return Array.from(Array(FORM_MOCK.answerQuestions.length).keys()).map( _ => '#' + Math.floor(Math.random()*16777215).toString(16))
  }

  const [ state, setState ] = useState<StateProps>({
    questionSelect: null,
    questionColors: getColors(),
    answers: getAnswer(),
    answersViewrs: getAnswersViewrs(),
    size: 20,
    modes: [
      'horizontal',
      'vertical',
      'diagonal',
      'reversed'
    ],
    debug: false,
    highlightAnswers: true
  })

  const checkForm = () => {}

  return (
    <div className='container'>
      <h1>Gerador de caça-respostas</h1>
      <div className='field'>
        <label className='label' htmlFor='size'>Tamanho (linhas x colunas):</label>
        <select
          id='size'
          value={state.size.toString()}
          onChange={e => setState({ ...state, size: parseInt(e.target.value, 10) })}
        >
          {SIZES.map(size => (
            <option key={size} value={size.toString()}>{size}x{size}</option>
          ))}
        </select>
      </div>
      <div className='field'>
        <label className='label' htmlFor='questions'>Questions:</label>
        <div className='w-100 d-flex'>
          {FORM_MOCK.answerQuestions.map((aq: AnswerQuestions, index: number) => (
            <button key={aq.id} type='button' className='mx-2'
              style={{ backgroundColor: (state.questionSelect === index && state.questionSelect !== null) ? state.questionColors[index] : 'buttonface'  }}
              onClick={() => setState({
                ...state,
                questionSelect: state.questionSelect === index ? null : index
              })}>{aq.question} {index}</button>
          ))}
        </div>
      </div>
      <div className='field'>
        <label className='label' htmlFor='modes'>Modos:</label>
        {MODES.map(mode => (
          <div key={mode.value}>
            <label className='checkbox'>
              <input
                type='checkbox'
                onChange={e => setState({
                  ...state,
                  modes: e.target.checked
                    ? state.modes.concat(mode.value)
                    : state.modes.filter(value => value !== mode.value)
                })}
                checked={state.modes.includes(mode.value)}
              />
              <span>{mode.label}</span>
            </label>
          </div>
        ))}
      </div>
      <div className='field'>
        <label htmlFor='options' className='label'>Opções de visualização:</label>
        <div>
          <label className='checkbox'>
            <input
              type='checkbox'
              checked={state.highlightAnswers}
              onChange={() => setState({ ...state, highlightAnswers: !state.highlightAnswers })}
            />
            <span>Destacar as palavras</span>
          </label>
        </div>
      </div>
      <WordSearch
        state={state}
        setState={setState}
      />

      <div className='field mt-4'>
          {
            state.answers.map( (answer, index) => {
              return (
                <>
                  <label htmlFor={'answerView' + index} className='label'>Answer {index}:</label>
                  <div>
                    <label className='input'>
                      <input
                        type='text'
                        value={state.answersViewrs.answers[index]}
                        readOnly={true}
                      />
                    </label>
                  </div>
                </>
              )
            })
          }
      </div>
    </div>
  )
}

export interface AnswersViewrs {
  answers: string[],
  pointsAnswers: Array<Array<Point>>
}

export type StateProps = {
  questionSelect: number | null
  questionColors: string[]
  answers: Answer[]
  answersViewrs: AnswersViewrs
  size: number
  modes: Mode[]
  debug: boolean
  highlightAnswers: boolean
}