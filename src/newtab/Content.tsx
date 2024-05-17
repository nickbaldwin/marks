import { State, useBoundStore } from '../store/store';
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
    const store = useBoundStore((state) => state);
    console.log(store);
    const collectionsList: CollectionsList = useBoundStore(
        (state: State) => state.collectionsList
    );
    const collections: CollectionsMap = useBoundStore(
        (state: State) => state.collectionsMap
    );
    const addCollection = useBoundStore((state: State) => state.addCollection);
    const removeCollection = useBoundStore(
        (state: State) => state.removeCollection
    );

    const marksList: MarksList = useBoundStore(
        (state: State) => state.marksList
    );
    const marks: MarksMap = useBoundStore((state: State) => state.marksMap);
    const addMark = useBoundStore((state: State) => state.addMark);
    console.log('add', addMark);
    const removeMark = useBoundStore((state: State) => state.removeMark);

    const bears = useBoundStore((state: State) => state.bears);
    const inc = useBoundStore((state: State) => state.increase);
    console.log('inc', inc);

    const [collectionName, setCollectionName] = useState('');
    return (
        <>
            <h2>Marks - the useful bookmark manager</h2>
            <div className="container">
                <h2>collections</h2>
                {collectionsList.map((id: string, _i: number) => (
                    <>
                        <div key={_i} className="collection">
                            <h3>C: {collections[id].title}</h3>
                            <br />
                            &nbsp;
                            <button onClick={() => removeCollection(id)}>
                                remove collection
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
                                            remove mark
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
                    aria-labelledby="addCollectionButton"
                    type="text"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                />
                <button
                    id="addCollectionButton"
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
