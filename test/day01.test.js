import fs from 'fs';
import assert from 'assert';

const testInput = fs.readFileSync('inputs/day01-simple.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from '../day01.js';

describe('Day 01', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, 3);
    });
    it('Part 1.1', () => {
        const input = ['L25', 'R25', 'L25', 'R25', 'L25', 'R25', 'L25', 'R25'];
        const target = calc1(input);
        assert.equal(target, 0);
    });
    it('Part 1.1', () => {
        const input = ['L250'];
        const target = calc1(input);
        assert.equal(target, 1);
    });
    it('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, 6);
    });
    it('Part 2.1', () => {
        const input = ['L350'];
        const target = calc2(input);
        assert.equal(target, 4);
    });
    it('Part 2.2', () => {
        const input = ['R350'];
        const target = calc2(input);
        assert.equal(target, 4);
    });
    it('Part 2.3', () => {
        const input = ['R1000'];
        const target = calc2(input);
        assert.equal(target, 10);
    });
    it('Part 2.4', () => {
        const input = ['L1000'];
        const target = calc2(input);
        assert.equal(target, 10);
    });
    it('Part 2.5', () => {
        const input = ['L50', 'L300'];
        const target = calc2(input);
        assert.equal(target, 4);
    });
});
