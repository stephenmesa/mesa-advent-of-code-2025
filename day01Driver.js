import fs from 'fs';

const input = fs.readFileSync('inputs/day01.txt').toString().split('\n');

import {
    calc1,
    calc2,
} from './day01.js';

console.log('Day 01 - Part 1', calc1(input));
console.log('Day 01 - Part 2', calc2(input));
