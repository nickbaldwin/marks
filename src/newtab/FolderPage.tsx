import { CollectionsMap, FoldersMap, MarksMap } from '../store/schema';
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
    DragOverEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CollectionContainer } from './CollectionContainer';
import { useState } from 'react';
import { MarkItem } from './Mark';

// export const FolderPage = ({ folderId }: { folderId: string }) => {
export const FolderPage = () => {
    const [draggingCollection, setDraggingCollection] = useState<
        string | null
    >();
    const [draggingMark, setDraggingMark] = useState<string | null>();

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

    const marks: MarksMap = useBoundStore((state: State) => state.marksMap);

    const addCollectionToFolder = useBoundStore(
        (state: State) => state.addCollectionToFolder
    );

    const moveCollection = useBoundStore(
        (state: State) => state.moveCollectionInFolder
    );

    const moveMarkBC = useBoundStore(
        (state: State) => state.moveMarkBetweenCollection
    );

    const moveMark = useBoundStore((state: State) => state.moveMark);

    function onDragStart(event: DragStartEvent) {
        const t = event.active.data.current?.type;
        console.log('drag start', t, event);
        if (event.active.data.current?.type === 'Collection') {
            setDraggingCollection(event.active.data.current.collection.id);
        }
        if (event.active.data.current?.type === 'Mark') {
            setDraggingMark(event.active.data.current.mark.id);
        }
        return;
    }

    function onDragOver(event: DragOverEvent) {
        console.log('drag over', event);
        if (!folderId) {
            return;
        }
        const { active, over } = event;
        if (active.id === over?.id) {
            // item over original position
            console.log('item over itself');
            return;
        }

        const isActiveTypeMark = event.active.data.current?.type === 'Mark';
        const isOverTypeMark = event.over?.data?.current?.type === 'Mark';
        const isActiveTypeCollection =
            event.active?.data?.current?.type === 'Collection';
        // const isOverTypeCollection = event.over?.data?.current?.type === 'Collection';

        if (isActiveTypeCollection) {
            console.log('dragged collection over something - ignoring');
            return;
        }
        if (isActiveTypeMark && isOverTypeMark && over?.id) {
            console.log(
                `dragged mark over ${isOverTypeMark ? 'mark' : 'collection'} `
            );

            const oldCollectionId =
                event.active?.data?.current?.sortable?.containerId;
            const newCollectionId =
                event.over?.data?.current?.sortable?.containerId;

            if (oldCollectionId === newCollectionId) {
                console.log('in same container');
                moveMark(
                    active.id as string,
                    oldCollectionId,
                    over?.id as string
                );
            } else {
                console.log('different container');
                moveMarkBC(
                    active.id as string,
                    oldCollectionId,
                    newCollectionId,
                    over?.id as string
                );
            }
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setDraggingCollection(null);
        setDraggingMark(null);

        const te = event.active.data.current?.type;
        console.log('drag end', te, event);
        if (!folderId) {
            return;
        }

        const { active, over } = event;
        const list = [...folders[folderId].list];
        if (!over) {
            // not over another collection
            console.log('not over another droppable');
            return;
        }

        const isCollection = active.data.current?.type === 'Collection';
        if (!isCollection) return;

        if (active.id === over.id) {
            // item dropped in original position
            console.log('item dropped in original position');
            return;
        }
        if (draggingCollection && draggingCollection === active.id) {
            console.log(
                'dropped collection',
                active.id,
                active.data.current?.collection.title,
                'over',
                over.id,
                over.data.current?.collection.title
            );
            console.log('list', list);
            const posActive = list.indexOf(active.id);
            const posOver = list.indexOf(over.id as string);
            moveCollection(folderId, active.id, posActive, posOver);
        } else if (draggingMark && draggingMark === active.id) {
            console.log('MARK dropped - shouldnt see this');
            return;
        } else {
            console.log('on drag end - else');
        }
    }

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
            onDragOver={onDragOver}
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
                            {draggingMark && (
                                <MarkItem
                                    mark={marks[draggingMark]}
                                    position={10}
                                    removeMark={() => {}}
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
