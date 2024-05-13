import { Mark } from '../store/schema';

export const MarkItem = ({
    mark,
    position,
}: {
    mark: Mark;
    position: number;
}) => {
    return (
        <div key={position} className="card">
            {mark.id}
            <br />
            <p>{mark.title || mark.originalTitle}</p>
            <br />
            &nbsp;
            <br />
            <a href={mark.url}>{mark.url}</a>
            <br />
        </div>
    );
};
