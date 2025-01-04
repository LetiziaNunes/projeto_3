import React from 'react';
import tecnologias from '@/app/data/tecnologias.json';
import TechCard from '@/app/components/Card/tecnologiacard';

interface Tecnologia {
  title: string;
  image: string;
  description: string;
  rating: number;
}

const TecnologiasPage: React.FC = () => {
  return (
    <div className="tecnologias-container">
      <h1>Tecnologias Aprendidas</h1>
      <div className="tecnologias-grid">
        {tecnologias.map((tec: Tecnologia) => (
          <TechCard
            key={tec.title}
            title={tec.title}
            image={tec.image}
            description={tec.description}
            rating={tec.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default TecnologiasPage;
