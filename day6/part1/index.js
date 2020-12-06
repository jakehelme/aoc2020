const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (_, data) => {
	const groups = data.split(/\n{2,}/g);
	const groupAnswers = groups.map(group => {
		return group.replace(/\n/g,'');
	})
	let total = 0;
	groupAnswers.forEach(answers => {
		const answerSet = new Set();
		answers.split('').forEach(answer => answerSet.add(answer));
		total += answerSet.size;
	});
	console.log(total);
});
