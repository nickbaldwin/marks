import { screen } from '@testing-library/react';
import { render } from './testUtils';
import { render as rtlRender } from '@testing-library/react';

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
