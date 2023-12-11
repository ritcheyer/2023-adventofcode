const fs = require('fs');

const IS_TEST = false

// turn the data into an array
if (IS_TEST) {
  dataFile = `${__dirname}/data/test.txt`;
} else {
  dataFile = `${__dirname}/data/input.txt`;
}

const datum = fs.readFileSync(dataFile, 'utf8').split('\n')