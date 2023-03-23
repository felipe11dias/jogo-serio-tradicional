import { useEffect, useState } from 'react';
import {
  Point
} from './types';
import { randomChar, range } from './utils';

import { Answer } from '../../../collaboration-activities/create-activities/CreateActivities';
import './stylesSearch.css';


function AnswerSearch({ answer, size, debug, highlightLetters }: AnswerSearchProps) {
  const [pointsSelected, setPointsSelected] = useState<Point[]>([]);
  const [table, setTable] = useState<Table>([[],[]]);
  
  let qtdAnswer = 0;
  
  useEffect(() => {
    const pointsExisting: Point[] = []

    const tableInit: Table = range(0, size - 1).map(y => (
      range(0, size - 1).map(x => {
        pointsExisting.push([ x, y ])

        return {
          char: randomChar(),
          isLetter: false
        }
      })
    ))

    const pointsSelecteds: Point[] = criarValoresUnicos(pointsExisting)

    for (let index = 0; index < pointsSelecteds.length; index++) {
      const [row, col] = pointsSelecteds[index];
      tableInit[row][col] = {
        char: tableInit[row][col].char,
        isLetter: true
      }
    }
      
    setPointsSelected(pointsSelecteds)
    setTable(tableInit)
    
  }, [answer, size])


  function criarValoresUnicos(points: Point[]) {
    var valoresSelecionados: Point[] = []

    for (let index = 0; index < answer.length; index++) {
      var pointAleatorio = points[Math.ceil(Math.random() * points.length)]; 
      while (valoresSelecionados.indexOf(pointAleatorio) >= 0) {  // Enquanto o numero já existir, escolher outro
        pointAleatorio = points[Math.ceil(Math.random() * points.length)]; 
      }
      valoresSelecionados.push(pointAleatorio); // adicionar este numero à array de numeros valoresSelecionados para futura referência
    }

    return valoresSelecionados;
  }

  const checkIsLetter = (letter: Letter, pointTable: Point) => {
    for (let pointIndex: number = 0; pointIndex < pointsSelected.length; pointIndex += 1) {
      const [ x, y ] = pointsSelected[pointIndex];
      const [row, col] = pointTable;
      
      if(x === row && y === col) {
        return true;
      }
    } 
    
    return false;
  }

  return (
    <div className='word-search'>
      <table>
        <tbody>
          {table.map((row, index) => (
            <tr key={index}>
              {row.map((letter, col) => (
                <td key={col} style={styles.td}>
                  <div
                    style={{
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      color: (letter.isLetter && highlightLetters) ? 'red' : 'black',
                      padding: debug ? 15 : 5
                    }}
                  >
                    {
                      checkIsLetter(letter, [index, col]) ?
                        <button type="button" title={answer[qtdAnswer++].description}>{letter.char}</button>
                      :
                        <>{letter.char}</>
                    }
                    {debug && (
                      <div style={{ fontSize: 8 }}>
                        {index},{col}
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

interface AnswerSearchProps {
  answer: Answer[]
  size: number
  debug?: boolean
  highlightLetters: boolean
}

interface Letter {
  char: string
  isLetter: boolean
}

type Table = Letter[][]

const styles = {
  td: {
    fontFamily: 'sans-serif'
  }
}



export default AnswerSearch

