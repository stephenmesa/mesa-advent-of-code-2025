const buildGrid = (input) =>
    input.map(line => line.split('').map(x => x === '@'));

const isPaperAccessible = (grid, x, y) => {
    let neighborRollCount = 0;
    // Upper left
    if (x > 0 && y > 0 && grid[y - 1][x - 1]) {
        neighborRollCount += 1;
    }
    // Upper
    if (y > 0 && grid[y - 1][x]) {
        neighborRollCount += 1;
    }
    // Upper right
    if (x < grid[y].length - 1 && y > 0 && grid[y - 1][x + 1]) {
        neighborRollCount += 1;
    }
    // Left
    if (x > 0 && grid[y][x - 1]) {
        neighborRollCount += 1;
    }
    // Right
    if (x < grid[y].length - 1 && grid[y][x + 1]) {
        neighborRollCount += 1;
    }
    // Lower left
    if (x > 0 && y < grid.length - 1 && grid[y + 1][x - 1]) {
        neighborRollCount += 1;
    }
    // Lower
    if (y < grid.length - 1 && grid[y + 1][x]) {
        neighborRollCount += 1;
    }
    // Lower right
    if (x < grid[y].length - 1 && y < grid.length - 1 && grid[y + 1][x + 1]) {
        neighborRollCount += 1;
    }

    return neighborRollCount < 4;
}

export const calc1 = (input) =>
    getAccessibleRolls(buildGrid(input.filter(line => line.length > 0))).length;

const getAccessibleRolls = (grid) => {
    const accessibleRolls = [];
    for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
            if (grid[y][x] && isPaperAccessible(grid, x, y)) {
                accessibleRolls.push({ x, y });
            }
        }
    }

    return accessibleRolls;
}

export const calc2 = (input) => {
    const grid = buildGrid(input.filter(line => line.length > 0));
    let accessibleCount = 0;

    let accessibleRolls = getAccessibleRolls(grid);
    
    while (accessibleRolls.length > 0) {
        accessibleCount += accessibleRolls.length;
        for (const roll of accessibleRolls) {
            grid[roll.y][roll.x] = false;
        }
        accessibleRolls = getAccessibleRolls(grid);
    }

    return accessibleCount;
}
