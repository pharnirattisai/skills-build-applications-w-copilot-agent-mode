import { useEffect, useState } from 'react'
import { asCollection } from './apiResponse'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(leaderboardEndpoint)

        if (!response.ok) {
          throw new Error(`Leaderboard request failed with ${response.status}`)
        }

        const payload = await response.json()
        setEntries(asCollection(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    loadLeaderboard()
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="view-panel">
      <div className="section-heading">
        <p className="eyebrow">Leaderboard</p>
        <h1>Top scores</h1>
      </div>
      <div className="score-list">
        {entries.map((entry) => (
          <article className="score-row" key={entry._id ?? `${entry.rank}-${entry.score}`}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.user?.displayName ?? entry.username ?? entry.userId ?? 'Athlete'}</h2>
              <p>{entry.score} points</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard