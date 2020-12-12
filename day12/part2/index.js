// const input = require('../example.json');
const input = require('../input.json');

(function () {
	let waypointRelPos = [10, 1];
	let position = [0, 0];
	for (let instr of input) {
		const action = instr.substr(0, 1);
		const value = parseInt(instr.substr(1));
		switch (action) {
			case 'F':
				position[0] = position[0] + (waypointRelPos[0] * value);
				position[1] = position[1] + (waypointRelPos[1] * value);
				break;
			case 'N':
				waypointRelPos[1] = waypointRelPos[1] + value;
				break;
			case 'S':
				waypointRelPos[1] = waypointRelPos[1] - value;
				break;
			case 'W':
				waypointRelPos[0] = waypointRelPos[0] - value;
				break;
			case 'E':
				waypointRelPos[0] = waypointRelPos[0] + value;
				break;
			case 'R':
			case 'L':
				rotate(action, value);
				break;
			default:
				throw new Error('Wat');
		}
	}
	console.log(Math.abs(position[0]) + Math.abs(position[1]));

	function rotate(dir, value) {
		let workingValue = dir === 'R' ? -1 * value : value;
		let x2 = (Math.cos(toRadians(workingValue)) * waypointRelPos[0]) - (Math.sin(toRadians(workingValue)) * waypointRelPos[1]);
		let y2 = (Math.sin(toRadians(workingValue)) * waypointRelPos[0]) + (Math.cos(toRadians(workingValue)) * waypointRelPos[1]);
		waypointRelPos[0] = Math.round(x2);
		waypointRelPos[1] = Math.round(y2);
	}

	function toRadians (angle) {
		return angle * (Math.PI / 180);
	}
})();