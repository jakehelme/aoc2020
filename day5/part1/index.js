const input = require('./../input.json');
const totalRows = 128;

(function() {
	const seatIds = [];
	input.forEach(code => {
		seatIds.push(parseInt(calculateSeatId(code)));
	})
	console.log(Math.max(...seatIds));
})();

function calculateSeatId(input) {
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

	return (row * 8 + col)
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