// const input = require('../example.json')[1];
const input = require('../input.json');

(function(){
	
	const workSet = [0,...input].sort((a, b) => {
		if (a < b) return - 1;
		else if (a === b) return 0;
		else return 1;
	});

	let contiguousSetLength = 1;
	const groups = {};
	for(let i = 0; i < workSet.length; ) {
		const diff = workSet[i+1] - workSet[i];
		if( diff === 1) {
			contiguousSetLength++;
			i++;
		} else {
			groups[contiguousSetLength] = groups[contiguousSetLength] ? groups[contiguousSetLength] + 1 : 1;
			contiguousSetLength = 1;
			i++;
		}
	}

	console.log(Math.pow(7, groups[5]) * Math.pow(4, groups[4]) * Math.pow(2, groups[3]));

})();

