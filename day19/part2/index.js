// import input from './example.js';
import input from '../input.js';

(function () {
	let [rawRules, messages] = input.split('\n\n').map(x => x.split('\n'));
	let rules = new Map();
	for (let rawRule of rawRules) {
		const key = rawRule.match(/^\d+/)[0];
		rules[key] = rawRule.replace(/\d+\:\s/, '').replace(/"/g, '').split(' ');
	}
	rules['8'] = ['42', '|', '42', '8'];
  rules['11'] = ['42', '31', '|', '42', '11', '31'];

	let reg = new RegExp('^' + buildRegex(rules, '0') + '$')

	function buildRegex(ruleMap, key, depth = 20) {
		
		const rule = ruleMap[key];

		if(depth <= 0) return '';
		if (rule[0] === 'a' || rule[0] === 'b') return rule[0];
		let reg = '(';
		for(let x of rule) {
			if(x === '|') {
				reg += x;
			} else {
				reg += buildRegex(ruleMap, x, depth - 1);
			}
		}
		return `${reg})`;
	}

	let totalValid = 0;
	for(let message of messages) {
		if(reg.test(message)) totalValid++;
	}
	console.log(totalValid);
})();