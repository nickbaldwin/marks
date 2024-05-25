import { Link } from 'react-router-dom';
import { CollectionsList, CollectionsMap } from '../store/schema';
import { State, useBoundStore } from '../store/store';
import { AddFolder } from '../elements/AddFolder';

export const Sidebar = () => {
    const foldersList: CollectionsList = useBoundStore(
        (state: State) => state.foldersList
    );
    const folders: CollectionsMap = useBoundStore(
        (state: State) => state.foldersMap
    );

    const addFolder = useBoundStore((state: State) => state.addFolder);

    const bears = useBoundStore((state: State) => state.bears);
    const inc = useBoundStore((state: State) => state.increase);

    return (
        <div className="sidebar">
            <h2>Folders</h2>
            {foldersList.map((fid: string) => (
                <div key={fid}>
                    <Link to={`folders/${folders[fid].id}`} className="folder">
                        <span>{folders[fid].title}</span>
                    </Link>
                </div>
            ))}

            <br />
            <AddFolder addFolder={addFolder} />

            <p>bears: {bears}</p>
            <button onClick={() => inc(1)}>increase</button>
        </div>
    );
};
