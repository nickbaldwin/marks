import { useState } from 'react';
import { BasicInfo } from '../store/schema';

export const AddFolder = ({
    addFolder,
}: {
    addFolder: (basicInfo: BasicInfo) => void;
}): JSX.Element => {
    const [folderName, setFolderName] = useState('');
    const handler = (): void => {
        addFolder({
            description: '',
            title: folderName,
        });
        setFolderName('');
    };

    return (
        <div className="card">
            <input
                aria-label="add folder"
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
            <button disabled={!folderName} onClick={handler}>
                Add folder
            </button>
        </div>
    );
};
