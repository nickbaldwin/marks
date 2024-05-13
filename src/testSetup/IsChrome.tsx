export const IsChrome = () => {
    const is = chrome?.storage?.local;

    return <div>chrome storage available here?: {!!is}</div>;
};
