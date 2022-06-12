import { render, screen } from '@testing-library/react';
import { AdminHomePage } from './AdminHomePage';

test('renders welcome', () => {
  render(<AdminHomePage />);
  const linkElement = screen.getByText(/Bienvenidos/i);
  expect(linkElement).toBeInTheDocument();
});
