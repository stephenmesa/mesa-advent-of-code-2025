export const calc1 = (input) => {
    // Assume we start at position 50
    let currentPosition = 50;
    let returnValue = 0;
    for (let i = 0; i < input.length; i++) {
        const currentLine = input[i];
        if (currentLine === '') continue;
        const direction = currentLine[0];
        const value = parseInt(currentLine.slice(1), 10);
        if (direction === 'L') {
            // Rotate left
            currentPosition -= value
            while (currentPosition < 0) {
                currentPosition += 100;
            }
        } else {
            // Rotate right
            currentPosition += value
            currentPosition %= 100;
        }
        if (currentPosition == 0) {
            returnValue += 1;
        }
    }

    return returnValue;
}

// export const calc2 = (input) => {
//     // Assume we start at position 50
//     let currentPosition = 50;
//     let returnValue = 0;
//     for (let i = 0; i < input.length; i++) {
//         let crossedZero = false;
//         const previousPosition = currentPosition;
//         const currentLine = input[i];
//         if (currentLine === '') continue;
//         const direction = currentLine[0];
//         const value = parseInt(currentLine.slice(1), 10);

//         // Add for full rotations
//         // returnValue += Math.ceil(value / 100) - 1;
//         returnValue += Math.floor(value / 100);
//         // console.log(`adding ${Math.ceil(value / 100) - 1} for full rotations on value: ${value}`);
        
//         if (direction === 'L') {
//             // Rotate left
//             currentPosition -= value;
//             // if (previousPosition > 0 && currentPosition < 0) {
//             //     returnValue += 1;
//             // }

//             while (currentPosition < 0) {
//                 currentPosition += 100;
//             }
//         } else {
//             // Rotate right
//             currentPosition += value;

//             // if (previousPosition < 100 && currentPosition > 100) {
//             //     returnValue += 1;
//             // }
//             currentPosition %= 100;
//         }
//         if (currentPosition == 0) {
//             returnValue += 1;
//         }
//     }

//     return returnValue;
// }

export const calc2 = (input) => {
    // Assume we start at position 50
    let currentPosition = 50;
    let returnValue = 0;
    for (let i = 0; i < input.length; i++) {
        const currentLine = input[i];
        if (currentLine === '') continue;
        const direction = currentLine[0];
        const value = parseInt(currentLine.slice(1), 10);

        for (let step = 0; step < value; step++) {
            if (direction === 'L') {
                // Rotate left
                currentPosition -= 1;

                if (currentPosition === 0) {
                    returnValue += 1;
                } else if (currentPosition < 0) {
                    currentPosition = 99;
                }
            } else {
                // Rotate right
                currentPosition += 1;

                if (currentPosition === 100) {
                    returnValue += 1;
                    currentPosition = 0;
                }
            }
        }
    }

    return returnValue;
}

