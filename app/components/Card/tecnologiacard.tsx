import React from 'react';

interface TecnologiaCardProps {
  title: string;
  image: string;
  description: string;
  rating: number;
}

const TecCard: React.FC<TecnologiaCardProps> = ({ title, image, description, rating }) => {
  return (
    <div className="tec-card">
      <img src={image}className="tec-card-image" />
      <h3 className="tec-card-title">{title}</h3>
      <p className="tec-card-description">{description}</p>
      <p className="tec-card-rating">⭐ {rating.toFixed(1)}</p>
    </div>
  );
};

export default TecCard;
