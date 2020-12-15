// import input, { extra1, extra2, extra3, extra4, extra5, extra6 } from '../example.js';
import input from '../input.js';
const lastNum = 2020;

(function () {
	const startingNumbers = [...input];
	const spokenNumbers = [];
	for (let i = 0; i < lastNum; i++) {
		if (!isNaN(startingNumbers[i])) {
			spokenNumbers.push(startingNumbers[i]);
		} else {
			let occurences = spokenNumbers.reduce((prev, curr) => { return curr === spokenNumbers[i - 1] ? prev + 1 : prev }, 0);

			if (occurences === 1) {
				spokenNumbers.push(0);
			} else if (occurences > 1) {
				occurences = spokenNumbers.reduce((prev, curr, j) => {
					if (curr === spokenNumbers[i - 1]) {
						return [...prev, j];
					}
					return prev;
				}, []);
				spokenNumbers.push(occurences[occurences.length - 1] - occurences[occurences.length - 2]);
			} else {
				throw new Error('na ah');
			}
		}
	}
	console.log(spokenNumbers[lastNum - 1]);
})();