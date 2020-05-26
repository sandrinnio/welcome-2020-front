import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
} from 'semantic-ui-react'
import { signInMutation } from '../../gql'

const Login = () => {

  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      history.push('/')
    }
  }, [history])

  const [form, setState] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
  })

  const [signIn] = useMutation(signInMutation);

  const isFormValid = ({ email, password }) => email && password && password.length >= 6

  const handleChange = event => {
    setState({...form, [event.target.name]: event.target.value})
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (isFormValid(form)) {
      try {
        setState({...form, error: '', loading: true})
        const { data } = await signIn({
          variables: {
            email: form.email,
            password: form.password
          }
        })
        localStorage.setItem('token', data.signIn.token)
        localStorage.setItem('currentUser', data.signIn.user)
        setState({...form, loading: false})
        history.push('/');
      } catch (error) {
        console.log(error)
        setState({...form, error: 'მომხმარებელი არ არსებობს', loading: false})
      }
    }
  }

  const renderError = error => <p>{error}</p>
  
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          შესვლა
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              required
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="ელ.ფოსტა"
              onChange={handleChange}
              value={form.email}
              type="email"
            />
            <Form.Input
              fluid
              required
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="პაროლი"
              onChange={handleChange}
              value={form.password}
              type="password"
            />
            <Button disabled={form.loading} className={form.loading ? 'loading' : ''} color="violet" fluid size="large">შესვლა</Button>
          </Segment>
        </Form>
        {form.error && (
          <Message error>
            <h3>Error</h3>
            {renderError(form.error)}
          </Message>
        )}
        <Message>არ გაქვთ ანგარიში? <Link to="/register">დარეგისტრირდი</Link></Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login
