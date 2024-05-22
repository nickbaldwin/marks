import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('render displays component with reference to chrome inside function component', async () => {
    // note that if the reference to chrome is outside, it will not work e.g. in node modules
    // todo - work out why!
    render(<IsChrome />);
});

test('render displays component with state', async () => {
    render(<ContentScriptForTest />);
    expect(screen.getByText(/bears: 0/)).toBeInTheDocument();
    expect(screen.getByText(/add collection/i)).toBeInTheDocument();
});

test('can interact with stateful component', async () => {
    expect(chrome.storage).toBeTruthy;
    render(<ContentScriptForTest />);

    expect(screen.getByText(/bears: 0/)).toBeInTheDocument();
    expect(screen.getByText(/add collection/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /add collection/i });
    expect(button).toBeInTheDocument();
    const input = screen.getByRole('textbox', { name: /add collection/i });
    expect(input).toBeInTheDocument();
    await userEvent.type(input, 'test collection');
    await userEvent.click(button);
    // screen.debug();
    // expect(screen.getByText('test collection')).toBeInTheDocument();

    const bears = screen.getByRole('button', { name: 'increase' });
    expect(bears).toBeInTheDocument();
    await userEvent.click(bears);

    expect(screen.getByText(/bears: 1/)).toBeInTheDocument();
});

// todo - render entire context
