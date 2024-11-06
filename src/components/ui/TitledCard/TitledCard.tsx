import type { ReactNode } from 'react'

type Props = {
  title: string
  children?: ReactNode
}

const TitledCard = ({ title, children }: Props) => {
  return (
    <div className='card'>
      <h5 className='card-header'>{title}</h5>
      <div className='card-body'>{children}</div>
    </div>
  )
}

export default TitledCard
