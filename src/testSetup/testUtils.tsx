import '@testing-library/jest-dom';
import { render as rtlRender } from '@testing-library/react';

// @ts-expect-error todo
function render(ui, { ...options } = {}) {
    // @ts-expect-error todo
    const Wrapper = ({ children }) => <div>{children}</div>;
    return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
// override React Testing Library's render with our own
export { render };
