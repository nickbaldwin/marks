import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
import { render } from './testUtils';
import { render as rtlRender } from '@testing-library/react';
// todo - create a testContent context (with store)
// import { Content } from './Content';

import { State, storeCreator } from '../store/store';
import { CollectionsList } from '../store/schema';
import { createStoreForTest } from './testSetup';

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

test('component using store can be rendered', async () => {
    const FakeComponent = () => {
        const useStore = createStoreForTest()(storeCreator);
        // @ts-expect-error todo use named exports
        const bears: number = useStore((state: State) => state.bears);
        return <p>{bears === undefined ? ':-(' : bears}</p>;
    };
    rtlRender(<FakeComponent />);
    expect(screen.getByText('0')).toBeInTheDocument();
});

test('component using store can be rendered', async () => {
    const FakeComponent = () => {
        const useStore = createStoreForTest()(storeCreator);

        const collectionsList: CollectionsList = useStore(
            // @ts-expect-error todo use named exports
            (state: State) => state.collectionsList
        );
        return (
            <p>
                {collectionsList === undefined ? ':-(' : collectionsList.length}
            </p>
        );
    };
    rtlRender(<FakeComponent />);
    // todo
    expect(screen.getByText('1')).toBeInTheDocument();
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
