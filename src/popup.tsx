import React from 'react';
import { createRoot } from 'react-dom/client';
import { storeReadyPromise } from './store/store';
import { PC } from './popup/PC';

storeReadyPromise.then(() => {
    createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <PC />
        </React.StrictMode>
    );
});
