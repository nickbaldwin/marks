import { State, useBoundStore } from '../store/store';
import { CollectionsList, CollectionsMap, MarksMap } from '../store/schema';
import { MarkItem } from './Mark';

import './Content.css';
import { AddCollectionToFolder } from '../elements/AddCollectionToFolder';
// import { useState } from 'react';

export const Content = () => {
    // todo - named exports in store
    const foldersList: CollectionsList = useBoundStore(
        (state: State) => state.foldersList
    );
    const folders: CollectionsMap = useBoundStore(
        (state: State) => state.foldersMap
    );

    const collections: CollectionsMap = useBoundStore(
        (state: State) => state.collectionsMap
    );

    const addCollectionToFolder = useBoundStore(
        (state: State) => state.addCollectionToFolder
    );

    const removeCollectionFromFolder = useBoundStore(
        (state: State) => state.removeCollectionFromFolder
    );

    const marks: MarksMap = useBoundStore((state: State) => state.marksMap);

    const removeMarkFromCollection = useBoundStore(
        (state: State) => state.removeMarkFromCollection
    );

    const bears = useBoundStore((state: State) => state.bears);
    const inc = useBoundStore((state: State) => state.increase);

    // const [collectionName, setCollectionName] = useState('');
    return (
        <>
            <h2>Marks - the useful bookmark manager</h2>
            <div className="container">
                {foldersList.map((fid: string, _f: number) => (
                    <div key={'folder-' + _f}>
                        <h2>F: {folders[fid].title}</h2>
                        <br />

                        {folders[fid].list.map((cid: string, _c: number) => (
                            <>
                                <div
                                    key={'folder-' + _f + '-c-' + _c}
                                    className="collection"
                                >
                                    <h3> - C: {collections[cid].title}</h3>
                                    <br />
                                    &nbsp;
                                    <button
                                        onClick={() =>
                                            removeCollectionFromFolder(
                                                cid,
                                                fid,
                                                true
                                            )
                                        }
                                    >
                                        remove collection
                                    </button>
                                </div>
                                <br />
                                <div className="container">
                                    {collections[cid].list.map(
                                        (mid: string, _j: number) => (
                                            <div>
                                                <MarkItem
                                                    position={_j}
                                                    mark={marks[mid]}
                                                />
                                                <button
                                                    onClick={() =>
                                                        removeMarkFromCollection(
                                                            mid,
                                                            cid
                                                        )
                                                    }
                                                >
                                                    remove mark
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                                <br />
                            </>
                        ))}

                        <AddCollectionToFolder
                            folderId={fid}
                            addCollectionToFolder={addCollectionToFolder}
                        />
                    </div>
                ))}

                <p>bears: {bears}</p>
                <button onClick={() => inc(1)}>increase</button>
            </div>
        </>
    );
};
