// const input = require('../example.json');
const input = require('../input.json');

(function () {
	const instructions = [];
	for (let inst of input) {
		const matches = inst.match(/^(nop|acc|jmp)\s((\+|-)(\d+))$/);
		instructions.push({
			op: matches[1],
			arg: parseInt(matches[2]),
			visited: false
		});
	}

	alterInstructionSet();	

	function alterInstructionSet() {
		const potentialChanges = instructions.reduce((prev, curr, i) => {
			if(curr.op === 'nop' || curr.op === 'jmp') {
				prev.push({index: i, op: curr.op})
			}
			return prev;
		}, []);

		for(let change of potentialChanges) {
			instructions[change.index].op = change.op === 'nop' ? 'jmp' : 'nop';
			const [gotToEnd, acc] = runBootCode();
			if(gotToEnd) {
				console.log(acc);
				break;
			} else {
				instructions[change.index].op = change.op;
				instructions.forEach(inst => inst.visited = false);
			}
		}
	}

	function runBootCode() {
		let acc = 0;
		let index = 0;
		while (index < instructions.length && !instructions[index].visited) {
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
		return [index === instructions.length, acc];
	}
})();