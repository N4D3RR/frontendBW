import { useState } from "react"
import { Container, Tabs, Tab, Card } from "react-bootstrap"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

const AuthPage = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: 420 }} className="p-4 shadow">
        <h4 className="text-center mb-4">Gestione Energia</h4>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="login" title="Login">
            <LoginForm onLogin={onLogin} />
          </Tab>
          <Tab eventKey="register" title="Registrati">
            <RegisterForm onSuccess={() => setActiveTab("login")} />
          </Tab>
        </Tabs>
      </Card>
    </Container>
  )
}

export default AuthPage
