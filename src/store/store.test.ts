import { act, renderHook } from '@testing-library/react-hooks';
import { createStoreForTest } from '../testSetup/testSetup';
import { storeCreator } from './store';
import { Folder, version } from './schema';
import { expect } from 'vitest';

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

describe('use test store - folders', () => {
    const useStore = createStoreForTest()(storeCreator);

    it('can add folder', () => {
        const { result } = renderHook(() => useStore());
        expect(result.current.foldersList).toEqual([]);
        const folder = new Folder({
            title: 'folder',
            description: 'description',
        });
        act(() => result.current.addFolder(folder));
        expect(result.current.foldersList.length).toEqual(1);
        const id = result.current.foldersList[0];
        expect(result.current.foldersList).toEqual([id]);
        expect(result.current.foldersMap).toEqual({
            [id]: expect.objectContaining({
                id: id,
                title: 'folder',
                description: 'description',
                list: [],
                version: 1,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            }),
        });
    });

    it('can add then remove folder', () => {
        const { result } = renderHook(() => useStore());
        expect(result.current.foldersList).toEqual([]);
        const folder = new Folder({
            title: 'folder',
            description: 'description',
        });
        act(() => result.current.addFolder(folder));
        expect(result.current.foldersList.length).toEqual(1);
        const id = result.current.foldersList[0];
        expect(result.current.foldersMap[id]).toBeTypeOf('object');
        act(() => result.current.removeFolder(id));
        expect(result.current.foldersList.length).toEqual(0);
        expect(result.current.foldersMap).toEqual({});
    });
});
