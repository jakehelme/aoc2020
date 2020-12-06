const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (_, data) => {
	const groups = data.split(/\n{2,}/g);
	const groupAnswers = groups.map(group => {
		const breaks = group.match(/\n/g);
		const groupSize = (breaks && breaks.length + 1) || 1;
		return { groupSize, answers: group.replace(/\n/g,'') };
	})
	let total = 0;
	groupAnswers.forEach(answersObj => {
		let sameAnswerCount = 0;
		const answerOccurances = {};
		answersObj.answers.split('').forEach(answer => {
			answerOccurances[answer] = answerOccurances[answer] ? answerOccurances[answer] + 1 : 1;
		});
		Object.keys(answerOccurances).forEach(key => {
			if (answerOccurances[key] === answersObj.groupSize) {
				sameAnswerCount++;
			}
		});
		total += sameAnswerCount;
	});
	console.log(total);
});
