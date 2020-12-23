(function(){
	// const input = '389125467';
	const input = '219748365';
	let max = 1000000;
	let cups = new Map();
	input.split('').forEach((x,i,arr) => {
		x = parseInt(x);
		if(i < arr.length - 1) {
			cups.set(x, parseInt(arr[i+1]));
		} else {
			cups.set(x, arr.length + 1);
		}
	});
	for(let i = 10; i < 1000000; i++) {
		cups.set(i, i + 1);
	}
	cups.set(1000000, parseInt(input.split('')[0]));
	console.log(cups.get(1000000));
	let currentCup = parseInt(input.split('')[0]);
	for(let rounds = 0; rounds < 10000000; rounds++) {
		let cupsToMove = [];
		for(let i = 0; i < 3; i++) {
			if(!cupsToMove.length) {
				cupsToMove.push(cups.get(currentCup));
			} else {
				cupsToMove.push(cups.get(cupsToMove[i-1]));
			}
		}
		let destination = currentCup === 1 ? max : currentCup - 1;
		while(cupsToMove.includes(destination)) {
			destination--;
			if(!destination) destination = max;
		}
		let temp = cups.get(destination);
		cups.set(currentCup, cups.get(cupsToMove[2]));
		cups.set(destination, cupsToMove[0]);
		cups.set(cupsToMove[2], temp);
		currentCup = cups.get(currentCup);
	}

	console.log(cups.get(1), cups.get(cups.get(1)));
	console.log(cups.get(1) * cups.get(cups.get(1)));
})();