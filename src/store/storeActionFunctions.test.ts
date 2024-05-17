import { BasicInfo, Folder, FoldersMap } from './schema';
import { expect } from 'vitest';

// this will be used in early dev process to check functions, then skipped and
// behaviour will be checked by rendering components directly

describe('increase', () => {
    it('increase fn works', () => {
        let state = { bears: 0 };
        const inc = (by: number): void => {
            const fn = (state: { bears: number }) => ({
                bears: state.bears + by,
            });
            state = fn(state);
        };
        inc(1);
        expect(state).toEqual({ bears: 1 });
        inc(2);
        expect(state).toEqual({ bears: 3 });
    });
});

describe('add folder', () => {
    it('adds a folder', () => {
        let state = { foldersList: ['1'], foldersMap: {} };
        const addFolder = (folder: BasicInfo): void => {
            const f = new Folder(folder);
            const fn = (state: {
                foldersList: string[];
                foldersMap: FoldersMap;
            }) => ({
                foldersList: [...state.foldersList, f.id],
                foldersMap: {
                    ...state.foldersMap,
                    [f.id]: f,
                },
            });
            state = fn(state);
        };
        addFolder({
            title: 'folder',
            description: 'folder',
        });
        expect(state.foldersList.length).toEqual(2);
        const id = state.foldersList[1];
        expect(state).toEqual({
            foldersList: ['1', id],
            foldersMap: {
                [id]: expect.objectContaining({
                    id: id,
                    title: 'folder',
                    description: 'folder',
                    list: [],
                    version: 1,
                    createdAt: expect.anything(),
                    updatedAt: expect.anything(),
                }),
            },
        });
    });
});
