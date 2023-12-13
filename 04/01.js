const fs = require('fs');

const IS_TEST = false

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

/**
 * Step 2: Split the data up into their parts
*/

let scratchTotal = 0;

for (let card of dataset) {
  let cardTotal = 0;
  const regex = /(.*):(.*)\|(.*)/g;
  const [scratchCard] = card.matchAll(regex)
  
  title = scratchCard[1];
  wins  = ' ' + scratchCard[2] + ' ';
  mine  = ' ' + scratchCard[3] + ' ';

  // make an array and remove all the blanks
  const myNumbers = mine.split(' ').filter(e => e)

  // loop through myNumbers, adding blank spaces before/after the current item so we don't mismatch. 
  myNumbers.forEach(item => {
    scratched = ' ' + item + ' ';

    // if current item is in the wins string, perform some maths against it
    if(wins.includes(scratched)) cardTotal = cardTotal == 0 ? 1 : cardTotal * 2
  });

  // now that we have the card total, lets add it to the scratchcard total
  scratchTotal+=cardTotal;

}

console.log(`Total: ${scratchTotal}`);