import { useEffect, useState } from 'react'
import { asCollection, formatDate } from './apiResponse'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(activitiesEndpoint)

        if (!response.ok) {
          throw new Error(`Activities request failed with ${response.status}`)
        }

        const payload = await response.json()
        setActivities(asCollection(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    loadActivities()
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="view-panel">
      <div className="section-heading">
        <p className="eyebrow">Activity Log</p>
        <h1>Recent movement</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Logged</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.type}-${activity.loggedAt}`}>
                <td className="fw-semibold">{activity.type}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{formatDate(activity.loggedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities