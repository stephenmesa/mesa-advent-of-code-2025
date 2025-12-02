import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day02-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
    isInvalidIDAdvanced,
} from '../day02.js';

describe('Day 02', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 1227775554);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 4174379265);
    });
    describe('isInvalidIDAdvanced', () => {
        it('detects simple repeats', () => {
            assert.equal(isInvalidIDAdvanced('1212'), true);
            assert.equal(isInvalidIDAdvanced('123123'), true);
            assert.equal(isInvalidIDAdvanced('12341234'), true);
        });
        it('detects non-repeats', () => {
            assert.equal(isInvalidIDAdvanced('1234'), false);
            assert.equal(isInvalidIDAdvanced('123456'), false);
            assert.equal(isInvalidIDAdvanced('12345678'), false);
        });
    });
});
