import { useNavigate, useLocation } from "react-router-dom"
import { Navbar, Nav, Container, Button } from "react-bootstrap"

function AppNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Gestione Energia</Navbar.Brand>
        {token && (
          <>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => navigate("/clienti")}
                active={location.pathname === "/clienti"}
              >
                Clienti
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/fatture")}
                active={location.pathname === "/fatture"}
              >
                Fatture
              </Nav.Link>
            </Nav>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Container>
    </Navbar>
  )
}

export default AppNavbar
