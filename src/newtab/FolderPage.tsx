import { CollectionsMap, FoldersMap, MarksMap } from '../store/schema';
import { State, useBoundStore } from '../store/store';
import { MarkItem } from './Mark';
import { AddCollectionToFolder } from '../elements/AddCollectionToFolder';
import { useParams } from 'react-router-dom';

// export const FolderPage = ({ folderId }: { folderId: string }) => {
export const FolderPage = () => {
    const { folderId } = useParams();
    const collections: CollectionsMap = useBoundStore(
        (state: State) => state.collectionsMap
    );
    const folders: FoldersMap = useBoundStore(
        (state: State) => state.foldersMap
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

    if (!folderId) {
        return <div> no folder</div>;
    }

    return (
        <div className="container">
            <div>
                <h2>F: {folders[folderId].title}</h2>
                <br />

                {folders[folderId].list.map((cid: string, _c: number) => (
                    <>
                        <div key={'-c-' + _c} className="collection">
                            <h3> - C: {collections[cid].title}</h3>
                            <br />
                            &nbsp;
                            <button
                                onClick={() =>
                                    removeCollectionFromFolder(
                                        cid,
                                        folderId,
                                        true
                                    )
                                }
                            >
                                remove collection
                            </button>
                            <br />
                            <div className="container">
                                {collections[cid].list.map(
                                    (mid: string, _j: number) => (
                                        <div class="bg-gray-100">
                                            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                                                <div class="mx-auto max-w-none">
                                                    <div class="overflow-hidden bg-white sm:rounded-lg sm:shadow">
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
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <br />
                        </div>
                    </>
                ))}

                <AddCollectionToFolder
                    folderId={folderId}
                    addCollectionToFolder={addCollectionToFolder}
                />
            </div>
        </div>
    );
};
