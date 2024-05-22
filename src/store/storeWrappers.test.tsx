import { screen } from '@testing-library/react';
import { render } from '../testSetup/testUtils';

// import { State, useStore } from './storeWrappers';

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

test.skip('render TestComponent works', async () => {
    const TestComponent = () => {
        // const version: number = useStore((state: State) => state.version);
        const version = 0;

        return <p>version {version}</p>;
    };
    expect(chrome).toBeTruthy;
    render(<TestComponent />);
    expect(screen.getByText('version 0')).toBeInTheDocument();
});
