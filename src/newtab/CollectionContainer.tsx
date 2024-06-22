import { State, useBoundStore } from '../store/store';
import { MarkItem } from './Mark';
import { Collection, MarksMap } from '../store/schema';

import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon } from '../icons/TrashIcon';
import { useState } from 'react';

export const CollectionContainer = ({
    collection,
    folderId,
    // position,
}: {
    collection: Collection;
    folderId: string;
    position: number;
}) => {
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const removeCollectionFromFolder = useBoundStore(
        (state: State) => state.removeCollectionFromFolder
    );

    const removeMarkFromCollection = useBoundStore(
        (state: State) => state.removeMarkFromCollection
    );

    const marks: MarksMap = useBoundStore((state: State) => state.marksMap);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: collection.id,
        data: {
            type: 'Collection',
            collection,
            // position,
        },
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    // 26:50 in https://www.youtube.com/watch?v=RG-3R6Pu_Ik&ab_channel=CodewithKliton

    return (
        <div
            {...attributes}
            {...listeners}
            className={
                isDragging
                    ? 'collection opacity-20 bg-gray-100'
                    : 'collection bg-gray-100'
            }
            ref={setNodeRef}
            style={style}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
                {collection.title}
            </h3>

            {isMouseOver && (
                <button
                    className="absolute top-0.5 right-0.5 stroke-black cursor-pointer  opacity-50 hover:opacity-100"
                    onClick={() =>
                        removeCollectionFromFolder(
                            collection.id,
                            folderId,
                            true
                        )
                    }
                >
                    <TrashIcon />
                </button>
            )}

            <div className="container">
                <SortableContext
                    id={collection.id}
                    strategy={verticalListSortingStrategy}
                    items={collection.list}
                >
                    {collection.list.map((mid: string, _j: number) => (
                        <div className="bg-gray-100" key={mid}>
                            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                                <div className="mx-auto max-w-none">
                                    <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow relative">
                                        <MarkItem
                                            position={_j}
                                            mark={marks[mid]}
                                            removeMark={() =>
                                                removeMarkFromCollection(
                                                    mid,
                                                    collection.id
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};
