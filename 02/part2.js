const fs = require('fs');

const IS_TEST = false

// turn the data into an array
if (IS_TEST) {
  dataFile = `${__dirname}/data/test.txt`;
} else {
  dataFile = `${__dirname}/data/input.txt`;
}

const datum = fs.readFileSync(dataFile, 'utf8').split('\n')

// start off at 0 for gameID total
let gamePowerSum = 0

function storeMaxValue(current) {
  const MAXPOWAAA = current.red * current.green * current.blue
  return gamePowerSum += MAXPOWAAA
}

// Loop over the games and separate 'em out to their own array objects
for (const game of datum) {

  const cubes = {
    red: 0,
    green: 0,
    blue: 0,
  }
  
  // split games on their IDs and the sets
  const [gameNumber, cubesDisplayed] = game.split(':');
  
  // split game into sets
  const gameSets = cubesDisplayed.split(';');
    
  for (let set of gameSets) {
    
    for (let colors of set.split(',').map(item => item.trim())) {
      
      const [quantity, color] = colors.split(' ').map(item => item.trim())
      cubes[color] = Math.max(cubes[color], quantity);
    }
  }
  
  [,id] = gameNumber.split(' ')
  
  storeMaxValue(cubes)
}

console.log(gamePowerSum)
