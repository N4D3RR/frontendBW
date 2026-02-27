import { useEffect, useState } from "react"
import { Form, Button, Row, Col, Card } from "react-bootstrap"

function ClientiFiltri({ filtri, onFiltri, onReset }) {
  const [form, setForm] = useState(filtri)

  useEffect(() => {
    setForm(filtri)
  }, [filtri])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFiltri(form)
  }
  const handleResetClick = () => {
    onReset()
    setForm({
      ragioneSociale: "",
      fatturatoMin: "",
      fatturatoMax: "",
      dataInserimentoDa: "",
      dataInserimentoA: "",
    })
  }

  return (
    <Card className="mb-4 p-3">
      <Form onSubmit={handleSubmit}>
        <Row className="g-2">
          <Col md={4}>
            <Form.Control
              name="ragioneSociale"
              placeholder="Ragione sociale"
              value={form.ragioneSociale}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              name="fatturatoMin"
              type="number"
              placeholder="Fatturato min"
              value={form.fatturatoMin}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              name="fatturatoMax"
              type="number"
              placeholder="Fatturato max"
              value={form.fatturatoMax}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              name="dataInserimentoDa"
              type="date"
              value={form.dataInserimentoDa}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              name="dataInserimentoA"
              type="date"
              value={form.dataInserimentoA}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <div className="mt-2 d-flex gap-2">
          <Button type="submit" variant="primary" size="sm">
            🔍 Filtra
          </Button>
          <Button
            type="button"
            variant="outline-secondary"
            size="sm"
            onClick={handleResetClick}
          >
            ✖ Reset
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default ClientiFiltri
