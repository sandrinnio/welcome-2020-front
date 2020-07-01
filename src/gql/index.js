import { loader } from 'graphql.macro'

export const signUpMutation = loader('./sign-up.mutation.gql')

export const signInMutation = loader('./sign-in.mutation.gql');

export const verifyMutation = loader('./verified.mutation.gql')

export const meQuery = loader('./current-user.query.gql');
