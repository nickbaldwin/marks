// import { vi } from 'vitest';

// todo needed here?
import '@testing-library/jest-dom';

import { act } from '@testing-library/react-hooks';
import { create as actualCreate, StateCreator } from 'zustand';
// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set<() => void>();
// when creating a store, we get its initial state, create a reset function and add it in the set
export const createStoreForTest =
    () =>
    <S>(createState: StateCreator<S>) => {
        const store = actualCreate(createState);
        console.log('store', store);
        const initialState = store.getState();
        storeResetFns.add(() => store.setState(initialState, true));
        return store;
    };
// Reset all stores after each test run
beforeEach(() => {
    act(() => storeResetFns.forEach((resetFn) => resetFn()));

    // also
    chrome.storage.local.clear();
});

beforeAll(() => {
    // todo
    interface LS {
        //
        [key: string]: string;
    }

    let localStorage: LS = {
        example: 'foobar',
    };

    const chromeMock = {
        storage: {
            local: {
                clear: () => {
                    localStorage = {};
                    return new Promise(() => {
                        return;
                    });
                },
                // @ts-expect-error todo
                set: (toMergeIntoStorage) => {
                    localStorage = { ...localStorage, ...toMergeIntoStorage };
                    return new Promise(() => {
                        return;
                    });
                },
                // @ts-expect-error todo
                get: (keysToInclude) => {
                    if (
                        typeof keysToInclude === 'string' &&
                        localStorage[keysToInclude]
                    ) {
                        // return new Promise(() => {
                        return { [keysToInclude]: localStorage[keysToInclude] };
                        // });
                    } else
                        return new Promise(() => {
                            return;
                        });
                },
            },
        },
        runtime: {
            getManifest: (): chrome.runtime.ManifestV3 => {
                return {
                    manifest_version: 3,
                    name: 'marks',
                    version: '0.0.1',
                };
            },
        },
        extension: {
            getBackgroundPage: () => {
                return null;
            },
        },

        tabs: {
            query: vi.fn((_queryInfo, callback) => {
                callback([{ id: 123 }]);
            }),

            // create: vi.fn(({ url }: { url: string }) => {}),
        },
        sidePanel: {
            open: vi.fn(),
        },
        commands: {
            getAll: vi.fn(() => {
                return [];
            }),
        },
    };

    // global.chrome = chromeMock;
    vi.stubGlobal('chrome', chromeMock);
});

/**
 *
 * beforeEach(() => {
 *     chrome.storage.local.clear();
 * });
 *
 *
 beforeAll(() => {
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

// beforeAll(() => server.listen())
// afterAll(() => server.close())
// afterEach(() => server.resetHandlers())
