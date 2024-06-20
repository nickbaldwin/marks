import { State, useBoundStore } from '../store/store';
import { MarkItem } from './Mark';
import { Collection, MarksMap } from '../store/schema';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const CollectionContainer = ({
    collection,
    folderId,
    // position,
}: {
    collection: Collection;
    folderId: string;
    position: number;
}) => {
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
        transform: CSS.Transform.toString(transform),
    };

    // 26:50 in https://www.youtube.com/watch?v=RG-3R6Pu_Ik&ab_channel=CodewithKliton

    return (
        <div
            {...attributes}
            {...listeners}
            className={isDragging ? 'collection opacity-20' : 'collection'}
            ref={setNodeRef}
            style={style}
        >
            <h3>C: {collection.title}</h3>
            <br />
            &nbsp;
            <button
                onClick={() =>
                    removeCollectionFromFolder(collection.id, folderId, true)
                }
            >
                remove collection
            </button>
            <br />
            <div className="container">
                {collection.list.map((mid: string, _j: number) => (
                    <div className="bg-gray-100" key={mid}>
                        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-none">
                                <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
                                    <MarkItem position={_j} mark={marks[mid]} />
                                    <button
                                        onClick={() =>
                                            removeMarkFromCollection(
                                                mid,
                                                collection.id
                                            )
                                        }
                                    >
                                        remove mark
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <br />
        </div>
    );
};
