// import input from '../example.js';
import input from '../input.js';

(function () {
	const cycles = 6;
	const maxSideLength = cycles * 2 + input.length;
	let grid = [];
	let newGrid = [];
	for (let x = 0; x < maxSideLength; x++) {
		grid[x] = [];
		newGrid[x] = [];
		for (let y = 0; y < maxSideLength; y++) {
			grid[x][y] = [];
			newGrid[x][y] = [];
			for (let z = 0; z < maxSideLength; z++) {
				grid[x][y][z] = [];
				newGrid[x][y][z] = [];
				for (let w = 0; w < maxSideLength; w++) {
					grid[x][y][z][w] = '.';
					newGrid[x][y][z][w] = '.';
				}
			}
		}
	}

	for (let y = 0; y < input.length; y++) {
		let row = input[y].split('');
		for (let x = 0; x < input.length; x++) {
			grid[cycles + x][cycles + y][cycles][cycles] = row[x];
		}
	}

	for (let cycle = 0; cycle < cycles; cycle++) {
		for (let x = 0; x < maxSideLength; x++) {
			for (let y = 0; y < maxSideLength; y++) {
				for (let z = 0; z < maxSideLength; z++) {
					for (let w = 0; w < maxSideLength; w++) {
						const activeNeighbors = countActiveNeighbors(x, y, z, w);
						if (grid[x][y][z][w] === '#') {
							if (activeNeighbors === 2 || activeNeighbors === 3) {
								newGrid[x][y][z][w] = '#';
							} else {
								newGrid[x][y][z][w] = '.';
							}
						} else {
							if (activeNeighbors === 3) {
								newGrid[x][y][z][w] = '#';
							} else {
								newGrid[x][y][z][w] = '.';
							}
						}
					}
				}
			}
		}
		grid = newGrid;
		newGrid = [];
		for (let x = 0; x < maxSideLength; x++) {
			newGrid[x] = [];
			for (let y = 0; y < maxSideLength; y++) {
				newGrid[x][y] = [];
				for (let z = 0; z < maxSideLength; z++) {
					newGrid[x][y][z] = [];
					for (let w = 0; w < maxSideLength; w++) {
						newGrid[x][y][z][w] = '.';
					}
				}
			}
		}
	}

	let total = 0;
	for (let x = 0; x < maxSideLength; x++) {
		for (let y = 0; y < maxSideLength; y++) {
			for (let z = 0; z < maxSideLength; z++) {
				for (let w = 0; w < maxSideLength; w++) {
					if (grid[x][y][z][w] === '#') total++;
				}
			}
		}
	}

	console.log(total);

	function countActiveNeighbors(x, y, z, w) {
		let count = 0;
		for (let a = -1; a < 2; a++) {
			for (let b = -1; b < 2; b++) {
				for (let c = -1; c < 2; c++) {
					for (let d = -1; d < 2; d++) {
						if (a === 0 && b === 0 && c === 0 && d === 0) continue;
						if (x + a < 0 || y + b < 0 || z + c < 0 || w + d < 0) continue;
						if (x + a >= maxSideLength || y + b >= maxSideLength || z + c >= maxSideLength || w + d >= maxSideLength) continue;
						if (grid[x + a][y + b][z + c][w + d] === '#') count++;
					}
				}
			}
		}
		return count;
	}
})();