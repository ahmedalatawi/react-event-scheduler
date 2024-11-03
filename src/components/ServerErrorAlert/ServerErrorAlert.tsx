import { ApolloError } from '@apollo/client'
import Alert from '../ui/Alert/Alert'

export const ServerErrorAlert = ({
  error,
  onClose,
}: {
  error: ApolloError | null
  onClose: () => void
}) =>
  error ? <Alert msg={error.message} type='danger' onClose={onClose} /> : null
