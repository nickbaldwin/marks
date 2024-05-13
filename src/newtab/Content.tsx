import { State, useStore } from '../store/store';
import {
    CollectionsList,
    CollectionsMap,
    MarksList,
    MarksMap,
} from '../store/schema';
import { MarkItem } from './Mark';

import './Content.css';
import { useState } from 'react';

export const Content = () => {
    const collectionsList: CollectionsList = useStore(
        (state: State) => state.collectionsList
    );
    const collections: CollectionsMap = useStore(
        (state: State) => state.collectionsMap
    );
    const addCollection = useStore((state: State) => state.addCollection);
    const removeCollection = useStore((state: State) => state.removeCollection);

    const marksList: MarksList = useStore((state: State) => state.marksList);
    const marks: MarksMap = useStore((state: State) => state.marksMap);
    const addMark = useStore((state: State) => state.addMark);
    const removeMark = useStore((state: State) => state.removeMark);

    const bears = useStore((state: State) => state.bears);
    const inc = useStore((state: State) => state.increase);

    const [collectionName, setCollectionName] = useState('');
    return (
        <>
            <h2>Marks - the useful bookmark manager</h2>
            <div className="container">
                <h2>collections</h2>
                {collectionsList.map((id: string, _i: number) => (
                    <>
                        <div key={_i} className="collection">
                            <h3>{collections[id].title}</h3>
                            <br />
                            &nbsp;
                            <button onClick={() => removeCollection(id)}>
                                remove
                            </button>
                        </div>
                        <br />
                        <div className="container">
                            {collections[id].list.map(
                                (id: string, _j: number) => (
                                    <div>
                                        <MarkItem
                                            position={_j}
                                            mark={marks[id]}
                                        />
                                        <button onClick={() => removeMark(id)}>
                                            remove
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                        <br />
                    </>
                ))}
                <br />

                <br />
                <input
                    type="text"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                />
                <button
                    disabled={!collectionName}
                    onClick={() => {
                        addCollection({
                            title: collectionName,
                            description: 'testing',
                        });
                        setCollectionName('');
                    }}
                >
                    add new collection
                </button>

                <br />
            </div>

            <div className="container">
                {marksList.map((id: string, _i: number) => (
                    <div key={_i} className="card">
                        {marks[id].id}
                        <br />
                        {marks[id].originalTitle}
                        <br />
                        &nbsp;
                        <br />
                        <a href={marks[id].url}>{marks[id].url}</a>
                        <br />
                        <button onClick={() => removeMark(id)}>remove</button>
                    </div>
                ))}
                <button
                    onClick={() =>
                        addMark({
                            originalTitle: 'Google',
                            originalDescription: 'Search engine',
                            url: 'https://www.google.com',
                        })
                    }
                >
                    add mark
                </button>
            </div>
            <p>bears: {bears}</p>
            <button onClick={() => inc(1)}>increase</button>
        </>
    );
};
