// import input from '../example.js';
import input from '../input.js';

(function () {
	const answers = [];
	for (let exp of input) {
		const stripped = exp.replace(/\s/g, '');
		const arr = stripped.split('');
		const rP = toReversePolish(arr);
		const answer = evaluateExpression(rP);
		answers.push(answer);
	}

	console.log(answers.reduce((p,c) => p + c));

	function evaluateExpression(rp) {
		const stack = [];
		for(let token of rp) {
			if(/\d/.test(token)) {
				stack.push(token);
			} else if(/(?:\+|\*)/.test(token)) {
				const op1 = stack.pop();
				const op2 = stack.pop();
				stack.push(eval(`${op1}${token}${op2}`));
			}
		}
		return stack[0];
	}

	function toReversePolish(infix) {
		const stack = [];
		const queue = [];
		for(let token of infix) {
			if(/\d/.test(token)) queue.push(token);
			else if (/(?:\+|\*)/.test(token)) {
				let topOfStack = stack.pop();
				while(/\+/.test(topOfStack) && /\*/.test(token)) {
					queue.push(topOfStack);
					topOfStack = stack.pop();
				}
				if(topOfStack) stack.push(topOfStack);
				stack.push(token);
			} else if(/\(/.test(token)) {
				stack.push(token);
			} else if(/\)/.test(token)) {
				let topOfStack = stack.pop();
				while(topOfStack !== '(') {
					queue.push(topOfStack);
					topOfStack = stack.pop();
				}
			}
		}
		while(stack.length) {
			queue.push(stack.pop());
		}
		return queue;
	}
})();