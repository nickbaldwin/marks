// dealing with test environment - cannot reference node outside of a function component?!
// todo - return nothing - in promise? check doc
const retrieve = () => {
    if (!globalThis.chrome?.storage?.local?.get) {
        return {
            then: () => {},
        };
    } else return chrome.storage.local.get();
};
// todo - check doc
// @ts-expect-error todo
const persist = (arg) => {
    if (!globalThis.chrome?.storage?.local?.set) {
        console.log('cannot persist to storage');
        return;
    } else return chrome.storage.local.set(arg);
};

// @ts-expect-error todo
const a = (e, o) =>
    Object.fromEntries(
        Object.entries(e).filter(
            ([t, r]) => ![...(o || [])].includes(t) && typeof r != 'function'
        )
    );

const h = () => {
    try {
        return !!(chrome.storage && chrome.storage.local);
    } catch {
        // throw new Error(
        //     "Your extension environment doesn't have chrome.storage.local functionality"
        // );

        console.log(
            "Your extension environment doesn't have chrome.storage.local functionality"
        );
    }
};

// @ts-expect-error todo
export const includeChromeStore = (e, o) => (t, r, n) => {
    h();
    // @ts-expect-error todo
    const s = (...c) => {
        t(...c), persist(a(n.getState(), o));
    };
    return (
        (n.setState = s),
        retrieve().then((c) => {
            t(c);
        }),
        e(s, r, n)
    );
};
