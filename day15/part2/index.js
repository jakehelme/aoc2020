// import input, { extra1, extra2, extra3, extra4, extra5, extra6 } from '../example.js';
import input from '../input.js';
const lastNum = 30000000;

(function () {
	const startingNumbers = [...input];
	// Should optimise with Map ⬇
	const spokenNumbers = {};
	let lastSpoken;
	for (let i = 0; i < startingNumbers.length; i++) {
		spokenNumbers[startingNumbers[i]] = { lastOccurence: i, secondLastOccurence: undefined };
		lastSpoken = startingNumbers[i];
	}

	for (let i = startingNumbers.length; i < lastNum; i++) {
		if (spokenNumbers[lastSpoken].secondLastOccurence === undefined) {
			let newSlo;
			if (spokenNumbers['0']?.lastOccurence >= 0) {
				newSlo = spokenNumbers['0'].lastOccurence;
			} else {
				newSlo = undefined;
			}
			spokenNumbers['0'] = { lastOccurence: i, secondLastOccurence: newSlo };
			lastSpoken = 0;
		} else {
			lastSpoken = spokenNumbers[lastSpoken].lastOccurence - spokenNumbers[lastSpoken].secondLastOccurence;
			spokenNumbers[lastSpoken] = { lastOccurence: i, secondLastOccurence: spokenNumbers[lastSpoken]?.lastOccurence };
		}
	}
	console.log(lastSpoken);
})();