import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})
