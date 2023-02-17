import { Card } from "react-bootstrap"
import Container from "react-bootstrap/esm/Container"
import { Outlet } from "react-router-dom"

export default function TemplateAccessControl() {
  return (
    <>
      <Container className="template-container" style={{ minHeight: '100vh' }}>
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