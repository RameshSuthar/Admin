import { render, screen, shallow, fireEvent } from '@testing-library/react';
import App from '../App';

test('show loading, untill we get a data from server', () => {
  render(<App />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('displays delete selected button', async () => {
  const { container } = render(<App />)
  expect(await screen.findByText('Delete Selected')).toBeInTheDocument();
});

test('should render 10 users per page', async () => {
  const { container } = render(<App />);
  const items = await screen.findAllByTestId('user-item');
  expect(items).toHaveLength(10);
})


