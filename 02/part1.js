const fs = require('fs');

const IS_TEST = false

// turn the data into an array
if (IS_TEST) {
  dataFile = `${__dirname}/data/test.txt`;
} else {
  dataFile = `${__dirname}/data/input.txt`;
}

const datum = fs.readFileSync(dataFile, 'utf8').split('\n')

// Total number of colored cubes in the bag
const maxCubes = {
  red: 12,
  green: 13,
  blue: 14
}

// start off at 0 for gameID total
let gameIdSum = 0;

function checkIfValid(current) {
  if(
    current.red > maxCubes.red || 
    current.green > maxCubes.green || 
    current.blue > maxCubes.blue
  ) {
    return false;
  }

  return gameIdSum += parseInt(id);
}

for (const game of datum) {
  
  const cubesShown = {
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
      cubesShown[color] = Math.max(cubesShown[color], quantity);
    }
  }
  
  [,id] = gameNumber.split(' ')
  
  checkIfValid(cubesShown, id);
  
}

console.log(gameIdSum);
