import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import AuthPage from "./components/AuthPage"
import ClientiPage from "./components/ClientiPage"
import FatturePage from "./components/FatturePage"

function App() {
  const token = localStorage.getItem("token")

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
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
    </BrowserRouter>
  )
}

export default App
