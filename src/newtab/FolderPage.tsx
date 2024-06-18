import { CollectionsMap, FoldersMap } from '../store/schema';
import { State, useBoundStore } from '../store/store';
import { AddCollectionToFolder } from '../elements/AddCollectionToFolder';
import { useParams } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { CollectionDisplay } from './CollectionDisplay';

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

    if (!folderId) {
        return <div> no folder</div>;
    }

    return (
        <DndContext>
            <div className="container">
                <div>
                    <h2>F: {folders[folderId].title}</h2>
                    <br />

                    {/* todo - sortable - pass 'column' ids ???? */}
                    <SortableContext items={folders[folderId].list}>
                        {folders[folderId].list.map(
                            (cid: string, position: number) => (
                                <CollectionDisplay
                                    key={collections[cid].id}
                                    collection={collections[cid]}
                                    folderId={folderId}
                                    position={position}
                                />
                            )
                        )}
                    </SortableContext>

                    <AddCollectionToFolder
                        folderId={folderId}
                        addCollectionToFolder={addCollectionToFolder}
                    />
                </div>
            </div>
        </DndContext>
    );
};
