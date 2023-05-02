import { useMemo } from 'react'
import { rgbToHexString } from '../../../../util/Util'
import { Answer } from '../../../collaboration-activities/create-activities/CreateActivities'
import { AnswersViews, StateProps } from './ResponseSearch'
import {
  DOWN,
  Direction,
  LEFT,
  LEFT_DOWN,
  LEFT_UP,
  Point,
  RIGHT,
  RIGHT_DOWN,
  RIGHT_UP,
  UP
} from './types'
import { randomChar, range, shuffleArray } from './utils'

function WordSearch ({ state, setState }: WordSearchProps) {
  const table: Table = useMemo(() => {
    const points: Point[] = []

    const availableDirections = [
      UP,
      DOWN,
      LEFT,
      LEFT_UP,
      LEFT_DOWN,
      RIGHT,
      RIGHT_UP,
      RIGHT_DOWN
    ].filter(direction => direction.modes.every(mode => state.modes.includes(mode)))

    const table: Table = range(0, state.size - 1).map(y => (
      range(0, state.size - 1).map(x => {
        points.push([ x, y ])

        return {
          char: randomChar(),
          isWord: false
        }
      })
    ))

    shuffleArray(points)

    state.answers.forEach((answer: Answer) => {
      if (answer.description.length > 0) {
        createAnswer(
          state,
          setState,
          answer.description.toUpperCase(),
          table,
          state.size,
          shuffleArray(points),
          availableDirections
        )
      }
    })

    return table
  }, [state.answers, state.size, state.modes])

  const selectLetterAnswer = (event: any, point: Point) => {
    if(state.questionSelect != null) {
      const colorHex = state.questionColors[state.questionSelect]
      const buttonBg = rgbToHexString(event.target.style.backgroundColor)


      // VERIFICA SE AS CORES DOS BOTÕES IGUAIS
      if(buttonBg === colorHex) {
        // REMOVE UM A LETRA DE UMA RESPOSTA 
        
        event.target.style.backgroundColor = 'transparent'
        
        let answersViewAux: AnswersViews = state.answersViews
        
        let pointsAnswer: Point[] = []
        pointsAnswer.push(...answersViewAux.pointsAnswers[state.questionSelect])
        pointsAnswer.forEach((pointAnswer: Point, index: number) => {
          const [row, col] = point;
          const [r, c] = pointAnswer;
          
          if(r === row && c === col && state.questionSelect !== null) {
            answersViewAux.answers[state.questionSelect] = answersViewAux.answers[state.questionSelect].slice(0,index) + answersViewAux.answers[state.questionSelect].slice(index+1, answersViewAux.answers[state.questionSelect].length)
            if (index > -1) {
              pointsAnswer.splice(index, 1);
            }
            return pointsAnswer
          } 
        });

        answersViewAux.pointsAnswers[state.questionSelect] = pointsAnswer
        setState({
          ...state,
          answersViews: answersViewAux
        })
      }else {
        // ADICIONA UMA LETRA NO INPUT DE RESPOSTA DE ACORDO COM A QUESTÃO SELECIONADA

        let answersViewAux: AnswersViews = {
          answers: state.answersViews.answers,
          pointsAnswers: state.answersViews.pointsAnswers,
          pointsAnswersTable: state.answersViews.pointsAnswersTable
        }
        event.target.style.backgroundColor = colorHex

        // REMOVE A LETRA DE RESPOSTA DE OUTRA PERGUNTA
        if(state.questionColors.includes(buttonBg) && state.questionColors[state.questionSelect] !== buttonBg) {
          const indexQuestion = state.questionColors.indexOf(buttonBg)

          let pointsAnswer: Point[] = []
          pointsAnswer.push(...answersViewAux.pointsAnswers[indexQuestion])
          pointsAnswer.forEach((pointAnswer: Point, index: number) => {
            const [row, col] = point;
            const [r, c] = pointAnswer;
            
            if(r === row && c === col && indexQuestion !== null) {
              answersViewAux.answers[indexQuestion] = answersViewAux.answers[indexQuestion].slice(0,index) + answersViewAux.answers[indexQuestion].slice(index+1, answersViewAux.answers[indexQuestion].length)
              if (index > -1) {
                pointsAnswer.splice(index, 1);
              }
              return pointsAnswer
            } 
          });

          answersViewAux.pointsAnswers[indexQuestion] = pointsAnswer
          setState({
            ...state,
            answersViews: answersViewAux
          })
        }
        
        const textButton = event.target.innerText ? event.target.innerText : ' '
        answersViewAux.answers[state.questionSelect] = state.answersViews.answers[state.questionSelect] + textButton;

        let pointsAnswer: Point[] = []
        pointsAnswer.push(...answersViewAux.pointsAnswers[state.questionSelect])
        pointsAnswer.push(point)

        answersViewAux.pointsAnswers[state.questionSelect] = pointsAnswer
        setState({
          ...state,
          answersViews: answersViewAux
        })
      }
    }
  }

  return (
    <>
      {
        state.answers.length > 0 ?
        <>
          <div className='word-search'>
            <table>
              <tbody>
                {table.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((letter, col) => (
                      <td key={col} style={styles.td}>
                        <div
                          style={{
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            border: (letter.isWord && state.highlightAnswers) ? '1px solid red' : '0',
                            padding: state.debug ? 15 : 5
                          }}
                        >
                          <button
                            type="button"
                            className=''
                            onClick={ e => selectLetterAnswer(e, [rowIndex, col])}
                            title={letter.char}
                            style={ state.windowSize.width > 1400 ?
                              { height: 30, width: 30, fontSize: 18, padding: 0, color: 'red', backgroundColor: 'transparent'} :
                              (state.windowSize.width <= 1400 && state.windowSize.width > 1200) ?
                              { height: 24, width: 24, fontSize: 14, padding: 0, color: 'red', backgroundColor: 'transparent'} :
                              (state.windowSize.width <= 1200 && state.windowSize.width >= 992) ?
                              { height: 14, width: 14, fontSize: 8, padding: 0, color: 'red', backgroundColor: 'transparent'} : 
                              { height: 12, width: 12, fontSize: 6, padding: 0, color: 'red', backgroundColor: 'transparent'} }
                            >
                            {letter.char}
                          </button>
                          {state.debug && (
                            <div style={{ fontSize: 8 }}>
                              {rowIndex},{col}
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </> : 
        <></>
      }
    </>
  )
}

interface WordSearchProps {
  state: StateProps
  setState: Function
}

interface Letter {
  char: string
  isWord: boolean
}

type Table = Letter[][]

const styles = {
  td: {
    padding: 0,
    fontFamily: 'sans-serif'
  }
}

export default WordSearch

const createAnswer = (state: any, setState: any, word: string, table: Table, size: number, points: Point[], availableDirections: Direction[]): void => {
  for (let pointIndex = 0; pointIndex < points.length; pointIndex += 1) {
    const [ x, y ] = points[pointIndex]

    const directions = shuffleArray(availableDirections.map(d => d.direction))

    for (let directionIndex = 0; directionIndex < directions.length; directionIndex += 1) {
      const [ xd, yd ] = directions[directionIndex]

      const xEnd = x + (word.length - 1) * xd
      const yEnd = y + (word.length - 1) * yd

      if (yEnd > size - 1 || yEnd < 0 || xEnd > size - 1 || xEnd < 0) {
        continue
      }

      let isValid = true
      let positions: Point[] = []

      for (
        let col = x, row = y, i = 0;
        i < word.length;
        col += xd, row += yd, i += 1
      ) {
        if (table[row][col].isWord && table[row][col].char !== word[i]) {
          isValid = false
          break
        }

        positions.push([ col, row ])
      }


      if (!isValid) {
        continue
      }

      positions.forEach(([ x, y ], index) => {
        table[y][x] = {
          char: word[index],
          isWord: true
        }
      })

      return
    }
  }
}
