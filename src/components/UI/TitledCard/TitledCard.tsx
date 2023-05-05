import { FC, ReactNode } from 'react'

type Props = {
  title: string
  children?: ReactNode
}

const TitledCard: FC<Props> = ({ title, children }) => {
  return (
    <div className='card'>
      <h5 className='card-header'>{title}</h5>
      <div className='card-body'>{children}</div>
    </div>
  )
}

export default TitledCard
