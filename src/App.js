import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './App.css'

function App() {

  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      history.push('/login')
    }
  }, [history])

  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
