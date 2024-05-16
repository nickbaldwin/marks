import React from 'react';
import ReactDOM from 'react-dom/client';
import { storeReadyPromise } from './store/store';
import { Content } from './newtab/Content';

if (storeReadyPromise !== null) {
    storeReadyPromise.then(() => {
        const root: HTMLElement | null =
            document.getElementById('content-root');
        if (root) {
            ReactDOM.createRoot(root).render(
                <React.StrictMode>
                    <Content />
                </React.StrictMode>
            );
        }
    });
}
