import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
import { render } from './testUtils';
import { render as rtlRender } from '@testing-library/react';
// todo - create a testContent context (with store)
import { ContentScriptForTest } from './ContentScriptForTest';
import { IsChrome } from './IsChrome';

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

// todo
test('render displays component with state', async () => {
    // render(<ContentScriptForTest />);
    render(<IsChrome />);
    //screen.debug();
    //expect(screen.getByText('something')).toBeInTheDocument();
});

test('render displays component with state', async () => {
    expect(chrome.storage).toBeTruthy;
    render(<ContentScriptForTest />);
    //screen.debug();
    expect(screen.getByText('add new collection')).toBeInTheDocument();
});

// todo - render entire context
