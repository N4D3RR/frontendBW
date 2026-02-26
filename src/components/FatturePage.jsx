import { useEffect, useState } from "react"
import { Container, Spinner, Alert } from "react-bootstrap"
import FattureFiltri from "./FattureFiltri"
import FattureTable from "./FattureTable"
import apiFetch from "../services/api"

const FatturePage = () => {
  const [fatture, setFatture] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [filtri, setFiltri] = useState({
    stato: "",
    anno: "",
    importoMin: "",
    importoMax: "",
  })

  const fetchFatture = (filtriAttivi = filtri, pagina = page) => {
    setLoading(true)
    setErr(false)

    const params = new URLSearchParams({ page: pagina, size: 15 })
    if (filtriAttivi.stato) params.append("stato", filtriAttivi.stato)
    if (filtriAttivi.anno) params.append("anno", filtriAttivi.anno)
    if (filtriAttivi.importoMin)
      params.append("importoMin", filtriAttivi.importoMin)
    if (filtriAttivi.importoMax)
      params.append("importoMax", filtriAttivi.importoMax)

    apiFetch(`/fatture?${params.toString()}`)
      .then((data) => {
        setFatture(data.content)
        setTotalPages(data.totalPages)
        setLoading(false)
      })
      .catch(() => {
        setErr(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchFatture()
  }, [page])

  const handleFiltri = (nuoviFiltri) => {
    setFiltri(nuoviFiltri)
    setPage(0)
    fetchFatture(nuoviFiltri, 0)
  }

  const handleReset = () => {
    const filtriVuoti = { stato: "", anno: "", importoMin: "", importoMax: "" }
    setFiltri(filtriVuoti)
    setPage(0)
    fetchFatture(filtriVuoti, 0)
  }

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Fatture</h3>

      <FattureFiltri
        filtri={filtri}
        onFiltri={handleFiltri}
        onReset={handleReset}
      />

      {loading && <Spinner animation="border" variant="secondary" />}

      {err && (
        <Alert variant="danger">Errore nel caricamento delle fatture</Alert>
      )}

      {!loading && !err && (
        <FattureTable
          fatture={fatture}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </Container>
  )
}

export default FatturePage
