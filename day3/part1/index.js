// const input = require('./example.json');
const input = require('./input.json');

const grid = [];

input.forEach(row => {
	grid.push(row.split(''));
});

let x = 0; 
let y = 0; 
let treesEncountered = 0;
const rowLength = grid[0].length;

while (y < grid.length - 1) {
	x = (x + 3) % rowLength;
	y += 1;
	if(grid[y][x] === '#') {
		treesEncountered++;
	}
}

console.log(`Encountered ${treesEncountered} trees`);