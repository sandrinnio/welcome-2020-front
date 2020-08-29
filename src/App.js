import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';
import { meQuery } from './gql'
import './App.css'

function App() {

  const history = useHistory()
  const { data } = useQuery(meQuery);
  let user = {}
  if (data && data.getCurrentUser) {
    user = data.getCurrentUser
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      history.push('/login')
    }
  }, [history])

  const logout = () => {
    user = {}
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <div className="App">
      <button onClick={logout}>Log Out</button>
      {(user && user.verified) ? <p>Verified</p> : <p>You aren't verified</p>}
      {user && user.paid && user.ticket && (
        <div>
          <img src={user.ticket} alt="ticket" />
        </div>
      )}
    </div>
  );
}

export default App;
