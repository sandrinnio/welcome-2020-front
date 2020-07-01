import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import { verifyMutation } from '../../gql'

const Confirm = () => {
  const history = useHistory()
  const verifyString = window.location.pathname.split('/')[2]
  const [verify] = useMutation(verifyMutation)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await verify({
        variables: {
          record: {
            verifyString
          }
        }
      })
      if (data.verify) {
        history.push('/')
      } else {
        localStorage.removeItem('token')
        history.push('/register')
      }
    }
    fetchData()
  }, [history, verify, verifyString])
  return (
    <div>Confirm</div>
  )
}

export default Confirm
