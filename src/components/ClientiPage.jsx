import { useEffect, useState } from "react"
import { Container, Spinner, Alert } from "react-bootstrap"
import ClientiFiltri from "./ClientiFiltri"
import ClientiTable from "./ClientiTable"
import apiFetch from "../services/api"

const ClientiPage = () => {
  const [clienti, setClienti] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [filtri, setFiltri] = useState({
    ragioneSociale: "",
    fatturatoMin: "",
    fatturatoMax: "",
    dataInserimentoDa: "",
    dataInserimentoA: "",
  })

  const fetchClienti = (filtriAttivi = filtri, pagina = page) => {
    setLoading(true)
    setErr(false)

    const params = new URLSearchParams({ page: pagina, size: 15 })
    if (filtriAttivi.ragioneSociale)
      params.append("ragioneSociale", filtriAttivi.ragioneSociale)
    if (filtriAttivi.fatturatoMin)
      params.append("fatturatoMin", filtriAttivi.fatturatoMin)
    if (filtriAttivi.fatturatoMax)
      params.append("fatturatoMax", filtriAttivi.fatturatoMax)
    if (filtriAttivi.dataInserimentoDa)
      params.append("dataInserimentoDa", filtriAttivi.dataInserimentoDa)
    if (filtriAttivi.dataInserimentoA)
      params.append("dataInserimentoA", filtriAttivi.dataInserimentoA)

    apiFetch(`/clienti?${params.toString()}`)
      .then((data) => {
        setClienti(data.content)
        setTotalPages(data.totalPages)
        setLoading(false)
      })
      .catch(() => {
        setErr(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchClienti()
  }, [page])

  const handleFiltri = (nuoviFiltri) => {
    setFiltri(nuoviFiltri)
    setPage(0)
    fetchClienti(nuoviFiltri, 0)
  }

  const handleReset = () => {
    const filtriVuoti = {
      ragioneSociale: "",
      fatturatoMin: "",
      fatturatoMax: "",
      dataInserimentoDa: "",
      dataInserimentoA: "",
    }
    setFiltri(filtriVuoti)
    setPage(0)
    fetchClienti(filtriVuoti, 0)
  }

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Clienti</h3>

      <ClientiFiltri
        filtri={filtri}
        onFiltri={handleFiltri}
        onReset={handleReset}
      />

      {loading && (
        <Spinner
          animation="border"
          variant="secondary"
          className="text-center"
        />
      )}

      {err && (
        <Alert variant="danger">Errore nel caricamento dei clienti</Alert>
      )}

      {!loading && !err && (
        <ClientiTable
          clienti={clienti}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </Container>
  )
}

export default ClientiPage
