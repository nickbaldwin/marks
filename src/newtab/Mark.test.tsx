import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
import { render } from '../testSetup/testUtils';
import { MarkItem } from './Mark';

test('render displays Mark', async () => {
    render(
        <MarkItem
            mark={{
                id: '123',
                url: 'http://localhost:8080',
                title: 'local',
                originalDescription: '',
                createdAt: 100000,
                description: '',
                originalTitle: 'localhost',
                updatedAt: 1000002,
                version: 1,
            }}
            position={0}
        />
    );
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('local')).toBeInTheDocument();
    expect(screen.getByText(/localhost:8080/)).toBeInTheDocument();
});
