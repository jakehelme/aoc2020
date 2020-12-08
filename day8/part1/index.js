// const input = require('../example.json');
const input = require('../input.json');

(function(){
	const instructions = [];
	for(let inst of input) {
		const matches = inst.match(/^(nop|acc|jmp)\s((\+|-)(\d+))$/);
		instructions.push({
			op: matches[1],
			arg: parseInt(matches[2]),
			visited: false
		});
	}
	let acc = 0;
	let index = 0;
	while(!instructions[index].visited) {
		instructions[index].visited = true;
		switch (instructions[index].op) {
			case 'nop':
				index++;
				break;
			case 'acc':
				acc += instructions[index].arg;
				index++;
				break;
			case 'jmp':
				index += instructions[index].arg;
				break;
			default:
				throw new Error('shouldn\'t happen');
				break;
		}
	}
	console.log(acc);
})();