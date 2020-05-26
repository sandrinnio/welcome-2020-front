import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
} from 'semantic-ui-react' 

const Register = () => {

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

  const handleChange = event => {
    setState({...form, [event.target.name]: event.target.value})
  }

  const isFormEmpty = ({ fullName, phone, idNumber, email, password, confirmPassword }) => {
    if (!fullName.length || !phone.length || !idNumber.length || !email.length || !password.length || !confirmPassword.length) {
      setState({...form, error: 'Field is empty'})
      return false
    }
    if (idNumber.length !== 11) {
      setState({...form, error: 'ID Number length should be 11'})
      return false
    }
    if (phone.length > 13) {
      setState({...form, error: 'Invalid phone number'})
      return false
    }
    if (isNaN(phone) || isNaN(idNumber)) {
      setState({...form, error: 'Phone and ID number must be a number'})
      return false
    }
    return true
  }

  const isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6) {
      setState({...form, error: 'Password is too short'})
      return false
    }
    if (password !== confirmPassword) {
      setState({...form, error: 'Passwords do not match'})
      return false
    }
    return true
  }

  const isFormValid = () => {
    if (!isFormEmpty(form)) return false
    if (!isPasswordValid(form)) return false
    return true
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (isFormValid()) {
      setState({...form, error: '', loading: true})
    }
  }

  const renderError = error => <p>{error}</p>

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="grey" textAlign="center">
          რეგისტრაცია
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
            <Button disabled={form.loading} className={form.loading ? 'loading' : ''} color="grey" fluid size="large">შენახვა</Button>
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
