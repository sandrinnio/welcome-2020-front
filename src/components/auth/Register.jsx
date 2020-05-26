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
import { signUpMutation } from '../../gql'

const Register = () => {

  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      history.push('/')
    }
  }, [history])

  const [form, setState] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    loading: false
  })

  const [createUser] = useMutation(signUpMutation);

  const handleChange = event => {
    setState({...form, [event.target.name]: event.target.value})
  }

  const isFormEmpty = ({ fullName, phone, idNumber, email, password, confirmPassword }) => {
    if (!fullName.length || !phone.length || !idNumber.length || !email.length || !password.length || !confirmPassword.length) {
      setState({...form, error: 'შეავსეთ ველები'})
      return false
    }
    if (idNumber.length !== 11) {
      setState({...form, error: 'პირადი ნომერი არ არის ვალიდური'})
      return false
    }
    if (phone.length > 13 || phone.length < 9) {
      setState({...form, error: 'ტელეფონის ნომერი არ არის ვალიდური'})
      return false
    }
    if (isNaN(phone) || isNaN(idNumber)) {
      setState({...form, error: 'შეიყვანეთ ვალიდური ტელეფონი და პირადი ნომერი'})
      return false
    }
    return true
  }

  const isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6) {
      setState({...form, error: 'პაროლი მოკლეა'})
      return false
    }
    if (password !== confirmPassword) {
      setState({...form, error: 'პაროლები არ ემთხვევა'})
      return false
    }
    return true
  }

  const isFormValid = () => {
    if (!isFormEmpty(form)) return false
    if (!isPasswordValid(form)) return false
    return true
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (isFormValid()) {
      try {
        setState({...form, error: '', loading: true})
        const { data } = await createUser({
          variables: {
            record: {
              fullName: form.fullName,
              email: form.email,
              phone: form.phone,
              idNumber: form.idNumber,
              password: form.password,
            }
          }
        })
        localStorage.setItem('token', data.signUp.token)
        localStorage.setItem('currentUser', data.signUp.user)
        setState({...form, loading: false})
        history.push('/');
      } catch (error) {
        console.log(error)
        setState({...form, error: 'მომხმარებელი უკვე რეგისტრირებულია', loading: false})
      }
    }
  }

  const renderError = error => <p>{error}</p>

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="grey" textAlign="center">
          შემოგვიერთდი
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              required
              name="fullName"
              icon="user"
              iconPosition="left"
              placeholder="სახელი გვარი"
              onChange={handleChange}
              value={form.fullName}
              type="text"
            />
            <Form.Input
              fluid
              required
              name="idNumber"
              icon="address card"
              iconPosition="left"
              placeholder="პირადი ნომერი"
              onChange={handleChange}
              value={form.idNumber}
              type="text"
            />
            <Form.Input
              fluid
              required
              name="phone"
              icon="phone"
              iconPosition="left"
              placeholder="ტელეფონის ნომერი"
              onChange={handleChange}
              value={form.phone}
              type="text"
            />
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
            <Form.Input
              fluid
              required
              name="confirmPassword"
              icon="repeat"
              iconPosition="left"
              placeholder="გაიმეორეთ პაროლი"
              onChange={handleChange}
              value={form.confirmPassword}
              type="password"
            />
            <Button disabled={form.loading} className={form.loading ? 'loading' : ''} color="grey" fluid size="large">რეგისტრაცია</Button>
          </Segment>
        </Form>
        {form.error && (
          <Message error>
            <h3>Error</h3>
            {renderError(form.error)}
          </Message>
        )}
        <Message>გაქვთ ანგარიში? <Link to="/login">შესვლა</Link></Message>
      </Grid.Column>
    </Grid>
  )
}

export default Register
