(function(){
	// const input = '389125467';
	const input = '219748365';

	let cups = input.split('');

	playGame(cups);

	function playGame(cups) {
		const cupLength = cups.length;
		for(let i = 0; i < 100; i++) {
			const cupIndex = i % cups.length;
			const currentVal = parseInt(cups[cupIndex]);
			const pickedUp = cups.splice(cupIndex + 1, 3);
			while(pickedUp.length !== 3) {
				pickedUp.push(cups.shift());
			}
			
			let foundDestination = false;
			let j = 0;
			while(!foundDestination) {
				j++;
				let searchLabel = currentVal - j ? currentVal - j : cupLength;
				searchLabel = searchLabel < 0 ? searchLabel + cupLength : searchLabel;
				searchLabel = `${searchLabel}`;
				if(!pickedUp.includes(searchLabel)) {
					foundDestination = true;
					const destIndex = cups.indexOf(searchLabel);
					cups.splice(destIndex + 1, 0, ...pickedUp);
					if(destIndex < cupIndex) {
						const newCupIndex = cups.indexOf(`${currentVal}`);
						for(let k = 0; k < newCupIndex - cupIndex; k++) {
							cups.push(cups.shift());
						}
					}
				}
			}
		}
		while(cups[0] !== '1') {
			cups.push(cups.shift());
		}

		console.log(cups.slice(1).join(''));
	}
})();