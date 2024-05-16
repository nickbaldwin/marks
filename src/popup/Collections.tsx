import { State, useBoundStore } from '../store/store';
import { parseUrl } from '../helpers/domain';
import { AddCollectiion } from './AddCollection';

export const Collections = ({
    list,
    folderId,
}: {
    list: string[];
    folderId: string;
}): JSX.Element => {
    const collections = useBoundStore((state: State) => state.collectionsMap);
    const addMark = useBoundStore((state: State) => state.addMarkToCollection);

    const addTab = async (id: string): Promise<void> => {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        const { url = '', title = '', favIconUrl = '' } = tab;

        // todo - deal with url errors
        const domain = parseUrl(url) || '';
        console.log(url, title, favIconUrl, domain);

        addMark({ url, originalTitle: title, originalDescription: title }, id);
    };

    return (
        <>
            <div className="container">
                {list.map((id: string, _i: number) => (
                    <div key={_i} className="card">
                        <button onClick={() => addTab(collections[id].id)}>
                            {collections[id].title}
                        </button>
                    </div>
                ))}
                <br />
                ...or add to a new collection
                <AddCollectiion folderId={folderId} />
            </div>
        </>
    );
};
