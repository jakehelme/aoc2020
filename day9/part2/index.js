// const input = require('../example.json');
const input = require('../input.json');
// const magicNumber = 127;
const magicNumber = 507622668;

(function () {
	let sum = 0;
	for(let j = 0; j < input.length - 1; j++) {
		for (let i = 0; sum < magicNumber; i++) {
			const contiguousSet = input.slice(j, j + i + 2);
			sum = contiguousSet.reduce((prev, curr) => prev + curr);
			if (sum === magicNumber) {
				console.log(Math.min(...contiguousSet) + Math.max(...contiguousSet));
				return;
			}
		}
		sum = 0;
	}
})();