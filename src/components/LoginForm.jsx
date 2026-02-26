import { useState } from "react"
import { Form, Button, Alert, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import apiFetch from "../services/api"

const LoginForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErr(false)
    setLoading(true)

    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((token) => {
        localStorage.setItem("token", token)
        navigate("/clienti")
      })
      .catch(() => setErr(true))
      .finally(() => setLoading(false))
  }

  return (
    <Form onSubmit={handleSubmit}>
      {err && <Alert variant="danger">Credenziali non valide</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Inserisci email"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Inserisci password"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        className="w-100"
        disabled={loading}
      >
        {loading ? <Spinner size="sm" animation="border" /> : "Accedi"}
      </Button>
    </Form>
  )
}

export default LoginForm
