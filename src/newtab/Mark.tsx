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
            <div className="card-icon"> ### &nbsp;</div>
            <a href={mark.url}>
                <div className="card-title">
                    <p>{mark.title || mark.originalTitle}</p>
                    <div className="hidden">{mark.id}</div>
                    <div className="hidden">{mark.url}</div>
                </div>
            </a>
            <div className="card-controls">...</div>
        </div>
    );
};
