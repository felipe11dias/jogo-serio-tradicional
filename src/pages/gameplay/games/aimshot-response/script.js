const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

//? colors
const colors = ['#1abc9c', '#4efc53', '#3498db', '#9b59b6', '#ff3f34', '#f1c40f', '#f57e33', '#48dbfb']

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    createRandomCircles()
    event.target.remove()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircles()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `
  <h1>Your score: 
  <span class="primary">${score}</span>
  </h1>
  <button class="time-btn" onclick="window.location.reload()"> Restart </button>
  `
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

  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.style.top = `${x}px`
  circle.style.left = `${y}px`
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`

  circle.classList.add('circle')
  board.append(circle)

  //? colors
  const color = getRandomColor()
  circle.style.backgroundColor = color
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

//? colors
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
