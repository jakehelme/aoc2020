const input = require('./../input.json');
const totalRows = 128;
const totalCols = 8;

(function() {
	const grid = [];
	for(let i = 0; i < totalRows; i++) {
		grid[i] = [];
		for(let j = 0; j < totalCols; j++) {
			grid[i][j] = false;
		}
	}

	input.forEach(code => {
		const [row, col] = calculateSeatPos(code);
		grid[row][col] = true;
	})
	
	for(let i = 0; i < totalRows; i++) {
		for(let j = 0; j < totalCols; j++) {
			if((i === 0 && j === 0) || (i === totalRows - 1 && j === totalCols -1)) {
				continue;
			}
			let prev = j ? grid[i][j-1] : grid[i-1][totalCols-1];
			let curr = grid[i][j];
			let next = j < totalCols - 1 ? grid[i][j+1] : grid[i+1][0];

			if(prev === true && curr === false && next === true) {
				console.log(`Your seatId is ${i * 8 + j}`);
			}
		}
	}
	



})();

function calculateSeatPos(input) {
	let min = 0;
	let max = totalRows - 1;
	const rowIdentifier = input.substr(0, 7)
	rowIdentifier.split('').forEach(char => {
		[min, max] = halveRange(char, min, max);
	});
	const row = min;

	min = 0;
	max = 7;
	const colIdentifier = input.substr(7,3);
	colIdentifier.split('').forEach(char => {
		[min, max] = halveRange(char, min, max);
	});
	const col = min;

	return [row, col];
}

function halveRange(direction, min, max) {
	const halfway = (max - min + 1) / 2;
	if(direction === 'F' || direction === 'L') {
		return [min, halfway + min - 1];
	} else if (direction === 'B' || direction === 'R') {
		return [min + halfway, max];
	}
	throw new Error('Shouldn\'t happen');
}