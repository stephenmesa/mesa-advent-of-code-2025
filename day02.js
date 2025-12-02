const isInvalidIDSimple = (id) => {
    // Odd number length IDs are automatically invalid
    if (id.length % 2 !== 0) {
        return false;
    }

    // Split the ID into two halves and compare
    const mid = id.length / 2;
    const firstHalf = id.slice(0, mid);
    const secondHalf = id.slice(mid);
    
    return firstHalf === secondHalf;
};

export const isInvalidIDAdvanced = (id) => {
    // We want to test repeats of each possible length, with the largest repeat being half of the ID.
    // If the ID was 12345678, we would want to go from 0 to 3
    for (let lengthToTest = 1; lengthToTest <= Math.floor(id.length / 2); lengthToTest += 1) {
        if (id.length % lengthToTest !== 0) {
            // If the length of the ID isn't a multiple of the length to test, skip it
            continue;
        }
        const firstPart = id.slice(0, lengthToTest);
        
        const numRepeats = id.length / lengthToTest;

        if (firstPart.repeat(numRepeats) === id) {
            return true;
        }
    }

    return false;
};

export const calc1 = (input) => {
    const invalidIDs = [];
    const idString = input[0];
    const idList = idString.split(',');
    for (let i = 0; i < idList.length; i++) {
        const currentIdSet = idList[i];
        const [ firstID, secondID ] = currentIdSet.split('-').map(id => parseInt(id, 10));
        for (let j = firstID; j <= secondID; j++) {
            if (isInvalidIDSimple(j.toString())) {
                invalidIDs.push(j.toString());
            }
        }
    }

    return invalidIDs.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
}

export const calc2 = (input) => {
    const invalidIDs = [];
    const idString = input[0];
    const idList = idString.split(',');
    for (let i = 0; i < idList.length; i++) {
        const currentIdSet = idList[i];
        const [ firstID, secondID ] = currentIdSet.split('-').map(id => parseInt(id, 10));
        for (let j = firstID; j <= secondID; j++) {
            if (isInvalidIDAdvanced(j.toString())) {
                invalidIDs.push(j.toString());
            }
        }
    }

    return invalidIDs.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
}
