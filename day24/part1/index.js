// import input from '../example.js';
import input from '../input.js';


(function(){
	const tileFlipInstructions = input.split('\n').map(x => x.match(/(sw|se|e|ne|nw|w)/g));
	const maxInstructionLength = tileFlipInstructions.reduce((acc, x) => x.length > acc ? x.length : acc, 0);
	const arraySize = maxInstructionLength * 2 + 1;
	const grid = [];
	for (let x = 0; x < arraySize; x++) {
		grid.push([]);
		for (let y = 0; y < arraySize; y++) {
			grid[x][y] = 'w';
		}			
	}

	for(let flipInt of tileFlipInstructions) {
		let x = maxInstructionLength;
		let y = maxInstructionLength;
		for(let inst of flipInt) {
			switch(inst) {
				case 'w':
					y--;
					break;
				case 'nw':
					if(x % 2 === 0) {
						y--;
					}
					x--;
					break;
				case 'ne':
					if(x % 2 !== 0) {
						y++;
					}
					x--;
					break;
				case 'e':
					y++;
					break;
				case 'se':
					if(x % 2 !== 0) {
						y++;
					}
					x++;
					break;
				case 'sw':
					if(x % 2 === 0) {
						y--;
					}
					x++;
					break;
				default:
					throw new Error('nope');
			}
		}
		grid[x][y] = grid[x][y] === 'w' ? 'b' : 'w';
	}
	let amount = 0;
	for (let x = 0; x < arraySize; x++) {
		for (let y = 0; y < arraySize; y++) {
			if(grid[x][y] === 'b') amount++;
		}			
	}

	console.log(amount);
	grid.forEach((x,i) => i % 2 ? console.log(` ${x.join(' ')}`) : console.log(x.join(' ')));
	
})();