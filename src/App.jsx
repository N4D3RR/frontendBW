import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import AuthPage from "./components/AuthPage"
import ClientiPage from "./components/ClientiPage"
import FatturePage from "./components/FatturePage"

function AppContent() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const navigate = useNavigate() // ← useNavigate deve stare DENTRO BrowserRouter

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
    navigate("/clienti") // ← redirect esplicito
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/auth")
  }

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
        <Route
          path="/clienti"
          element={token ? <ClientiPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/fatture"
          element={token ? <FatturePage /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
