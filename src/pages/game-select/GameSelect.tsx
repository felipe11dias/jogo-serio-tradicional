import { Button, Card } from "react-bootstrap";

export default function GameSelect() {

  return (
    <div>
      <h2 className="mb-5 w-100 text-center"> GAME SELECT </h2>
      
      <div className="d-flex justify-content-around">
        <Card className="m-2" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Jogo da velha</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">SELECIONAR</Button>
          </Card.Body>
        </Card>

        <Card className="m-2" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Dama</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">SELECIONAR</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
