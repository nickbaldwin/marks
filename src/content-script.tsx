import React from 'react';
import { createRoot } from 'react-dom/client';
import { storeReadyPromise } from './store/store';
// import { Content } from './newtab/Content';
import { RoutedContent } from './newtab/RoutedContent';

//  <Content />
if (storeReadyPromise !== null) {
    storeReadyPromise.then(() => {
        const container: HTMLElement | null =
            document.getElementById('content-root');
        if (container) {
            createRoot(container).render(
                <React.StrictMode>
                    <RoutedContent />
                </React.StrictMode>
            );
        }
    });
}
