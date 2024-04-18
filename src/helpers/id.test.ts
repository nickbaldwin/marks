import { expect, test } from 'vitest';

import { id } from './id';

test('throws an error if no type provided', () => {
    // @ts-expect-error deliberate error
    expect(() => id()).toThrowError(/type is required/);
});

test('returns a string', () => {
    expect(typeof id('p')).toEqual('string');
});

test('id begins with param', () => {
    expect(id('b').slice(0, 2)).toEqual('b-');
});

test('if testid provided it is returned', () => {
    expect(id('b', '1234-1234')).toEqual('b-1234-1234');
});

test('id generated matches uuid format', () => {
    expect(id('b').slice(2)).toMatch(
        /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/
    );
});
