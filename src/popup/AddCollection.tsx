import { useState } from 'react';
import { State, useBoundStore } from '../store/store';
import { parseUrl } from '../helpers/domain';

export const AddCollectiion = ({
    folderId,
}: {
    folderId: string;
}): JSX.Element => {
    const [collectionName, setCollectionName] = useState('');
    const addCollection = useBoundStore(
        (state: State) => state.addCollectionToFolder
    );
    const addMark = useBoundStore((state: State) => state.addMarkToCollection);

    const addTabToNewCollection = async (): Promise<void> => {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        const { url = '', title = '', favIconUrl = '' } = tab;

        // todo - deal with url errors
        const domain = parseUrl(url) || '';
        console.log(url, title, favIconUrl, domain);

        // need to get id of new collection, in order to add mark to it
        const id: string = addCollection(
            { title: collectionName, description: '' },
            folderId
        );
        addMark({ url, originalTitle: title, originalDescription: title }, id);
    };

    return (
        <div className="card">
            <input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
            />
            <button disabled={!collectionName} onClick={addTabToNewCollection}>
                add
            </button>
        </div>
    );
};
