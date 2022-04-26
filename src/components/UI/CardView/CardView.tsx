import { FC, Fragment } from 'react';

type CardViewProps = {
  title: string;
  subtitle?: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy: string;
};

const CardView: FC<CardViewProps> = ({
  title,
  subtitle,
  content,
  createdBy,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        <p className="card-text">{content}</p>
        <p className="card-text">
          <small className="text-muted">
            posted by: {createdBy}{' '}
            {createdAt ? `on ${new Date(createdAt).toLocaleString()}` : null}
          </small>
          {updatedAt ? (
            new Date(updatedAt).getTime() !==
            new Date(createdAt ?? '').getTime() ? (
              <Fragment>
                <br />
                <small className="text-muted">
                  updated on: {new Date(updatedAt).toLocaleString()}
                </small>
              </Fragment>
            ) : null
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default CardView;
