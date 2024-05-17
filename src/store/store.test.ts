import { act, renderHook } from '@testing-library/react-hooks';

// import { addFolder, State, defaultStateValues, storeCreator } from './store';
// import { BasicInfo, CollectionsMap, version } from './schema';

import { storeCreator } from './store';
import { version } from './schema';

// todo - move into test setup or utils
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
});
//
//

test('expected default state', async () => {
    // const store = useBoundStore();
    // expect(store).toEqual({});
});

test('expected default state', async () => {
    // const store = useBoundStore();
    // expect(store).toEqual({});
});

describe('use test store', () => {
    const useStore = createStoreForTest()(storeCreator);

    it('has expected default state', () => {
        const { result } = renderHook(() => useStore());
        expect(result.current.bears).toEqual(0);
        expect(result.current.version).toEqual(version);
        expect(result.current.marksList.length).toEqual(0);
        expect(typeof result.current.addFolder).toEqual('function');
    });

    it('increments', () => {
        const { result } = renderHook(() => useStore());
        expect(result.current.bears).toEqual(0);
        act(() => result.current.increase(3));
        expect(result.current.bears).toEqual(3);
        act(() => result.current.increase(1));
        expect(result.current.bears).toEqual(4);
    });
});
