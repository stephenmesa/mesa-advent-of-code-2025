const parseInput = (input) => {
    const separatorIndex = input.indexOf('');
    const freshIDRanges = input.slice(0, separatorIndex).map(line => {
        const [min, max] = line.split('-').map(Number);
        return { min, max };
    });
    const availableIngredients = input.slice(separatorIndex+1).filter(x => x !== '').map(Number);

    return {
        freshIDRanges,
        availableIngredients,
    };
}

const isFresh = (freshIDRanges) => (id) => 
    freshIDRanges.filter(range => range.min <= id && range.max >= id).length > 0;

export const calc1 = (input) => {
    const { freshIDRanges, availableIngredients } = parseInput(input);

    const freshIngredients = availableIngredients.filter(isFresh(freshIDRanges));

    return freshIngredients.length;
}

const getAllOverlappingRanges = (ranges, rangesToFind) => {
    const overlappingRanges = [...rangesToFind];
    const minnyMin = Math.min(...rangesToFind.map(x => x.min));
    const maxxyMax = Math.max(...rangesToFind.map(x => x.max));
    const range = { min: minnyMin, max: maxxyMax, numIDs: maxxyMax - minnyMin + 1 };
    overlappingRanges.push(...ranges.filter(otherRange =>
        (otherRange.min < range.min && otherRange.max >= range.min)
        || (otherRange.min <= range.max && otherRange.max > range.max)
        || (otherRange.min < range.min && otherRange.max > range.max)
        || (otherRange.min >= range.min && otherRange.max <= range.max)
    ));

    const remainingRanges = ranges.filter(r => !overlappingRanges.includes(r));

    if (remainingRanges.length === ranges.length) {
        // No new overlaps found
        return overlappingRanges;
    }

    // Recursively find more overlaps
    const moreOverlappingRanges = getAllOverlappingRanges(remainingRanges, overlappingRanges);

    return [...overlappingRanges, ...moreOverlappingRanges];
};

export const calc2 = (input) => {
    const { freshIDRanges } = parseInput(input);

    const newRanges = [];
    let ranges = freshIDRanges.map(range => ({ ...range, numIDs: range.max - range.min + 1 }));

    // Loop through ranges
    // For each range, look for all overlapping ranges recursively
    // Remove all overlapping ranges and replace with a new range with the lowest min of all overlapping ranges and highest max of all overlapping ranges

    let range = ranges.shift();
    
    while(range) {
        const overlappingRanges = getAllOverlappingRanges(ranges, [range]);
        if (overlappingRanges.length === 1) {
            // No overlaps. Copy range as-is
            newRanges.push(range);
        } else {
            // Overlaps. Merge and remove all overlaps
            const minnyMin = Math.min(...overlappingRanges.map(x => x.min));
            const maxxyMax = Math.max(...overlappingRanges.map(x => x.max));
            newRanges.push({ min: minnyMin, max: maxxyMax, numIDs: maxxyMax - minnyMin + 1 });
            ranges = ranges.filter(r => !overlappingRanges.includes(r));
        }

        range = ranges.shift();
    }

    return newRanges.reduce((acc, range) => acc + range.numIDs, 0);
}
