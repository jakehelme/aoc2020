// const input = require('../example.json');
const input = require('../input.json');
const preambleSize = 25;

(function(){
	for(let i = preambleSize; i < input.length; i++) {
		const num = input[i];
		const preamble = input.slice(i - preambleSize, i);
		const result = testForSumTo(num, preamble);
		if(!result) console.log(num);
	}
	

	function testForSumTo(toCheck, preamble) {
		for(let i = 0; i < preamble.length; i++) {
			for(let j = i + 1; j < preamble.length; j++) {
				if (preamble[i] + preamble[j] === toCheck) {
					return true;
				}
			}
		}
		return false;
	}
})();