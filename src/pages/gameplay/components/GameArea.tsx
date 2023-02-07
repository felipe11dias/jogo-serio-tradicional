import Game from "./Game";

export default function GameArea() {
  

  return (
    <div className="w-100 border border-3 rounded-3" style={{ minWidth: '350px', maxWidth: '80%', minHeight: 'calc(100vh - 230px)' }}>
      <Game  />
    </div>
  )
}
