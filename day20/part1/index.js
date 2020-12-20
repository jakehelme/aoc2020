// import input from '../example.js';
import input from '../input.js';

(function () {
	let pics = input.split('\n\n').map(x => x.split('\n'));
	const picMap = new Map();
	for (let pic of pics) {
		const key = parseInt(pic[0].match(/\d+/)[0]);
		const value = { arr: pic.splice(1).map(x => x.split('')) };
		picMap.set(key, value);
	}

	for (let pic of picMap) {
		const side0 = pic[1].arr[0].join('');
		const side1 = pic[1].arr.map(x => x[x.length - 1]).join('');
		const side2 = pic[1].arr[pic[1].arr.length - 1].join('');
		const side3 = pic[1].arr.map(x => x[0]).join('');
		pic[1].sides = [
			{ matches: 0, val: side0 },
			{ matches: 0, val: side1 },
			{ matches: 0, val: side2 },
			{ matches: 0, val: side3 }
		];
	}

	for (let pic of picMap) {
		for (let pic2 of picMap) {
			if (pic2[0] === pic[0]) continue;
			for (let side of pic[1].sides) {
				for (let side2 of pic2[1].sides) {
					if (side.val === side2.val || side.val === side2.val.split('').reverse().join('')) {
						side.matches = side.matches + 1;
					}
				}
			}
		}
	}

	//find corners
	const cornerIds = [];
	for(let pic of picMap) {
		if(pic[1].sides.filter(x => x.matches === 0).length === 2) {
			cornerIds.push(pic[0]);
		}
	}

	console.log(cornerIds.reduce((acc, x) => acc * x, 1));
})();