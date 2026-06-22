import { useEffect, useState } from 'react'
import { asCollection } from './apiResponse'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(teamsEndpoint)

        if (!response.ok) {
          throw new Error(`Teams request failed with ${response.status}`)
        }

        const payload = await response.json()
        setTeams(asCollection(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    loadTeams()
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="view-panel">
      <div className="section-heading">
        <p className="eyebrow">Teams</p>
        <h1>Training groups</h1>
      </div>
      <div className="data-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <p>{team.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams