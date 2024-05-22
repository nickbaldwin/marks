import { screen } from '@testing-library/react';
import { render } from '../testSetup/testUtils';
import { AddCollectionToFolder } from './AddCollectionToFolder';
import userEvent from '@testing-library/user-event';

const folderId = '1234-1234-123456';

test('renders', async () => {
    const handler = vi.fn();
    render(
        <AddCollectionToFolder
            folderId={folderId}
            addCollectionToFolder={handler}
        />
    );
    expect(screen.getByText(/add collection/i)).toBeInTheDocument();
});

test('not triggered if no name', async () => {
    const handler = vi.fn();
    render(
        <AddCollectionToFolder
            folderId={folderId}
            addCollectionToFolder={handler}
        />
    );
    expect(screen.getByText(/add collection/i)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /add collection/i });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(handler).not.toHaveBeenCalled();
});

test('triggered if name set', async () => {
    const handler = vi.fn();
    render(
        <AddCollectionToFolder
            folderId={folderId}
            addCollectionToFolder={handler}
        />
    );
    const input = screen.getByRole('textbox', { name: /add collection/i });
    const button = screen.getByRole('button', { name: /add collection/i });
    await userEvent.type(input, 'test collection');
    await userEvent.click(button);

    expect(handler).toHaveBeenCalledWith(
        {
            title: 'test collection',
            description: 'test collection',
        },
        folderId
    );
});
