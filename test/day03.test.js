import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day03-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day03.js';

describe('Day 03', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 357);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 3121910778619);
    });
});
