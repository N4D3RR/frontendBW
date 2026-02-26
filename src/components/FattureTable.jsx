import { Table, Pagination, Badge, Alert } from "react-bootstrap"

const statoBadge = (stato) => {
  switch (stato) {
    case "PAGATA":
      return "success"
    case "SCADUTA":
      return "danger"
    case "CREATA":
      return "warning"
    default:
      return "secondary"
  }
}

const FattureTable = ({ fatture, page, totalPages, onPageChange }) => {
  if (fatture.length === 0)
    return <Alert variant="info">Nessuna fattura trovata</Alert>

  return (
    <>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Numero</th>
            <th>Data</th>
            <th>Importo</th>
            <th>Stato</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {fatture.map((f) => (
            <tr key={f.id}>
              <td>{f.numero}</td>
              <td>{f.data}</td>
              <td>€ {f.importo?.toLocaleString("it-IT")}</td>
              <td>
                <Badge bg={statoBadge(f.stato?.stato)}>{f.stato?.stato}</Badge>
              </td>
              <td>{f.cliente?.ragioneSociale}</td>
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

export default FattureTable
