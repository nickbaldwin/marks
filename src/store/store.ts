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
    addMarkToCollection: (urlInfo: UrlInfo, collectionId: string) => void;
    removeMarkFromCollection: (markId: string, collectionId: string) => void;
    addCollectionToFolder: (basicInfo: BasicInfo, folderId: string) => void;
    removeCollectionFromFolder: (
        collectionId: string,
        folderId: string,
        isRemoveMarks: boolean
    ) => void;
    addFolder: (basicInfo: BasicInfo) => void;
    removeFolder: (folderId: string) => void;
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
    ...defaultStateValues,

    increase: (by: number): void => {
        set((state: { bears: number }) => ({
            bears: state.bears + by,
        }));
    },

    addMarkToCollection: (urlInfo: UrlInfo, collectionId: string) => {
        const mark = new Mark(urlInfo);
        console.log(mark);
        const mid = mark.id;
        set(
            produce((state: State) => {
                if (state.collectionsMap[collectionId]) {
                    state.collectionsMap[collectionId].list.push(mid);
                    state.marksMap[mid] = mark;
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
    addCollectionToFolder: (
        basicInfo: BasicInfo,
        folderId: string
    ): void | string => {
        const collection = new Collection(basicInfo);
        set(
            produce((state: State) => {
                if (state.foldersMap[folderId]) {
                    state.foldersMap[folderId].list.push(collection.id);
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
