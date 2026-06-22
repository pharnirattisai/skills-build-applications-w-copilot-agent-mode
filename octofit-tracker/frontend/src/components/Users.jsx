import { useEffect, useState } from 'react'
import { asCollection } from './apiResponse'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(usersEndpoint)

        if (!response.ok) {
          throw new Error(`Users request failed with ${response.status}`)
        }

        const payload = await response.json()
        setUsers(asCollection(payload))
        setStatus('ready')
      } catch (requestError) {
        setError(requestError.message)
        setStatus('error')
      }
    }

    loadUsers()
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="view-panel">
      <div className="section-heading">
        <p className="eyebrow">Members</p>
        <h1>Octofit users</h1>
      </div>
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.email}>
            <h2>{user.displayName}</h2>
            <p className="handle">@{user.username}</p>
            <p>{user.email}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users