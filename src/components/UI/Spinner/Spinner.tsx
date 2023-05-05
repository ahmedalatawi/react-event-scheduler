import { FC } from 'react'

const Spinner: FC = () => (
  <div className='d-flex justify-content-center'>
    <div className='spinner-border' role='status' data-testid='SpinnerText'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  </div>
)

export default Spinner
