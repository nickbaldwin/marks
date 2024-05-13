import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
import { render } from '../testSetup/testUtils';
// import { State } from '../store/store';
// import { useTestStore } from '../store/testStore';

test('render works', async () => {
    render(<p>hello</p>);
    expect(screen.getByText('hello')).toBeInTheDocument();
});

// todo
test('render content context works', async () => {
    // renderComponent(<Content />);
    //screen.debug();
    //expect(screen.getByText('monster')).toBeInTheDocument();
});
