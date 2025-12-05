import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day05-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day05.js';

describe('Day 05', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 3);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 14);
    });
});
