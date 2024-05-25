import { create } from 'zustand';
import { includeChromeStore } from 'zustand-chrome-local-storage';
// import { wrapStore } from 'webext-zustand';

// this is just for testing use of wrapper - see associated test file
// at the moment they cannot be used in tests - due to reference to chrome
// in the modules

export interface State {
    version: number;
}

export const storeCreator = () => ({
    version: 0,
});

export const useStore = create<State>()(
    // @ts-expect-error type?
    includeChromeStore(storeCreator)
);
