import { describe, expect, test } from 'vitest';

import { parseUrl } from './domain';

describe('parseUrl', () => {
    test('returns null for a non-url', () => {
        expect(parseUrl('google')).toEqual(null);
    });

    test('returns null for a url with no http(s) protocol', () => {
        expect(parseUrl('google.com/foo/bar?blah=true')).toBeNull();
    });

    test('returns domain from a full url with path', () => {
        expect(parseUrl('http://mail.google.com/foo/bar?blah=true')).toEqual(
            'mail.google.com'
        );
    });

    test('returns domain from a full url with no subdomain', () => {
        expect(parseUrl('http://google.com/foo/bar')).toEqual('google.com');
    });

    test('returns domain without www from a full url', () => {
        expect(parseUrl('http://www.google.com')).toEqual('google.com');
    });
});
