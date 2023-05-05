import { FC, Fragment } from 'react'
import { formatDateTime } from '../../../utils/dateTransforms'

type CardViewType = {
  title: string | undefined
  subtitle?: string
  content: string | undefined
  createdAt?: number | undefined | null
  updatedAt?: number | undefined | null
  createdBy: string | undefined
}

type Props = {
  card: CardViewType
}

const CardView: FC<Props> = ({ card }) => {
  const { title, subtitle, content, createdBy, createdAt, updatedAt } = card

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>{subtitle}</h6>
        <p className='card-text'>{content}</p>
        <p className='card-text'>
          <small className='text-muted'>
            posted by: {createdBy}{' '}
            {createdAt ? `on ${formatDateTime(createdAt)}` : null}
          </small>
          {updatedAt ? (
            new Date(updatedAt).getTime() !==
            new Date(createdAt ?? '').getTime() ? (
              <Fragment>
                <br />
                <small className='text-muted'>
                  updated on: {formatDateTime(updatedAt)}
                </small>
              </Fragment>
            ) : null
          ) : null}
        </p>
      </div>
    </div>
  )
}

export default CardView
