const parseInput = (input) => {
    const columns = [];
    input.forEach(line => {
        if (line !== '') {
            const cells = line.trim().split(/[ ]+/);
            cells.forEach((val, index) => {
                if (val === '+' || val === '*') {
                    columns[index].operator = val;
                } else {
                    if (!columns[index]) {
                        columns[index] = {operands: [Number(val)]};
                    } else {
                        columns[index].operands.push(Number(val));
                    }    
                }
            });
        }
    });

    return columns;
};

const parseInputVert = (input) => {
    // First look at the final line to determine operators and positions
    const cleanInput = input.filter(line => line !== '');
    const operatorsLine = cleanInput.pop();
    const columns = operatorsLine.split('').map((val, index) => ({
        operator: { symbol: val, index },
        operands: []
    })).filter(x => x.operator.symbol === '+' || x.operator.symbol === '*');

    columns.forEach((col, index) => {
        if (columns.length > index + 1) {
            col.operator.endIndex = columns[index+1].operator.index - 2;
        } else {
            col.operator.endIndex = operatorsLine.length - 1;
        }
    });

    cleanInput.forEach(line => {
        columns.forEach(col => {
            const raw = line.slice(col.operator.index, col.operator.endIndex + 1);
            
            raw.split('').forEach((char, index) => {
                if (char !== ' ') {
                    if (!col.operands[index]) {
                        col.operands[index] = Number(char);
                    } else {
                        col.operands[index] = Number(col.operands[index].toString()+char);
                    }
                }
            });
        })
    });

    return columns;
};

const calculateColumn = (column) => {
    return column.operands.slice(1).reduce((acc, curr) => {
        if (column.operator === '+') {
            return acc+curr;
        } else {
            return acc*curr;
        }
    }, column.operands[0]);
}

const calculateColumnVert = (column) => {
    return column.operands.slice(1).reduce((acc, curr) => {
        if (column.operator.symbol === '+') {
            return acc+curr;
        } else {
            return acc*curr;
        }
    }, column.operands[0]);
}

export const calc1 = (input) => {
    const columns = parseInput(input);
    const results = columns.map(calculateColumn);

    return results.reduce((acc, curr) => acc+curr, 0);
}

export const calc2 = (input) => {
    const columns = parseInputVert(input);
    const results = columns.map(calculateColumnVert);

    return results.reduce((acc, curr) => acc+curr, 0);
}
