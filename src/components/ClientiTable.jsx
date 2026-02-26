import { Table, Spinner, Alert, Pagination, Badge } from "react-bootstrap"

function ClientiTable({
  clienti,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
}) {
  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    )
  if (error) return <Alert variant="danger">{error}</Alert>
  if (clienti.length === 0)
    return <Alert variant="info">Nessun cliente trovato</Alert>

  return (
    <>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Ragione Sociale</th>
            <th>P. IVA</th>
            <th>Email</th>
            <th>Fatturato</th>
            <th>Tipo</th>
            <th>Inserimento</th>
          </tr>
        </thead>
        <tbody>
          {clienti.map((c) => (
            <tr key={c.id}>
              <td>{c.ragioneSociale}</td>
              <td>{c.pIva}</td>
              <td>{c.email}</td>
              <td>€ {c.fatturatoAnnuale?.toLocaleString("it-IT")}</td>
              <td>
                <Badge bg="secondary">{c.tipo}</Badge>
              </td>
              <td>{c.dataInserimento}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          <Pagination.Prev
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={i === page}
              onClick={() => onPageChange(i)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === totalPages - 1}
            onClick={() => onPageChange(page + 1)}
          />
        </Pagination>
      )}
    </>
  )
}

export default ClientiTable
