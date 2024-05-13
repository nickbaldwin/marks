import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
import { render } from './testUtils';
import { render as rtlRender } from '@testing-library/react';
// todo - create a testContent context (with store)
// import { Content } from './Content';

import { State } from '../store/store';
import { useTestStore } from '../store/testStore';
import { CollectionsList } from '../store/schema';

test(`storage.local mock works`, async () => {
    expect(chrome.storage).toBeTruthy;
    expect(chrome.storage.local).toBeTruthy;
    chrome.storage.local.set({ test: 'works' });
    // todo - deal with promise
    // await waitFor(() => expect(chrome.storage).toBeTruthy);
    expect(chrome.storage.local.get('test')).toEqual({
        test: 'works',
    });
});

test('render works', async () => {
    rtlRender(<p>hello</p>);
    expect(screen.getByText('hello')).toBeInTheDocument();
});

// todo - add button
test('component using store can be rendered', async () => {
    const FakeComponent = () => {
        const collectionsList: CollectionsList = useTestStore(
            (state: State) => state.collectionsList
        );
        return (
            <p>
                {collectionsList?.length === undefined
                    ? ':-('
                    : collectionsList?.length}
            </p>
        );
    };
    rtlRender(<FakeComponent />);
    expect(screen.getByText('0')).toBeInTheDocument();
});

test('renderComponent works', async () => {
    render(<p>hello</p>);
    //screen.debug();
    expect(screen.getByText('hello')).toBeInTheDocument();
});

// todo
test.skip('render displays component with state', async () => {
    // render(<Content />);
    //screen.debug();
    //expect(screen.getByText('something')).toBeInTheDocument();
});

// todo - render entire context
