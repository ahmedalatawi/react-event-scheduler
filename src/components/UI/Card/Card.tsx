import { FC } from 'react';

import './Card.css';

type CardProps = {
  title: string;
  subtitle?: string;
  exSubTitle?: string;
  content: string;
  isPrivate?: boolean;
  onClick: (item: any) => void;
};

const Card: FC<CardProps> = ({
  title,
  subtitle,
  content,
  isPrivate,
  exSubTitle,
  onClick,
}) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-body">
        <h5 className="card-title">
          {title}{' '}
          {exSubTitle && (
            <span className="badge rounded-pill bg-warning text-dark small-font">
              {exSubTitle}
            </span>
          )}{' '}
          {isPrivate && (
            <span className="badge rounded-pill bg-danger small-font">
              Private
            </span>
          )}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        <p className="card-text">{content}</p>
        {/* <button type="button" className="card-link btn btn-outline-secondary">Share on Twitter</button>
      <button type="button" className="card-link btn btn-outline-secondary">Share on Facebook</button> */}
      </div>
    </div>
  );
};

export default Card;
