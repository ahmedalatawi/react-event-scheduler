import { FC, Fragment } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { StyledCard, StyledPrivateBadge, StyledSubTitle } from './styles';

type CardProps = {
  title: string;
  subtitle?: string;
  exSubTitle?: string;
  content: string;
  url: string;
  isPrivate?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy: string;
  onClick: (item: any) => void;
};

const Card: FC<CardProps> = ({
  title,
  subtitle,
  content,
  url,
  isPrivate,
  exSubTitle,
  createdAt,
  updatedAt,
  createdBy,
  onClick,
}) => {
  return (
    <StyledCard onClick={onClick}>
      <div className="card-body">
        <h5 className="card-title">
          {title} {exSubTitle && <StyledSubTitle>{exSubTitle}</StyledSubTitle>}{' '}
          {isPrivate && <StyledPrivateBadge>Private</StyledPrivateBadge>}
        </h5>
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

        <FacebookShareButton
          onClick={(e) => e.stopPropagation()}
          url={url}
          className="card-link btn btn-outline-secondary"
        >
          <FacebookIcon size={32} round /> Share on Facebook
        </FacebookShareButton>

        <TwitterShareButton
          onClick={(e) => e.stopPropagation()}
          className="card-link btn btn-outline-secondary"
          title={title}
          url={url}
          //hashtags={['hashtag1', 'hashtag2']}
        >
          <TwitterIcon size={32} round /> Share on Twitter
        </TwitterShareButton>
      </div>
    </StyledCard>
  );
};

export default Card;
