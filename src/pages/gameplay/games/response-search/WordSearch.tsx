import { useMemo } from 'react'
import { rgbToHexString } from '../../../../util/Util'
import { Answer } from '../../../collaboration-disciplines/create-discipline/CreateDiscipline'
import { AnswersViewrs, StateProps } from './ResponseSearch'
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
        createWord(
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

      if(buttonBg === colorHex) {
        console.log("if(buttonBg === colorHex)")
        event.target.style.backgroundColor = 'buttonface'
        
        let answersViewerAux: AnswersViewrs = {
          answers: state.answersViewrs.answers,
          pointsAnswers: state.answersViewrs.pointsAnswers
        }
        
        let pointsAnswer: Point[] = []
        pointsAnswer.push(...answersViewerAux.pointsAnswers[state.questionSelect])
        pointsAnswer.forEach((pointAnswer: Point, index: number) => {   
          const [row, col] = point;
          const [r, c] = pointAnswer;
          
          

          if(r === row && c === col && state.questionSelect !== null) {
            answersViewerAux.answers[state.questionSelect] = answersViewerAux.answers[state.questionSelect].slice(0,index) + answersViewerAux.answers[state.questionSelect].slice(index+1, answersViewerAux.answers[state.questionSelect].length)

            console.log(answersViewerAux)
            console.log(index)
            if (index > -1) {
              pointsAnswer.splice(index, 1);
            }
            return pointsAnswer
          } 
        });

        answersViewerAux.pointsAnswers[state.questionSelect] = pointsAnswer
        
        console.log(answersViewerAux)
        setState({
          ...state,
          answersViews: answersViewerAux
        })
      }else {
        event.target.style.backgroundColor = colorHex
        
        let answersViewerAux: AnswersViewrs = {
          answers: state.answersViewrs.answers,
          pointsAnswers: state.answersViewrs.pointsAnswers
        }
        
        answersViewerAux.answers[state.questionSelect] = state.answersViewrs.answers[state.questionSelect] + event.target.innerText;

        let pointsAnswer: Point[] = []
        pointsAnswer.push(...answersViewerAux.pointsAnswers[state.questionSelect])
        pointsAnswer.push(point)

        answersViewerAux.pointsAnswers[state.questionSelect] = pointsAnswer
        
        console.log(answersViewerAux)
        setState({
          ...state,
          answersViews: answersViewerAux
        })
      }
    }
  }

  return (
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
                    <button type="button" onClick={ e => selectLetterAnswer(e, [rowIndex, col])} style={{height: 26, width: 26}}>{letter.char}</button>
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
    fontFamily: 'sans-serif'
  }
}

export default WordSearch

const createWord = (word: string, table: Table, size: number, points: Point[], availableDirections: Direction[]): void => {
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
