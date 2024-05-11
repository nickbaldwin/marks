import { vi } from 'vitest';
// if need to mock apis
// import { server } from '../__mockSetup__/server';
// needed here?
import '@testing-library/jest-dom';

beforeAll(() => {
    vi.stubGlobal('scrollTo', vi.fn());

    /**
     // mock Chakra useBreakpointValue hook:
     vi.mock('@chakra-ui/react', async () => {
     const mod = await vi.importActual('@chakra-ui/react');
     return {
     ...(mod as Record<string, unknown>),
     useBreakpointValue: vi.fn().mockImplementation(() => 'sm'),
     };
     });

     // mock Chakra useColorModeValue hook:
     Object.defineProperty(window, "matchMedia", {
     writable: true,
     value: vi.fn().mockImplementation((query) => ({
     matches: false,
     media: query,
     onchange: null,
     addListener: vi.fn(), // Deprecated
     removeListener: vi.fn(), // Deprecated
     addEventListener: vi.fn(),
     removeEventListener: vi.fn(),
     dispatchEvent: vi.fn(),
     })),
     });

     vi.stubGlobal('scrollTo', vi.fn());

     server.listen({ onUnhandledRequest: 'error' });

     **/
});
