import { Table, Pagination, Badge, Alert } from "react-bootstrap"

const ClientiTable = ({ clienti, page, totalPages, onPageChange }) => {
  if (clienti.length === 0)
    return <Alert variant="info">Nessun cliente trovato</Alert>

  return (
    <>
      <Table>
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
