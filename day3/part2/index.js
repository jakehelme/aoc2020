// const input = require('./../part1/example.json');
const input = require('./../part1/input.json');

const grid = [];

input.forEach(row => {
	grid.push(row.split(''));
});

const slope1 = runToboggan(1, 1);
const slope2 = runToboggan(3, 1);
const slope3 = runToboggan(5, 1);
const slope4 = runToboggan(7, 1);
const slope5 = runToboggan(1, 2);

console.log(`The answer is ${slope1 * slope2 * slope3 * slope4 * slope5}`);

function runToboggan(right, down) {
	let x = 0;
	let y = 0;
	let treesEncountered = 0;
	const rowLength = grid[0].length;

	while (y < grid.length - 1) {
		x = (x + right) % rowLength;
		y += down;
		if (grid[y][x] === '#') {
			treesEncountered++;
		}
	}
	return treesEncountered;
}
