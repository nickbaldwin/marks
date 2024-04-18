import { expect, test } from 'vitest';

import { removeItemFromArray } from './helper';

test('removes last item', () => {
    expect(removeItemFromArray([0, 1, 2], 2)).toEqual([0, 1]);
});

test('removes first item', () => {
    expect(removeItemFromArray([0, 1, 2], 0)).toEqual([1, 2]);
});

test('removes middle item', () => {
    expect(removeItemFromArray([0, 1, 2], 1)).toEqual([0, 2]);
});
