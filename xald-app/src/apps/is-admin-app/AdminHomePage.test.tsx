import { render, screen } from '@testing-library/react';
import { HomeContent } from './AdminHomePage';

test('homeContet - welcome text', () => {
  render(<HomeContent />);
  const linkElement = screen.getByText(/Bienvenidos/i);
  expect(linkElement).toBeInTheDocument();
});
