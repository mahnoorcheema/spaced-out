import { render, screen } from '@testing-library/react';
import App from './App';

test("Search page renders", () => {
  render(<App />);
  expect(screen.getByText(/Search/i)).toBeInTheDocument();
});
