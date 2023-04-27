import { useState } from "react";

export default function AimshotResponse() {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [timeEl, setTimeEl] = useState<string>('00:00');
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const colors = ['#1abc9c', '#4efc53', '#3498db', '#9b59b6', '#ff3f34', '#f1c40f', '#f57e33', '#48dbfb']
  const startBtn = document.querySelector('#start')
  const screens = document.querySelectorAll('.screen')
  const timeList = document.querySelector('#time-list')
  //const timeEl = document.querySelector('#time')
  const board = document.querySelector('#board')

  function initStartGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircles()
    setTime(time)
  }

  function decreaseTime() {
    if (time === 0) {
      finishGame()
    } else {
      let timeAux = time;
      setTime(--timeAux)
      let current: any = --timeAux
      if (current < 10) {
        current = `0${current}`
      }
      setTimeEl(current)
    }
  }

  function finishGame() {
    
  }

  function createRandomCircles() {
    const circle = document.createElement('div')
    let size
    if (document.body.clientWidth <= 516) {
      size = getRandomNumber(15, 30)
    } else if (document.body.clientWidth <= 320) {
      size = getRandomNumber(20, 40)
    } else {
      size = getRandomNumber(20, 60)
    }
  
    const { width, height } = board?.getBoundingClientRect() || new DOMRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
  
    circle.style.top = `${x}px`
    circle.style.left = `${y}px`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
  
    circle.classList.add('circle')
   // board.append(circle)
  
    //? colors
    const color = getRandomColor()
    circle.style.backgroundColor = color
  }
  
  function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
  }
  
  //? colors
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="w-full h-full flex justify-center">

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
            startGame && time === null ?
            <>
              <div className="screen">
                <h1>Choose the time</h1>
                <ul className="time-list" id="time-list">
                  <li>
                    <button className="time-btn" data-time="10" onClick={() => setTime(10)} >10 sec</button>
                  </li>
                  <li>
                    <button className="time-btn" data-time="20" onClick={() => setTime(20)} >20 sec</button>
                  </li>
                  <li>
                    <button className="time-btn" data-time="30" onClick={() => setTime(30)} >30 sec</button>
                  </li>
                  <li>
                    <button className="time-btn" data-time="60" onClick={() => setTime(60)} >1 min.</button>
                  </li>
                  <li>
                    <button className="time-btn" data-time="120" onClick={() => setTime(120)} >2 min.</button>
                  </li>
                </ul>
              </div>
            </>
            :
            <>
              <div className="screen">
                <h3><span id="time">{timeEl}</span> left</h3>
                <div className="board" id="board"></div>
              </div>
            </>
          }
        </>
      }
    </div>
  )
}