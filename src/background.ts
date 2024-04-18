import store from './store/store';
import { version } from './store/schema';

// todo - optimise this check/fix for current version?
const isStorage =
    chrome.storage !== undefined && chrome.storage.local !== undefined;
if (isStorage) {
    chrome.storage.local.get(['version'], (result) => {
        if (!result || result.version !== version) {
            console.log('not current version - clearing storage');
            chrome.storage.local.clear();
        }

        // listen state changes
        // triggered (including subscription execution) by other contexts using store
        store.subscribe((state) => {
            console.log('subscribed to store');
            console.log(state);
        });
    });
} else {
    console.log('no storage');
}
