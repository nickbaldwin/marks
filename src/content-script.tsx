import React from 'react';
import ReactDOM from 'react-dom/client';
import { storeReadyPromise } from './store/store';
import { Content } from './newtab/Content';

storeReadyPromise.then(() => {
    const root: HTMLElement | null = document.getElementById('content-root');
    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <Content />
            </React.StrictMode>
        );
    }
});
