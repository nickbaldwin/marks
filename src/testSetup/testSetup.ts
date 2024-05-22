// import { vi } from 'vitest';

// todo needed here?
import '@testing-library/jest-dom';

import { act } from '@testing-library/react-hooks';
import { create as actualCreate, StateCreator } from 'zustand';
// import { produce } from 'immer';
import { Collection, Folder } from '../store/schema';
// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set<() => void>();
// when creating a store, we get its initial state, create a reset function and add it in the set
export const createStoreForTest =
    () =>
    <S>(createState: StateCreator<S>) => {
        const store = actualCreate(createState);
        // const initialState = store.getState();
        const initialState = {
            ...store.getState(),
            collectionsMap: {
                inbox: new Collection(
                    {
                        title: 'inbox',
                        description: 'inbox',
                    },
                    'inbox'
                ),
            },
            foldersMap: {
                default: new Folder(
                    {
                        title: 'default',
                        description: 'default',
                    },
                    'default'
                ),
            },
        };

        storeResetFns.add(() => store.setState(initialState, true));
        return store;
    };
// Reset all stores after each test run
beforeEach(() => {
    act(() => storeResetFns.forEach((resetFn) => resetFn()));

    // also
    chrome.storage.local.clear();
});
afterEach(() => {
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

    // todo

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

    // todo - see if can mock chrome in order to use node packages referring to chrome (and to storage)
    // global.chrome = chromeMock;
    vi.stubGlobal('chrome', chromeMock);

    /**
     const mock = {
     storage: {
     local: {
     get: () => {
     },
     },
     },
     };

     Object.defineProperty(window, 'chrome', {
     value: mock,
     writable: true,
     });

     Object.defineProperty(global, 'chrome', {
     value: mock,
     writable: true,
     });

     Object.defineProperty(globalThis, 'chrome', {
     value: mock,
     writable: true,
     });


     const localStorageMock = (function() {
     const store = {};
     return {
     getItem: function(key) {
     return store[key];
     },
     setItem: function(key, value) {
     store[key] = value.toString();
     },
     clear: function() {
     store = {};
     },
     removeItem: function(key) {
     delete store[key];
     },
     };
     })();
     // Object.defineProperty(window, 'localStorage', { value: localStorageMock });

     Object.defineProperty(global, 'chrome', { value: chromeMock, writable: true });
     Object.defineProperty(globalThis, 'chrome', { value: chromeMock, writable: true });
     Object.defineProperty(window, 'chrome', { value: chromeMock, writable: true });

     **/
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
