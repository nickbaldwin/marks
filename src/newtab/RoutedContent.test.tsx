import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../testSetup/testUtils';

import { RoutedContent } from './RoutedContent';

it('chrome mock(?) is available', async () => {
    expect(chrome.storage).toBeTruthy;
});

it('renders', async () => {
    expect(chrome.storage).toBeTruthy;
    render(<RoutedContent />);

    expect(screen.getByText(/bears: 0/)).toBeInTheDocument();
});

test('can interact with stateful content', async () => {
    render(<RoutedContent />);

    expect(screen.getByText(/add folder/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /add folder/i });
    expect(button).toBeInTheDocument();
    const input = screen.getByRole('textbox', { name: /add folder/i });
    expect(input).toBeInTheDocument();
    await userEvent.type(input, 'test folder');
    await userEvent.click(button);
    // screen.debug();
    expect(screen.getByText('test folder')).toBeInTheDocument();

    const bears = screen.getByRole('button', { name: 'increase' });
    expect(bears).toBeInTheDocument();
    await userEvent.click(bears);

    expect(screen.getByText(/bears: 1/)).toBeInTheDocument();
});
