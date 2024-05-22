import { useState } from 'react';
import { BasicInfo } from '../store/schema';

export const AddCollectionToFolder = ({
    addCollectionToFolder,
    folderId,
}: {
    addCollectionToFolder: (basicInfo: BasicInfo, folderId: string) => void;
    folderId: string;
}): JSX.Element => {
    const [collectionName, setCollectionName] = useState('');
    const handler = (): void => {
        addCollectionToFolder(
            {
                description: collectionName,
                title: collectionName,
            },
            folderId
        );
        setCollectionName('');
    };

    return (
        <div className="card">
            <input
                aria-label="add collection"
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
            />
            <button disabled={!collectionName} onClick={handler}>
                Add collection to folder
            </button>
        </div>
    );
};
