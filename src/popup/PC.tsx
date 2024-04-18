import React, { useState } from 'react';
import { State, useStore } from '../store/store';
import { parseUrl } from '../helpers/domain';

export const PC: () => React.JSX.Element = () => {
    const bears = useStore((state: State) => state.bears);
    const increase = useStore((state: State) => state.increase);
    const addMark = useStore((state: State) => state.addMarkToCollection);
    const addCollection = useStore((state: State) => state.addCollection);
    const collectionsList = useStore((state: State) => state.collectionsList);
    const collections = useStore((state: State) => state.collectionsMap);

    const [collectionName, setCollectionName] = useState('');

    const [tabInfo, setTabInfo] = React.useState('');

    const addTab = async (id: string): Promise<void> => {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        const { url = '', title = '', favIconUrl = '' } = tab;

        // todo - deal with url errors
        const domain = parseUrl(url) || '';
        console.log(url, title, favIconUrl, domain);

        setTabInfo(title);

        addMark({ url, originalTitle: title, originalDescription: title }, id);
    };

    return (
        <>
            <h2>Marks - the useful bookmark manager</h2>
            <div className="container">
                <p>collections</p>
                {collectionsList.map((id: string, _i: number) => (
                    <div key={_i} className="card">
                        <button onClick={() => addTab(collections[id].id)}>
                            {collections[id].title}
                        </button>
                    </div>
                ))}
                <br />
                ...or add to a new collection
                <div className="card">
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
                        add
                    </button>
                </div>
            </div>

            <div>
                <span>Bears: {bears}</span>
                <br />
                <button onClick={() => increase(1)}>Increment +</button>

                <br />

                <br />
                <button onClick={() => addTab('hack')}>get tab info +</button>
                <span>tabinfo?: {tabInfo}</span>
            </div>
        </>
    );
};
