import { FC } from 'react';

type TitledCardProps = {
  title: string;
};

const TitledCard: FC<TitledCardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h5 className="card-header">{title}</h5>

      <div className="card-body">{children}</div>
    </div>
  );
};

export default TitledCard;
