const fs = require('fs');

const IS_TEST = false

// turn the data into an array
if (IS_TEST) {
  // very simple test
  // fileName = 'simple.txt';

  // advent's test data
  fileName = 'test.txt';
} else {
  fileName = 'input.txt';
}

dataFile = `${__dirname}/data/${fileName}`;

/**
 * Problem:
 * =========
 * Given an input, find all the numbers that have a non-period symbol adjacent to it.
 * Adjacent means:
 *  - Directly above the number
 *  - Directly below the number
 *  - Directly left of the number
 *  - Directly right of the number
 *  - Diagonally top left or top right
 *  - Diagonally bottom left or bottom right
 * 
 * Solution:
 * =========
 * 1. Injest the input and store as an array of objects (lines).
 * 2. Find the numbers within the array and determine:
 *    - their starting position
 *    - their row index
 * 3. Leverage the number-found to identify every character surrounding it:
 *    - Determine if the row is undefined or not - if undefined, make it simple and just return a period (.).
 *    - Determine the substring that matters for each row - every character surrounding a number.
 *    - Combine the top, current, and bottom rows; remove all numbers from the string as they don't matter
 *    - Determine is there is a symbol within the substring
 *    - If symbol exists, add it to the part numbers.
 * 
 */

/**
 * Step 1: Injest the data
 */
const datum = fs.readFileSync(dataFile, 'utf8')
const datumArray = datum.split('\n')

REGEX_NUMBERS = /[0-9]+/g;
REGEX_SYMBOLS = /[^0-9.]/;

let possiblePartNumbers = [];
let partNumberSum = 0;

/**
 * Step 2: Find the numbers, their starting position, and their row index
 */
datumArray.forEach((row,index) => {
  for (number of row.matchAll(REGEX_NUMBERS)) {
    possiblePartNumbers.push({
      value: number[0],
      startIndex: number.index,
      rowIndex: index
    })
  }
});

// if the row is not defined, return as a period (.)
function isRowDefined(row) {
  if (row === undefined) return '.';
  return row;
}

// find out where the substring starts and ends for each row
function identifySubstring(row, start, end) {
  return row.substring(start, end);
}

// remove any numbers from the string
function sanitizeResult(res) {
  return res.replace(REGEX_NUMBERS, '')
}

/**
 * Step 3: Identify any symbols surrounding numbers.
 */
possiblePartNumbers.forEach((element) => {

  let allCharacters = '';
  const { value, startIndex: start, rowIndex: row } = element;

  // make sure each row is actually defined
  topRow = isRowDefined(datumArray[row - 1])
  curRow = isRowDefined(datumArray[row])
  botRow = isRowDefined(datumArray[row + 1])

  // concatenate the top, current, bottom strings together
  allCharacters += identifySubstring(topRow, start - 1, start + value.length + 1)
  allCharacters += identifySubstring(curRow, start - 1, start + value.length + 1)
  allCharacters += identifySubstring(botRow, start - 1, start + value.length + 1)

  // remove numbers from the string because they don't matter
  numbersRemoved = sanitizeResult(allCharacters)

  // test if there is a symbol in the sanitized substring
  isAPartNumber = REGEX_SYMBOLS.test(numbersRemoved);

  if(isAPartNumber) {
    partNumberSum += parseInt(element.value);
  }
});

console.log(partNumberSum)