import { useState } from "react"
import { Form, Button, Alert, Spinner } from "react-bootstrap"
import apiFetch from "../services/api"

function RegisterForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      })
      onSuccess() // torna al tab login
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          name="nome"
          placeholder="Inserisci nome"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cognome</Form.Label>
        <Form.Control
          name="cognome"
          placeholder="Inserisci cognome"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          placeholder="Scegli username"
          onChange={handleChange}
          required
        />
      </Form.Group>

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
          placeholder="Min 6 caratteri"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button
        type="submit"
        variant="success"
        className="w-100"
        disabled={loading}
      >
        {loading ? <Spinner size="sm" animation="border" /> : "Registrati"}
      </Button>
    </Form>
  )
}

export default RegisterForm
