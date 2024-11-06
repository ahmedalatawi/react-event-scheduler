import type { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

const Spinner = ({ ...props }: Props) => (
  <div className='d-flex justify-content-center' {...props}>
    <div className='spinner-border' role='status' data-testid='SpinnerText'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  </div>
)

export default Spinner
