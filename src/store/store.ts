import { create } from 'zustand';
// import { includeChromeStore } from 'zustand-chrome-local-storage';
import { includeChromeStore } from './includeChromeStore';

import { produce } from 'immer';

import { wrapStore } from 'webext-zustand';
import {
    version,
    Mark,
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
    marksMap: MarksMap;
    collectionsList: CollectionsList;
    collectionsMap: CollectionsMap;
    foldersList: FoldersList;
    foldersMap: FoldersMap;
}

export interface StateActions {
    increase: (by: number) => void;
    addMarkToCollection: (
        urlInfo: UrlInfo,
        collectionId: string,
        position?: number
    ) => void;

    moveMarkBetweenCollection: (
        markId: string,
        oldCollectionId: string,
        newCollectionId: string,
        overId: string,
        insert: string,
        position?: number
    ) => void;

    moveMark: (markId: string, collectionId: string, overId: string) => void;

    removeMarkFromCollection: (markId: string, collectionId: string) => void;
    addCollectionToFolder: (basicInfo: BasicInfo, folderId: string) => string;
    removeCollectionFromFolder: (
        collectionId: string,
        folderId: string,
        isRemoveMarks: boolean
    ) => void;
    moveCollectionInFolder: (
        folderId: string,
        collectionId: string,
        position: number,
        newPosition: number
    ) => void;
    addFolder: (basicInfo: BasicInfo) => void;
    removeFolder: (folderId: string) => void;
    reset: () => void;
}

export type State = StateValues & StateActions;

export const defaultStateValues: StateValues = {
    version,
    bears: 0,
    lastMark: '',
    marksMap: {},
    collectionsList: ['inbox'],
    collectionsMap: {
        inbox: new Collection(
            {
                title: 'inbox',
                description: 'inbox',
            },
            'inbox'
        ),
    },
    foldersList: ['default'],
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

// type fn = (state: Partial<StateValues>) => Partial<StateValues>;
// todo next
// @ts-expect-error todo
export const storeCreator = (set) => ({
    ...produce(defaultStateValues, (draft) => {
        (draft.collectionsMap = {
            inbox: new Collection(
                {
                    title: 'inbox',
                    description: 'inbox',
                },
                'inbox'
            ),
        }),
            (draft.foldersMap = {
                default: new Folder(
                    {
                        title: 'default',
                        description: 'default',
                    },
                    'default'
                ),
            });
    }),

    increase: (by: number): void => {
        set((state: { bears: number }) => ({
            bears: state.bears + by,
        }));
    },

    addMarkToCollection: (
        urlInfo: UrlInfo,
        collectionId: string,
        position?: number
    ) => {
        const mark = new Mark(urlInfo);
        const mid = mark.id;
        set(
            produce((state: State) => {
                if (state.collectionsMap[collectionId]) {
                    const list = state.collectionsMap[collectionId].list;
                    state.marksMap[mid] = mark;
                    if (!position) {
                        list.push(mid);
                    }
                    const length = list.length;
                    if (position && position < length) {
                        state.collectionsMap[collectionId].list = list
                            .slice(0, position)
                            .concat(mid)
                            .concat(list.slice(position + 1, length));
                    }
                }
            })
        );
    },

    moveMark: (markId: string, collectionId: string, oldId: string) => {
        console.log('moving it');
        set(
            produce((state: State) => {
                if (
                    !state.collectionsMap[collectionId] ||
                    !state.collectionsMap[collectionId].list.includes(markId) ||
                    !state.collectionsMap[collectionId].list.includes(oldId) ||
                    !state.marksMap[markId] ||
                    !state.marksMap[oldId]
                ) {
                    console.log('noop');
                    return;
                }

                const oldPosition =
                    state.collectionsMap[collectionId].list.indexOf(markId);
                const newPosition =
                    state.collectionsMap[collectionId].list.indexOf(oldId);

                if (oldPosition === -1 || oldPosition === -1) {
                    console.log('one of the elements not found');
                    return;
                }

                console.log('swapping');
                const temp =
                    state.collectionsMap[collectionId].list[newPosition];
                state.collectionsMap[collectionId].list[newPosition] =
                    state.collectionsMap[collectionId].list[oldPosition];
                state.collectionsMap[collectionId].list[oldPosition] = temp;
            })
        );
    },

    moveMarkBetweenCollection: (
        markId: string,
        oldCollectionId: string,
        newCollectionId: string,
        overId: string,
        insert: string,
        position?: number
    ) => {
        console.log('moving it');
        set(
            produce((state: State) => {
                if (
                    !state.collectionsMap[oldCollectionId] ||
                    !state.collectionsMap[newCollectionId] ||
                    !state.marksMap[markId] ||
                    (!overId && !insert)
                ) {
                    console.log('noop');
                    return;
                }
                const newList = state.collectionsMap[newCollectionId].list;

                if (overId) {
                    const pos = newList.indexOf(overId);
                    const length = newList.length;
                    if (pos === -1) {
                        return;
                    }

                    state.collectionsMap[oldCollectionId].list =
                        state.collectionsMap[oldCollectionId].list.filter(
                            (id) => id !== markId
                        );
                    state.collectionsMap[newCollectionId].list = newList
                        .slice(0, pos)
                        .concat(markId)
                        .concat(newList.slice(pos, length));
                } else if (insert) {
                    state.collectionsMap[oldCollectionId].list =
                        state.collectionsMap[oldCollectionId].list.filter(
                            (id) => id !== markId
                        );
                    if (insert === 'start') {
                        state.collectionsMap[newCollectionId].list = [
                            markId,
                        ].concat(newList);
                    } else if (insert === 'end') {
                        state.collectionsMap[newCollectionId].list =
                            newList.concat(markId);
                    }
                } else if (position !== undefined) {
                    state.collectionsMap[oldCollectionId].list =
                        state.collectionsMap[oldCollectionId].list.filter(
                            (id) => id !== markId
                        );
                    state.collectionsMap[newCollectionId].list = newList
                        .slice(0, position)
                        .concat(markId)
                        .concat(newList.slice(position, length));
                }
            })
        );
    },

    removeMarkFromCollection: (markId: string, collectionId: string) => {
        set(
            produce((state: State) => {
                if (state.collectionsMap[collectionId]) {
                    state.collectionsMap[collectionId].list =
                        state.collectionsMap[collectionId].list.filter(
                            (id) => id !== markId
                        );
                    delete state.marksMap[markId];
                }
            })
        );
    },
    moveCollectionInFolder: (
        folderId: string,
        collectionId: string,
        position: number,
        newPosition: number
    ): void | string => {
        set(
            produce((state: State) => {
                const folder = state.foldersMap[folderId];
                const list = folder?.list;
                const length = list.length;
                if (
                    !folder ||
                    !list ||
                    position > length ||
                    newPosition > length ||
                    list[position] !== collectionId
                ) {
                    console.log('error');
                    return;
                }
                list.splice(position, 1);
                console.log(list);
                list.splice(newPosition, 0, collectionId);

                console.log(
                    'updated',
                    list,
                    position,
                    newPosition,
                    list[position],
                    collectionId
                );
            })
        );
    },

    addCollectionToFolder: (
        basicInfo: BasicInfo,
        folderId: string,
        position?: number
    ): void | string => {
        const collection = new Collection(basicInfo);
        if (!collection || !folderId) {
            return;
        }
        set(
            produce((state: State) => {
                if (!state.foldersMap[folderId]) {
                    return;
                }
                if (!position) {
                    state.foldersMap[folderId].list.push(collection.id);
                } else {
                    state.foldersMap[folderId].list.splice(
                        position,
                        0,
                        collection.id
                    );
                }
                if (!state.collectionsMap[collection.id]) {
                    state.collectionsList.push(collection.id);
                    state.collectionsMap[collection.id] = collection;
                }
            })
        );
        return collection.id;
    },
    removeCollectionFromFolder: (
        collectionId: string,
        folderId: string,
        isRemoveMarks: boolean = true
    ): void => {
        set(
            produce((state: State) => {
                if (state.foldersMap[folderId]) {
                    // todo - move marks elsewhere
                    state.foldersMap[folderId].list = state.foldersMap[
                        folderId
                    ].list.filter((id) => id !== collectionId);
                    if (state.collectionsMap[collectionId]) {
                        if (!isRemoveMarks) {
                            // todo move them somewhere else
                        }
                        delete state.collectionsMap[collectionId];
                    }
                }
            })
        );
    },
    addFolder: (basicInfo: BasicInfo): void => {
        const folder = new Folder(basicInfo);
        set(
            produce((state: State) => {
                state.foldersList.push(folder.id);
                state.foldersMap[folder.id] = folder;
            })
        );
    },
    removeFolder: (folderId: string): void => {
        set(
            produce((state: State) => {
                state.foldersList = state.foldersList.filter(
                    (iid) => iid !== folderId
                );
                if (state.foldersMap[folderId]) {
                    delete state.foldersMap[folderId];
                }
            })
        );
    },
    reset: () => {
        set(
            produce(defaultStateValues, (draft) => {
                draft.bears = 0;
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
