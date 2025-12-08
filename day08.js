const parseInput = (input) =>
    input.filter(line => line !== '').map(line => {
        const [x, y, z] = line.split(',');
        return {
            x: Number(x),
            y: Number(y),
            z: Number(z),
        }
    });

const calculateDistance = (a, b) => {
    return Math.sqrt(
        Math.pow(Math.abs(a.x - b.x), 2)
        + Math.pow(Math.abs(a.y - b.y), 2)
        + Math.pow(Math.abs(a.z - b.z), 2)
    );
};

export const calc1 = (input, numShortestConnections) => {
    const boxes = parseInput(input);
    const distances = boxes.map(box =>
        boxes.filter(b => b !== box).map(otherBox => ({ a: box, b: otherBox, distance: calculateDistance(box, otherBox)}))
    );

    const flatDistances = distances.reduce((acc, val) => [...acc, ...val], []);
    flatDistances.sort((a, b) => a.distance - b.distance);

    const circuits = new Map(boxes.map(b => [b, [b]]));

    for (let i = 0; i < numShortestConnections; i += 1) {
        const shortestDistance = flatDistances.shift();
        // Get rid of the duplicate
        flatDistances.shift();
        if (!circuits.get(shortestDistance.a).includes(shortestDistance.b)) {
            // The circuit has not yet been established
            const newCircuit = [...circuits.get(shortestDistance.a), ...circuits.get(shortestDistance.b)];
            newCircuit.forEach(c => {
                circuits.set(c, newCircuit);
            })
        } else {
            // Do nothing
        }
    }

    const dedupedCircuits = new Set(Array.from(circuits.values()));
    const sortedDedupedCircuits = Array.from(dedupedCircuits);
    sortedDedupedCircuits.sort((a, b) => b.length - a.length);

    return sortedDedupedCircuits.slice(0, 3).reduce((acc, val) => acc * val.length, 1);
}

export const calc2 = (input) => {
    const boxes = parseInput(input);
    const distances = boxes.map(box =>
        boxes.filter(b => b !== box).map(otherBox => ({ a: box, b: otherBox, distance: calculateDistance(box, otherBox)}))
    );

    const flatDistances = distances.reduce((acc, val) => [...acc, ...val], []);
    flatDistances.sort((a, b) => a.distance - b.distance);

    const circuits = new Map(boxes.map(b => [b, [b]]));

    let shortestDistance = flatDistances.shift();
    // Get rid of the duplicate
    flatDistances.shift();

    while(shortestDistance) {
        if (!circuits.get(shortestDistance.a).includes(shortestDistance.b)) {
            // The circuit has not yet been established
            const newCircuit = [...circuits.get(shortestDistance.a), ...circuits.get(shortestDistance.b)];

            // If this connects every box, return the x positions multiplied together
            if (newCircuit.length === circuits.size) {
                return shortestDistance.a.x * shortestDistance.b.x;
            }

            newCircuit.forEach(c => {
                circuits.set(c, newCircuit);
            })
        } else {
            // Do nothing
        }

        shortestDistance = flatDistances.shift();
        // Get rid of the duplicate
        flatDistances.shift();
    }
}
