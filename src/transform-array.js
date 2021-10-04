import {NotImplementedError} from '../extensions/index.js';

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
export default function transform(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('\'arr\' parameter must be an instance of the Array!');
    } else {
        let copiedArray = [...arr];
        let resultArray = [];

        if (copiedArray[0] === '--discard-prev'
            || copiedArray[0] === '--double-prev') {
            return copiedArray.slice(1, copiedArray.length);
        } else if (copiedArray[copiedArray.length - 1] === '--double-next'
            || copiedArray[copiedArray.length - 1] === '--discard-next') {
            return copiedArray.slice(0, -1);
        }

        for (let i = 0; i < copiedArray.length; i++) {
            resultArray.push(copiedArray[i]);
            switch (copiedArray[i]) {
                case '--discard-next':
                    resultArray.pop();
                    copiedArray.splice(i + 1, 1);
                    break;
                case '--discard-prev':
                    resultArray.pop();
                    resultArray.splice(i - 1, 1);
                    break;
                case '--double-next':
                    resultArray.pop();
                    copiedArray.splice(i + 1, 0, copiedArray[i + 1]);
                    break;
                case '--double-prev':
                    resultArray.pop();
                    resultArray.splice(i - 1, 0, resultArray[i - 1]);
                    break;
            }
        }

        return resultArray;
    }
}
