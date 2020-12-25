// import input from '../example.js';
import input from '../input.js';


(function () {
	const days = 100;
	const tileFlipInstructions = input.split('\n').map(x => x.match(/(sw|se|e|ne|nw|w)/g));
	const maxInstructionLength = tileFlipInstructions.reduce((acc, x) => x.length > acc ? x.length : acc, 0);
	const arraySize = (maxInstructionLength + days) * 2 + 1;
	let grid = [];
	for (let x = 0; x < arraySize; x++) {
		grid.push([]);
		for (let y = 0; y < arraySize; y++) {
			grid[x][y] = '\u2B21';
		}
	}

	for (let flipInt of tileFlipInstructions) {
		let x = maxInstructionLength + days;
		let y = maxInstructionLength + days;
		for (let inst of flipInt) {
			switch (inst) {
				case 'w':
					y--;
					break;
				case 'nw':
					if (x % 2 === 0) {
						y--;
					}
					x--;
					break;
				case 'ne':
					if (x % 2 !== 0) {
						y++;
					}
					x--;
					break;
				case 'e':
					y++;
					break;
				case 'se':
					if (x % 2 !== 0) {
						y++;
					}
					x++;
					break;
				case 'sw':
					if (x % 2 === 0) {
						y--;
					}
					x++;
					break;
				default:
					throw new Error('nope');
			}
		}
		grid[x][y] = grid[x][y] === '\u2B21' ? '\u2B22' : '\u2B21';
	}
	let amount = 0;
	for (let x = 0; x < arraySize; x++) {
		for (let y = 0; y < arraySize; y++) {
			if (grid[x][y] === '\u2B22') amount++;
		}
	}

	for(let i = 0; i < days; i++) {
		morph();
	}
	count();
	// printIt();

	function count() {
		let amount = 0;
		for (let x = 0; x < arraySize; x++) {
			for (let y = 0; y < arraySize; y++) {
				if(grid[x][y] === '\u2B22') amount++;
			}			
		}
		console.log(amount);
	}

	function morph() {
		const newGrid = [];
		for (let x = 0; x < arraySize; x++) {
			newGrid.push([]);
			for (let y = 0; y < arraySize; y++) {
				const filledAdjacents = getFilledAdjacents(x, y);
				newGrid[x][y] = grid[x][y];
				if (grid[x][y] === '\u2B22' && (filledAdjacents === 0 || filledAdjacents > 2)) {
					newGrid[x][y] = '\u2B21';
				}
				else if (grid[x][y] === '\u2B21' && filledAdjacents === 2) {
					newGrid[x][y] = '\u2B22';
				} else {
					newGrid[x][y] = grid[x][y];
				}
			}
		}
		grid = newGrid;
	}

	function getFilledAdjacents(x, y) {
		let count = 0;
		let neighborPositions;
		if (x % 2) { // Odd
			neighborPositions = [
				[x - 1, y + 1],
				[x, y + 1],
				[x + 1, y + 1],
				[x + 1, y],
				[x, y - 1],
				[x - 1, y]
			];
		} else {
			neighborPositions = [
				[x - 1, y],
				[x, y + 1],
				[x + 1, y],
				[x + 1, y - 1],
				[x, y - 1],
				[x - 1, y - 1]
			];
		}
		for (let pos of neighborPositions) {
			if (pos[0] < 0 || pos[1] < 0 || pos[0] >= arraySize || pos[1] >= arraySize) continue;
			if (grid[pos[0]][pos[1]] === '\u2B22') {
				count++;
			}
		}
		return count;
	}

	function printIt() {
		grid.forEach((x, i) => i % 2 ? console.log(` ${x.join(' ')}`) : console.log(x.join(' ')));
	}
})();