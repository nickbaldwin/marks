import { Mark } from '../store/schema';
import { TrashIcon } from '../icons/TrashIcon';
import { useState } from 'react';

export const MarkItem = ({
    mark,
    // position,
    removeMark,
}: {
    mark: Mark;
    position: number;
    removeMark: () => void;
}) => {
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    return (
        <div
            key={mark.id}
            className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6"
            onMouseLeave={() => setIsMouseOver(false)}
            onMouseEnter={() => setIsMouseOver(true)}
        >
            <a href={mark.url} target="newtab">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            {mark.title || mark.originalTitle}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            description
                        </p>
                        <div className="hidden">{mark.id}</div>
                        <div className="hidden">{mark.url}</div>
                    </div>
                    <div className="ml-4 mt-4 flex-shrink-0">
                        <button
                            type="button"
                            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            toggle
                        </button>
                    </div>
                </div>
            </a>
            {isMouseOver && (
                <button
                    className="absolute top-0.5 right-0.5 stroke-black cursor-pointer opacity-50 hover:opacity-100"
                    onClick={removeMark}
                >
                    <TrashIcon />
                </button>
            )}
        </div>
    );
};
