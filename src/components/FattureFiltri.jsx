import { useEffect, useState } from "react"
import { Form, Button, Row, Col, Card } from "react-bootstrap"

function FattureFiltri({ filtri, onFiltri, onReset }) {
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
    setForm({ stato: "", anno: "", importoMin: "", importoMax: "" })
  }

  return (
    <Card className="mb-4 p-3">
      <Form onSubmit={handleSubmit}>
        <Row className="g-2">
          <Col md={3}>
            <Form.Select
              name="stato"
              value={form.stato}
              onChange={handleChange}
            >
              <option value="">Tutti gli stati</option>
              <option value="CREATA">CREATA</option>
              <option value="PAGATA">PAGATA</option>
              <option value="SCADUTA">SCADUTA</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Control
              name="anno"
              type="number"
              placeholder="Anno (es. 2026)"
              value={form.anno}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              name="importoMin"
              type="number"
              placeholder="Importo min"
              value={form.importoMin}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              name="importoMax"
              type="number"
              placeholder="Importo max"
              value={form.importoMax}
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

export default FattureFiltri
