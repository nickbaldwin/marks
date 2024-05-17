import { create } from 'zustand';
// import { includeChromeStore } from 'zustand-chrome-local-storage';
import { includeChromeStore } from './includeChromeStore';

import { produce } from 'immer';

import { wrapStore } from 'webext-zustand';
import {
    version,
    Mark,
    MarksList,
    MarksMap,
    Collection,
    CollectionsList,
    CollectionsMap,
    Folder,
    FoldersList,
    FoldersMap,
    UrlInfo,
    BasicInfo,
} from './schema';

// wrapStore: <T>(store: StoreApi<T>) => Promise<void>;

export interface StateValues {
    version: number;
    bears: number;
    lastMark: string;
    marksList: MarksList;
    marksMap: MarksMap;
    collectionsList: CollectionsList;
    collectionsMap: CollectionsMap;
    foldersList: FoldersList;
    foldersMap: FoldersMap;
}

export interface StateActions {
    increase: (by: number) => void;
    addMark: (add: UrlInfo) => void;
    removeMark: (id: string) => void;
    addMarkToCollection: (add: UrlInfo, id: string) => void;
    addCollection: (add: BasicInfo) => void;
    addCollectionToFolder: (add: BasicInfo, id: string) => string;
    removeCollection: (id: string) => void;
    addFolder: (add: BasicInfo) => void;
    removeFolder: (id: string) => void;
}

export type State = StateValues & StateActions;

export const defaultStateValues: StateValues = {
    version,
    bears: 0,
    lastMark: '',
    marksList: [],
    marksMap: {},
    collectionsList: [],
    collectionsMap: {},
    foldersList: [],
    foldersMap: {},
};

// type fn = (state: Partial<StateValues>) => Partial<StateValues>;
// todo next
// @ts-expect-error todo
export const storeCreator = (set) => ({
    ...defaultStateValues,

    increase: (by: number): void => {
        set((state: { bears: number }) => ({
            bears: state.bears + by,
        }));
    },

    addMark: (add: UrlInfo) => {
        const mark = new Mark(add);
        set((state: { marksList: string[]; marksMap: MarksMap }) => ({
            marksList: [...state.marksList, mark.id],
            marksMap: {
                ...state.marksMap,
                [mark.id]: mark,
            },
        }));
    },
    addMarkToCollection: (add: UrlInfo, id: string) => {
        const mark = new Mark(add);
        set(
            (state: {
                marksList: string[];
                marksMap: MarksMap;
                collectionsMap: CollectionsMap;
            }) => ({
                collectionsMap: {
                    ...state.collectionsMap,
                    [id]: {
                        ...state.collectionsMap[id],
                        list: [...state.collectionsMap[id].list, mark.id],
                    },
                },
                marksMap: {
                    ...state.marksMap,
                    [mark.id]: mark,
                },
            })
        );
    },
    removeMark: (id: string) => {
        set((state: { marksList: string[]; marksMap: MarksMap }) => {
            if (!state.marksMap[id]) {
                return state;
            } else {
                const i = state.marksList.indexOf(id);
                const list = [...state.marksList];
                if (i > -1) {
                    list.splice(i, 1);
                }
                const map = { ...state.marksMap };
                delete map[id];
                return {
                    marksList: list,
                    marksMap: map,
                };
            }
        });
    },
    addCollection: (add: BasicInfo) => {
        console.log(add);
    },
    addCollectionToFolder: (add: BasicInfo, id: string): string => {
        const collection = new Collection(add);
        set(
            (state: {
                foldersList: string[];
                foldersMap: FoldersMap;
                collectionsList: string[];
                collectionsMap: CollectionsMap;
            }) => {
                if (!state.foldersMap[id]) {
                    return state;
                }
                return {
                    foldersList: state.foldersList,
                    foldersMap: {
                        ...state.foldersMap,
                        [id]: {
                            ...state.foldersMap[id],
                            list: [...state.foldersMap[id].list, collection.id],
                        },
                    },
                    collectionsList: [...state.collectionsList, collection.id],
                    collectionsMap: {
                        ...state.collectionsMap,
                        [collection.id]: collection,
                    },
                };
            }
        );
        return collection.id;
    },
    removeCollection: (id: string) => {
        set(
            (state: {
                collectionsList: string[];
                collectionsMap: CollectionsMap;
            }) => {
                if (!state.collectionsMap[id]) {
                    return state;
                } else {
                    const i = state.collectionsList.indexOf(id);
                    const list = [...state.collectionsList];
                    if (i > -1) {
                        list.splice(i, 1);
                    }
                    const map = { ...state.collectionsMap };
                    delete map[id];
                    return {
                        collectionsList: list,
                        collectionsMap: map,
                    };
                }
            }
        );
    },
    removeFolder: (id: string) => {
        set(
            produce((state: State) => {
                state.foldersList = state.foldersList.filter(
                    (iid) => iid !== id
                );
                delete state.foldersMap[id];
            })
        );
    },
    addFolder: (basicInfo: BasicInfo) => {
        const folder = new Folder(basicInfo);
        set(
            produce((state: State) => {
                state.foldersList.push(folder.id);
                state.foldersMap[folder.id] = folder;
            })
        );
    },
});

export const useBoundStore = create<State>()(
    // @ts-expect-error type?
    includeChromeStore(storeCreator)
);

// don't wrap if in test
export const storeReadyPromise = !globalThis.chrome?.storage?.local?.get
    ? null
    : wrapStore(useBoundStore);

export default useBoundStore;

export const useIncrease = () => useBoundStore((state) => state.increase);
