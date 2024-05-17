import { create } from 'zustand';
// import { includeChromeStore } from 'zustand-chrome-local-storage';
import { includeChromeStore } from './includeChromeStore';

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

// dealing with test environment - cannot reference node outside of a function component?!
export interface State {
    version: number;

    bears: number;
    increase: (by: number) => void;
    lastMark: string;

    marksList: MarksList;
    marksMap: MarksMap;
    addMark: (add: UrlInfo) => void;
    removeMark: (id: string) => void;
    addMarkToCollection: (add: UrlInfo, id: string) => void;

    collectionsList: CollectionsList;
    collectionsMap: CollectionsMap;
    addCollection: (add: BasicInfo) => void;
    addCollectionToFolder: (add: BasicInfo, id: string) => string;
    removeCollection: (id: string) => void;

    foldersList: FoldersList;
    foldersMap: FoldersMap;
    addFolder: (add: BasicInfo) => void;
    removeFolder: (id: string) => void;
}

export const useBoundStore = create<State>()(
    // @ts-expect-error type?
    includeChromeStore((set) => ({
        version,
        bears: 0,
        increase: (by: number) =>
            set((state: { bears: number }) => ({ bears: state.bears + by })),
        lastMark: '',

        marksList: [],
        marksMap: {},

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

        collectionsList: [],
        collectionsMap: {},

        // todo remove
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
                                list: [
                                    ...state.foldersMap[id].list,
                                    collection.id,
                                ],
                            },
                        },
                        collectionsList: [
                            ...state.collectionsList,
                            collection.id,
                        ],
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

        foldersList: [],
        foldersMap: {},

        removeFolder: (id: string) => {
            console.log('removeFolder', id);
        },
    }))
);

export const addFolder = (add: BasicInfo) => {
    const folder = new Folder(add);
    useBoundStore.setState(
        (state: { foldersList: string[]; foldersMap: FoldersMap }) => ({
            foldersList: [...state.foldersList, folder.id],
            foldersMap: {
                ...state.foldersMap,
                [folder.id]: folder,
            },
        })
    );
};

// don't wrap if in test
export const storeReadyPromise = !globalThis.chrome?.storage?.local?.get
    ? null
    : wrapStore(useBoundStore);

export default useBoundStore;
