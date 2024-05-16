import { State, useBoundStore } from '../store/store';
import { Collections } from './Collections';

export const Folders = ({ list }: { list: string[] }) => {
    const folders = useBoundStore((state: State) => state.foldersMap);
    return (
        <>
            {list.map((id: string, _i: number) => (
                <div key={_i} className="folder">
                    <h3>{folders[id].title}</h3>
                    <Collections
                        list={folders[id].list}
                        folderId={folders[id].id}
                    />
                    <br />
                    &nbsp;
                    <br />
                </div>
            ))}
        </>
    );
};
