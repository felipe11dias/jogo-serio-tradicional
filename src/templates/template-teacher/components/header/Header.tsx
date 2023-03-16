 

interface HeaderProps {
  bg: string
  variant: string
}

export default function Header(props: HeaderProps) {
  return (
    <Navbar bg={props.bg} variant={props.variant}>
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
