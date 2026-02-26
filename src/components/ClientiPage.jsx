import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import ClientiFiltri from "./ClientiFiltri"
import ClientiTable from "./ClientiTable"
import apiFetch from "../services/api"

function ClientiPage() {
  const [clienti, setClienti] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [filtri, setFiltri] = useState({
    ragioneSociale: "",
    fatturatoMin: "",
    fatturatoMax: "",
    dataInserimentoDa: "",
    dataInserimentoA: "",
  })

  const fetchClienti = async (filtriAttivi = filtri, pagina = page) => {
    setLoading(true)
    setError("")

    try {
      // costruisce la query string solo con i filtri valorizzati
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

      const data = await apiFetch(`/clienti?${params.toString()}`)
      setClienti(data.content)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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
      <h3 className="mb-4">📋 Clienti</h3>
      <ClientiFiltri
        filtri={filtri}
        onFiltri={handleFiltri}
        onReset={handleReset}
      />
      <ClientiTable
        clienti={clienti}
        loading={loading}
        error={error}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Container>
  )
}

export default ClientiPage
