import { CollectionsMap, FoldersMap } from '../store/schema';
import { State, useBoundStore } from '../store/store';
import { AddCollectionToFolder } from '../elements/AddCollectionToFolder';
import { useParams } from 'react-router-dom';
import {
    DndContext,
    closestCenter,
    DragStartEvent,
    DragEndEvent,
    DragOverlay,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CollectionDisplay } from './CollectionDisplay';
import { useState } from 'react';

// export const FolderPage = ({ folderId }: { folderId: string }) => {
export const FolderPage = () => {
    const [draggingCollection, setDraggingCollection] = useState<
        string | null
    >();

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

    function onDragStart(event: DragStartEvent) {
        console.log('drag start', event);
        if (event.active.data.current?.type === 'Collection') {
            setDraggingCollection(event.active.data.current.collection.id);
        }
        return;
    }

    function onDragEnd(event: DragEndEvent) {
        console.log('drag end', event);
    }

    // 26:50 in https://www.youtube.com/watch?v=RG-3R6Pu_Ik&ab_channel=CodewithKliton
    // todo ?- create a portal for the drag overlay

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
        >
            <div className="container">
                <div>
                    <h2>F: {folders[folderId].title}</h2>
                    <br />

                    {/* todo - sortable - pass 'column' ids ???? */}
                    <SortableContext
                        strategy={verticalListSortingStrategy}
                        items={folders[folderId].list}
                    >
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
                        <DragOverlay>
                            {draggingCollection && (
                                <CollectionDisplay
                                    key={'active'}
                                    collection={collections[draggingCollection]}
                                    folderId={folderId}
                                    position={10}
                                />
                            )}
                        </DragOverlay>
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
