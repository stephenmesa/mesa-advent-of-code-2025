import fs from 'fs';
import Mustache from 'mustache';
import npmAddScript from 'npm-add-script';

const dayNum = process.argv[2];

if (!dayNum) {
    console.error('Must supply day number argument');
    process.exit(1);
}

fs.writeFileSync(`./inputs/day${dayNum}-simple.txt`, Mustache.render(
    fs.readFileSync('./dayTemplate/day-simple.txt.mustache', 'utf8'),
    { dayNumber: dayNum }
));

fs.writeFileSync(`./inputs/day${dayNum}.txt`, Mustache.render(
    fs.readFileSync('./dayTemplate/day.txt.mustache', 'utf8'),
    { dayNumber: dayNum }
));

fs.writeFileSync(`./day${dayNum}.js`, Mustache.render(
    fs.readFileSync('./dayTemplate/day.js.mustache', 'utf8'),
    { dayNumber: dayNum }
));

fs.writeFileSync(`./day${dayNum}Driver.js`, Mustache.render(
    fs.readFileSync('./dayTemplate/dayXDriver.js.mustache', 'utf8'),
    { dayNumber: dayNum }
));

fs.writeFileSync(`./test/day${dayNum}.test.js`, Mustache.render(
    fs.readFileSync('./dayTemplate/day.test.js.mustache', 'utf8'),
    { dayNumber: dayNum }
));

npmAddScript({key: `day${dayNum}` , value: `node day${dayNum}Driver.js`})
