export const parseUrl = (url: string): string | null => {
    const matches = url.match(
        /^(https?:\/\/)(([a-z]+\.)?([-_0-9a-z]+\.[0-9a-z]+))/i
    );
    if (!matches) {
        return null;
    }
    if (matches[3] && matches[3] === 'www.') {
        return matches[4];
    }
    return matches[2];
};
