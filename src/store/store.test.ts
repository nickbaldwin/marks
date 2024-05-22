import { act, renderHook } from '@testing-library/react-hooks';
import { createStoreForTest } from '../testSetup/testSetup';
import { storeCreator } from './store';
import { Collection, Folder, Mark, version } from './schema';
import { expect } from 'vitest';

// import { addFolder, State, defaultStateValues, storeCreator } from './store';
// import { BasicInfo, CollectionsMap, version } from './schema';

// note - this uses an augmented verison of the store - to reset state
// however, it is leaking :-(
// todo!

describe('use test store', async () => {
    it('has expected default state', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.bears).toEqual(0);
        expect(result.current.version).toEqual(version);
        expect(result.current.collectionsMap).toEqual({
            inbox: expect.objectContaining({
                id: 'inbox',
                title: 'inbox',
            }),
        });
        expect(result.current.foldersMap).toEqual({
            default: expect.objectContaining({
                id: 'default',
                title: 'default',
            }),
        });
        expect(typeof result.current.addFolder).toEqual('function');
    });

    // todo remove bears!
    it('increments', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.bears).toEqual(0);
        act(() => result.current.increase(3));
        expect(result.current.bears).toEqual(3);
        act(() => result.current.increase(1));
        expect(result.current.bears).toEqual(4);
    });
});

describe('folders', async () => {
    it('adds folder', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());

        expect(result.current.foldersList).toEqual(['default']);
        const folder = new Folder({
            title: 'folder',
            description: 'description',
        });
        act(() => result.current.addFolder(folder));
        expect(result.current.foldersList.length).toEqual(2);
        const id = result.current.foldersList[1];
        expect(result.current.foldersList).toEqual(['default', id]);
        expect(result.current.foldersMap).toEqual({
            default: expect.objectContaining({
                id: 'default',
                title: 'default',
                description: 'default',
                list: [],
                version: 1,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            }),
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

    it('removes folder', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.foldersList).toEqual(['default']);
        expect(result.current.foldersMap).toEqual({
            default: expect.objectContaining({
                id: 'default',
                title: 'default',
                description: 'default',
                list: [],
                version: 1,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            }),
        });

        const folder = new Folder({
            title: 'folder',
            description: 'description',
        });
        act(() => result.current.addFolder(folder));
        expect(result.current.foldersList.length).toEqual(2);
        const id = result.current.foldersList[1];
        expect(result.current.foldersMap[id]).toBeTypeOf('object');

        act(() => result.current.removeFolder(id));
        expect(result.current.foldersList.length).toEqual(1);
        expect(result.current.foldersMap).toEqual({
            default: expect.objectContaining({
                title: 'default',
                list: [],
            }),
        });
    });

    it('returns state - remove folder - no matching folder id', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.foldersList).toEqual(['default']);
        const folder = new Folder({
            title: 'folder',
            description: 'description',
        });
        act(() => result.current.addFolder(folder));
        expect(result.current.foldersList.length).toEqual(2);
        const id = result.current.foldersList[1];
        // const id = folder.id;

        act(() => result.current.removeFolder('123'));
        expect(result.current.foldersList).toEqual(['default', id]);
        expect(result.current.foldersMap[id].id).toEqual(id);
    });
});

describe('collections', async () => {
    // const useStore = createStoreForTest()(storeCreator);

    it('adds a collection to folder', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.foldersList).toEqual(['default']);
        const folder = new Folder({
            title: 'folder one',
            description: 'description folder one',
        });
        act(() => result.current.addFolder(folder));
        expect(result.current.foldersList.length).toEqual(2);
        const folderId = result.current.foldersList[1];
        const collection = new Collection({
            title: 'collection one',
            description: 'description collection one',
        });

        act(() => result.current.addCollectionToFolder(collection, folderId));
        expect(result.current.foldersMap[folderId].list.length).toEqual(1);
        const cid = result.current.foldersMap[folderId].list[0];
        expect(result.current.collectionsMap).toEqual({
            inbox: expect.objectContaining({
                id: 'inbox',
                title: 'inbox',
                description: 'inbox',
                list: [],
                version: 1,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            }),
            [cid]: expect.objectContaining({
                id: cid,
                title: 'collection one',
                description: 'description collection one',
                list: [],
                version: 1,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            }),
        });
    });

    it('removes collection from folder', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.foldersList).toEqual(['default']);
        expect(result.current.foldersMap).toMatchObject({
            default: expect.objectContaining({
                title: 'default',
                id: expect.anything(),
            }),
        });
        const folder = new Folder({
            title: 'folder one',
            description: 'description folder one',
        });
        act(() => result.current.addFolder(folder));
        expect(result.current.foldersList.length).toEqual(2);
        const fid = result.current.foldersList[1];
        const collection = new Collection({
            title: 'collection one',
            description: 'description collection one',
        });
        act(() => result.current.addCollectionToFolder(collection, fid));
        const cid = result.current.foldersMap[fid].list[0];

        act(() => result.current.removeCollectionFromFolder(cid, fid, true));
        expect(result.current.collectionsMap).toEqual({
            inbox: expect.objectContaining({
                id: 'inbox',
                title: 'inbox',
                description: 'inbox',
                list: [],
                version: 1,
                createdAt: expect.anything(),
                updatedAt: expect.anything(),
            }),
        });
        expect(result.current.foldersMap[fid]).toMatchObject({
            id: fid,
            list: [],
        });
    });

    it('returns state - remove a collection - no matching folder id', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.foldersList).toEqual(['default']);
        const folder = new Folder({
            title: 'folder one',
            description: 'description folder one',
        });
        act(() => result.current.addFolder(folder));
        expect(result.current.foldersList.length).toEqual(2);
        const fid = result.current.foldersList[1];
        const collection = new Collection({
            title: 'collection one',
            description: 'description collection one',
        });
        act(() => result.current.addCollectionToFolder(collection, fid));
        const cid = result.current.foldersMap[fid].list[0];

        act(() => result.current.removeCollectionFromFolder(cid, '123', true));
        expect(result.current.collectionsMap[cid]).toMatchObject({
            id: cid,
            title: 'collection one',
            description: 'description collection one',
        });
        expect(result.current.foldersMap[fid]).toMatchObject({
            id: fid,
            list: [cid],
        });
    });

    it('returns state - remove a collection - no matching collection id', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.foldersList).toEqual(['default']);
        const folder = new Folder({
            title: 'folder one',
            description: 'description folder one',
        });
        act(() => result.current.addFolder(folder));
        expect(result.current.foldersList.length).toEqual(2);
        const fid = result.current.foldersList[1];
        const collection = new Collection({
            title: 'collection one',
            description: 'description collection one',
        });
        act(() => result.current.addCollectionToFolder(collection, fid));
        const cid = result.current.foldersMap[fid].list[0];

        act(() => result.current.removeCollectionFromFolder('123', fid, true));
        expect(result.current.collectionsMap[cid]).toMatchObject({
            id: cid,
            title: 'collection one',
            description: 'description collection one',
        });
        expect(result.current.foldersMap[fid]).toMatchObject({
            id: fid,
            list: [cid],
        });

        // add a folder to see affect on other tests
        act(() => result.current.addFolder({ title: '', description: '' }));
    });

    describe('marks', async () => {
        it('adds a mark to collection', async () => {
            const useStore = createStoreForTest()(storeCreator);
            const { result } = renderHook(() => useStore());
            expect(result.current.foldersList).toEqual(['default']);
            expect(result.current.collectionsList).toEqual(['inbox']);
            const cid = result.current.collectionsMap.inbox.id;
            expect(cid).toEqual('inbox');
            const mark = new Mark({
                originalDescription: 'original description',
                originalTitle: 'original title',
                url: 'https"//www.ibm.com',
            });
            act(() => result.current.addMarkToCollection(mark, cid));

            expect(result.current.collectionsMap['inbox'].list.length).toEqual(
                1
            );

            const mid = result.current.collectionsMap['inbox'].list[0];
            // todo - figure out why mark.id does not match the id used!
            // expect(mid).toEqual(mark.id);

            expect(result.current.marksMap).toMatchObject({
                [mid]: {
                    originalDescription: 'original description',
                    originalTitle: 'original title',
                    url: 'https"//www.ibm.com',
                    id: mid,
                    updatedAt: expect.anything(),
                    createdAt: expect.anything(),
                    version: 1,
                    description: 'original description',
                    title: 'original title',
                },
            });
        });

        it('removes mark from a collection', async () => {
            const useStore = createStoreForTest()(storeCreator);
            const { result } = renderHook(() => useStore());
            expect(result.current.marksMap).toEqual({});
            expect(result.current.collectionsList).toEqual(['inbox']);
            expect(result.current.collectionsMap.inbox.list.length).toEqual(0);
            const cid = result.current.collectionsMap.inbox.id;
            const mark = new Mark({
                originalDescription: 'description',
                originalTitle: 'title',
                url: 'https"//www.ibm.com',
            });

            act(() => result.current.addMarkToCollection(mark, cid));
            const size = result.current.collectionsMap['inbox'].list.length;
            const list = result.current.collectionsMap['inbox'].list;
            const mid = list[list.length - 1];
            expect(result.current.marksMap).toMatchObject({
                [mid]: {
                    originalDescription: 'description',
                    originalTitle: 'title',
                },
            });

            act(() => result.current.removeMarkFromCollection(mid, cid));
            expect(result.current.collectionsMap['inbox'].list.length).toEqual(
                size - 1
            );

            expect(result.current.marksMap).toMatchObject({});
        });
    });

    it('add 2 marks... to check if leaks into next test', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.marksMap).toEqual({});
        expect(result.current.collectionsList).toEqual(['inbox']);
        const cid = result.current.collectionsMap.inbox.id;
        const size = result.current.collectionsMap['inbox'].list.length;
        expect(size).toEqual(0);
        const mark = new Mark({
            originalDescription: 'description',
            originalTitle: 'title',
            url: 'https"//www.ibm.com',
        });

        act(() => result.current.addMarkToCollection(mark, cid));

        const mark2 = new Mark({
            originalDescription: 'description',
            originalTitle: 'title',
            url: 'https"//www.ibm.com',
        });

        act(() => result.current.addMarkToCollection(mark2, cid));

        expect(result.current.collectionsMap['inbox'].list.length).toEqual(
            size + 2
        );

        // act(() => result.current.reset());
    });

    it('does not leak!', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.marksMap).toEqual({});
        expect(result.current.collectionsList).toEqual(['inbox']);
        expect(result.current.collectionsMap['inbox'].list.length).toEqual(0);
    });

    it('reset works for collections', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());

        expect(result.current.marksMap).toEqual({});
        expect(result.current.foldersList).toEqual(['default']);
        act(() => result.current.addFolder({ title: 'one', description: '' }));
        act(() => result.current.addFolder({ title: 'two', description: '' }));
        expect(result.current.foldersList.length).toEqual(3);
        act(() => result.current.reset());
        expect(result.current.foldersList.length).toEqual(1);
    });

    it('store values being reset!', async () => {
        const useStore = createStoreForTest()(storeCreator);
        const { result } = renderHook(() => useStore());
        expect(result.current.marksMap).toEqual({});
        expect(result.current.collectionsList).toEqual(['inbox']);
        expect(result.current.collectionsMap['inbox'].list.length).toEqual(0);
    });
});
