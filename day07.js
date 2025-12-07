const getNewTachyonBeams = (result, line) => {
    let numSplits = result.numSplits;
    const newBeams = result.tachyonBeams.map(index => {
        if (line[index] === '^') {
            numSplits += 1;
            const newBeamsToReturn = [];
            if (index > 0) {
                newBeamsToReturn.push(index-1);
            }
            if (index < line.length - 1) {
                newBeamsToReturn.push(index+1);
            }
            return newBeamsToReturn;
        } else {
            return [index];
        }
    });
    
    const flattened = newBeams.reduce((acc, cur) => {
        cur.forEach(x => {
            if (!acc.includes(x)) {
                acc.push(x);
            }
        });
        return acc;
    }, []);

    return {
        tachyonBeams: flattened,
        numSplits
    };
};

export const calc1 = (input) => {
    const modifiedInput = input.filter(x => x !== '');
    const startingLine = modifiedInput.shift();

    const result = modifiedInput.reduce((acc, cur) => getNewTachyonBeams(acc, cur), {tachyonBeams: [startingLine.indexOf('S')], numSplits: 0});

    return result.numSplits;
};

const generateTree = (input, startingLine) => {
    const rootNode = {
        val: startingLine.indexOf('S'),
        parents:[],
        left: null,
        right: null,
    };

    let currentLeafNodes = [rootNode];

    for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
        const line = input[lineIndex];

        const splits = line.split('').map((char, index) => ({ char, index })).filter(x => x.char === '^').map(x => x.index);
        
        if (splits.length === 0) {
            continue;
        }

        const nextNodes = [];

        currentLeafNodes.forEach(node => {
            const matchingSplit = splits.find(index => index === node.val);
            if (matchingSplit) {
                const existingLeftNode = nextNodes.find(n => n.val === matchingSplit - 1);
                if (existingLeftNode) {
                    existingLeftNode.parents.push(node);
                    node.left = existingLeftNode;
                } else {
                    const newLeftNode = {
                        val: matchingSplit - 1,
                        parents: [node],
                        left: null,
                        right: null,
                    };

                    nextNodes.push(newLeftNode);
                    node.left = newLeftNode;
                }

                const existingRightNode = nextNodes.find(n => n.val === matchingSplit + 1);
                if (existingRightNode) {
                    existingRightNode.parents.push(node);
                    node.right = existingRightNode;
                } else {

                    const newRightNode = {
                        val: matchingSplit + 1,
                        parents: [node],
                        left: null,
                        right: null,
                    };

                    nextNodes.push(newRightNode);
                    node.right = newRightNode;
                }
            } else {
                nextNodes.push(node);
            }
        })

        currentLeafNodes = nextNodes;
    }

    return rootNode;
};

const calculateUniverses = (rootNode) => {
    const memo = new Map();

    const findPatshToNode = (node) => {
        if (memo.has(node)) {
            return memo.get(node);
        }

        if (node.parents.length === 0) {
            memo.set(node, 1);
            return 1;
        }

        let totalPaths = 0;
        for (const parent of node.parents) {
            totalPaths += findPatshToNode(parent);
        }

        memo.set(node, totalPaths);

        return totalPaths;
    }

    const allNodes = new Set();
    const queue = [rootNode];
    while (queue.length > 0) {
        const node = queue.shift();
        if (!allNodes.has(node)) {
            allNodes.add(node);

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    let grandTotalPaths = 0;
    for (const node of allNodes) {
        if (!node.left && !node.right) {
            grandTotalPaths += findPatshToNode(node);
        }
    }

    return grandTotalPaths;
};

export const calc2 = (input) => {
    const modifiedInput = input.filter(x => x !== '');
    const startingLine = modifiedInput.shift();

    const treeRoot = generateTree(modifiedInput, startingLine);

    return calculateUniverses(treeRoot);
};
