const fs = require('fs');

const IS_TEST = true

// turn the data into an array
if (IS_TEST) {
  // very simple test
  // fileName = 'simple.txt'

  // advent's test data
  fileName = 'test.txt'
} else {
  fileName = 'input.txt'
}

dataFile = `${__dirname}/data/${fileName}`

/**
 * Step 1: Injest the data
 */
const datum = fs.readFileSync(dataFile, 'utf8')
const dataset = datum.split('\n')

console.log(dataset);