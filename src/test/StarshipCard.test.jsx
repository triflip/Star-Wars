// Verificat que la informació de la nau es pinta bé i que el router funciona.

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StarshipCard } from '../components/StarshipCard';

// AIXÒ ÉS LA CLAU: Mokejem el fitxer conflictiu abans que Jest l'intenti llegir
jest.mock('../utils/starshipImages', () => ({
  __esModule: true,
  default: () => 'https://starwars-visualguide.com/assets/img/starships/9.jpg'
}));

const mockShip = {
  id: '9',
  name: 'Death Star',
  model: 'DS-1 Orbital Battle Station'
};

describe('StarshipCard', () => {
  test('ha de mostrar el nom i el model de la nau', () => {
    render(
      <BrowserRouter>
        <StarshipCard {...mockShip} />
      </BrowserRouter>
    );

    expect(screen.getByText('Death Star')).toBeInTheDocument();
    expect(screen.getByText('DS-1 Orbital Battle Station')).toBeInTheDocument();
  });

  test('ha de tenir un enllaç a la ruta de detalls correcta', () => {
    render(
      <BrowserRouter>
        <StarshipCard {...mockShip} />
      </BrowserRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/starships/9');
  });
});