import { useEffect, useState } from 'react'
import { asCollection } from './apiResponse'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(workoutsEndpoint)

        if (!response.ok) {
          throw new Error(`Workouts request failed with ${response.status}`)
        }

        const payload = await response.json()
        setWorkouts(asCollection(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    loadWorkouts()
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="view-panel">
      <div className="section-heading">
        <p className="eyebrow">Workouts</p>
        <h1>Suggested sessions</h1>
      </div>
      <div className="data-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.title}>
            <div className="card-title-row">
              <h2>{workout.title}</h2>
              <span className="badge text-bg-success">{workout.difficulty}</span>
            </div>
            <p>{workout.description}</p>
            <p className="duration">{workout.durationMinutes} min</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts