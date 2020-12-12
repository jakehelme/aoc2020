// const input = require('../example.json');
const input = require('../input.json');

(function () {
	let direction = [1, 0];
	let position = [0, 0];
	for (let instr of input) {
		const action = instr.substr(0, 1);
		const value = parseInt(instr.substr(1));
		switch (action) {
			case 'F':
				position[0] = position[0] + (direction[0] * value);
				position[1] = position[1] + (direction[1] * value);
				break;
			case 'N':
				position[1] = position[1] + value;
				break;
			case 'S':
				position[1] = position[1] - value;
				break;
			case 'W':
				position[0] = position[0] - value;
				break;
			case 'E':
				position[0] = position[0] + value;
				break;
			case 'R':
			case 'L':
				const rotations = value / 90;
				for (let i = 0; i < rotations; i++) {
					rotate(action);
				}
				break;
			default:
				throw new Error('Wat');
		}
	}
	console.log(Math.abs(position[0]) + Math.abs(position[1]));

	function rotate(dir) {
		if (dir === 'R') {
			if (direction[0] === 1 && direction[1] === 0) {
				direction[0] = 0;
				direction[1] = -1;
			} else if (direction[0] === 0 && direction[1] === -1) {
				direction[0] = -1;
				direction[1] = 0;
			} else if (direction[0] === -1 && direction[1] === 0) {
				direction[0] = 0;
				direction[1] = 1;
			} else if (direction[0] === 0 && direction[1] === 1) {
				direction[0] = 1;
				direction[1] = 0;
			}
		}
		else if (dir === 'L') {
			if (direction[0] === 1 && direction[1] === 0) {
				direction[0] = 0;
				direction[1] = 1;
			} else if (direction[0] === 0 && direction[1] === -1) {
				direction[0] = 1;
				direction[1] = 0;
			} else if (direction[0] === -1 && direction[1] === 0) {
				direction[0] = 0;
				direction[1] = -1;
			} else if (direction[0] === 0 && direction[1] === 1) {
				direction[0] = -1;
				direction[1] = 0;
			}
		}
	}
})();