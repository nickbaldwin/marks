import React, { useState } from 'react';
import { State, useStore } from '../store/store';
import { parseUrl } from '../helpers/domain';

import { Folders } from './Folders';

export const PC: () => React.JSX.Element = () => {
    const bears = useStore((state: State) => state.bears);
    const increase = useStore((state: State) => state.increase);

    const addMark = useStore((state: State) => state.addMarkToCollection);

    const foldersList = useStore((state: State) => state.foldersList);
    const addFolder = useStore((state: State) => state.addFolder);
    const [folderName, setFolderName] = useState('');

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
            <Folders list={foldersList} />
            <br />
            <br />
            ...or add a new folder
            <div className="card">
                <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <button
                    disabled={!folderName}
                    onClick={() => {
                        addFolder({
                            title: folderName,
                            description: 'testing',
                        });
                        setFolderName('');
                    }}
                >
                    add
                </button>
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
