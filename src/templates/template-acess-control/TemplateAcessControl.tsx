import { Card } from "react-bootstrap"
import Container from "react-bootstrap/esm/Container"
import { Outlet } from "react-router-dom"
import './TemplateAcessControl.css'

export default function TemplateAcessControl() {
  return (
    <>
      <Container className="template-container">
        <Card
          bg={'dark'.toLowerCase()}
          key={'dark'}
          text={'dark'.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '30rem' }}
          className="mb-2"
        >
          <Card.Body>
            <Outlet />
          </Card.Body>
        </Card>
      </Container>
      </>
  )
}