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
    useSensors,
    PointerSensor,
    useSensor,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CollectionContainer } from './CollectionContainer';
import { useState } from 'react';

// export const FolderPage = ({ folderId }: { folderId: string }) => {
export const FolderPage = () => {
    const [draggingCollection, setDraggingCollection] = useState<
        string | null
    >();

    const { folderId } = useParams();
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );
    const collections: CollectionsMap = useBoundStore(
        (state: State) => state.collectionsMap
    );
    const folders: FoldersMap = useBoundStore(
        (state: State) => state.foldersMap
    );
    const addCollectionToFolder = useBoundStore(
        (state: State) => state.addCollectionToFolder
    );

    const moveCollection = useBoundStore(
        (state: State) => state.moveCollectionInFolder
    );

    function onDragStart(event: DragStartEvent) {
        console.log('drag start', event);
        if (event.active.data.current?.type === 'Collection') {
            setDraggingCollection(event.active.data.current.collection.id);
        }
        return;
    }

    function onDragEnd(event: DragEndEvent) {
        if (!folderId) {
            return;
        }
        const list = [...folders[folderId].list];

        console.log('drag end', event);
        const { active, over } = event;
        if (!over) {
            // not over another collection
            console.log('not over another collection');
            return;
        }
        if (active.id === over.id) {
            // item dropped in original position
            console.log('item dropped in original position');
            return;
        }

        if (draggingCollection && draggingCollection === active.id) {
            // addCollectionToFolder(draggingCollection, over.id);
            console.log('dropped item', active.id, 'over', over.id);
            console.log('list', list);
            const posActive = list.indexOf(active.id);
            const posOver = list.indexOf(over.id as string);

            // if (posActive !== )

            moveCollection(folderId, active.id, posActive, posOver);

            setDraggingCollection(null);
        } else {
            console.log('else');
            console.log('draggingCollection', draggingCollection);
        }
    }

    // 26:50 in https://www.youtube.com/watch?v=RG-3R6Pu_Ik&ab_channel=CodewithKliton
    // todo ?- create a portal for the drag overlay

    if (!folderId || !folders[folderId]) {
        return <div> no folder</div>;
    }

    return (
        <DndContext
            sensors={sensors}
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
                                <CollectionContainer
                                    key={collections[cid].id}
                                    collection={collections[cid]}
                                    folderId={folderId}
                                    position={position}
                                />
                            )
                        )}
                        <DragOverlay>
                            {draggingCollection && (
                                <CollectionContainer
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
