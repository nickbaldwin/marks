import { act, renderHook } from '@testing-library/react-hooks';
import { createStoreForTest } from '../testSetup/testSetup';
import { storeCreator } from './store';
import { version } from './schema';

// import { addFolder, State, defaultStateValues, storeCreator } from './store';
// import { BasicInfo, CollectionsMap, version } from './schema';

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
