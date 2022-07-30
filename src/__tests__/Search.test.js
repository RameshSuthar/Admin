import Search from "../components/Search/Search";
import { render, screen } from '@testing-library/react';

test('should display a search bar with placeholder', async () => {
    let {getByTestId, findByTestId} = render(<Search />);
    expect(await screen.findByPlaceholderText('search by name/email or role and press enter.')).toBeInTheDocument();
});

