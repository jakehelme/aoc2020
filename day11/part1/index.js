// const input = require('../example.json');
const input = require('../input.json');

(function () {
	let grid = [];
	let newGrid = [];
	for (let row of input) {
		grid.push(row.split(''));
		newGrid.push([]);
	}
	let hasChanged = true;
	while (hasChanged) {
		hasChanged = false;
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				const adjacents = [];
				for (let di = (i > 0 ? -1 : 0); di <= (i < grid.length - 1 ? 1 : 0); di++) {
					for (let dj = (j > 0 ? -1 : 0); dj <= (j < grid[i].length - 1 ? 1 : 0); dj++) {
						if (di !== 0 || dj !== 0) {
							adjacents.push(grid[i + di][j + dj]);
						}
					}
				}
				if (grid[i][j] === 'L') {
					if (!adjacents.filter(adj => adj === '#').length) {
						newGrid[i][j] = '#';
						hasChanged = true;
					} else {
						newGrid[i][j] = 'L';
					}
				} else if (grid[i][j] === '#') {
					if (adjacents.filter(adj => adj === '#').length >= 4) {
						hasChanged = true;
						newGrid[i][j] = 'L';
					} else {
						newGrid[i][j] = '#';
					}
				} else {
					newGrid[i][j] = '.';
				}
				console.log();
			}
		}
		printGrid(newGrid);
		console.log('\n');

		grid = newGrid;
		newGrid = new Array(grid.length);
		for(let i = 0; i < grid.length; i++) {
			newGrid[i] = new Array(grid[0].length);
		}
	}

	let occupiedSeats = 0;
	grid.forEach(row => {
		row.forEach(seat => {
			if(seat === '#') occupiedSeats++;
		})
	})

	console.log(occupiedSeats);

	function printGrid(toPrint) {
		toPrint.forEach(row => {
			console.log(row.join(''));
		});
	}

})();
