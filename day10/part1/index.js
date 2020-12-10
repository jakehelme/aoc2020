// const input = require('../example.json')[0];
const input = require('../input.json');

(function(){
	
	const workSet = [...input].sort((a, b) => {
		if (a < b) return - 1;
		else if (a === b) return 0;
		else return 1;
	});


	const results = {
		'1': workSet[0] === 1 ? 1 : 0,
		// '2': workSet[0] === 2 ? 1 : 0,
		'3': workSet[0] === 3 ? 2 : 1
	};
	for(let i = 1; i < workSet.length; i++) {
		const diff = workSet[i] - workSet[i - 1];
		results[`${diff}`] += 1;
	}

	console.log(results['1'] * results['3']);

})();