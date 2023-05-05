import { FC } from 'react'
import Alert from '../UI/Alert/Alert'

const PageNotFound: FC = () => (
  <Alert msg={'404 - Page Not Found'} type='warning' dismissible={false} />
)

export default PageNotFound
