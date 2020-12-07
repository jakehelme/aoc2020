// const input = require('../example.json');
const input = require('../input.json');

(function () {
	const collection = {};
	input.forEach(rule => {
		// const matches = rule.match(/^(\w+\s\w+)\sbags\scontain\s((\d+)\s(\w+\s\w+)\sbags?[,\.](\s(\d+)\s(\w+\s\w+)\sbags?\.)?|no\sother\sbags\.)$/);
		// if(!matches) {
		// 	console.log('broken');
		// }
		// const name = matches[1];
		// let bag;
		// if(matches[2] === 'no other bags.') {
		// 	bag = new Bag(name, []);
		// } else {
		// 	const bags = [];
		// 	bags.push({
		// 		qty: matches[3],
		// 		name: matches[4]
		// 	});
		// 	if(matches[5]) {
		// 		bags.push({
		// 			qty: matches[6],
		// 			name: matches[7]
		// 		});
		// 	}
		// 	bag = new Bag(name, bags);
		// }
		if(/,/.test(rule)) {
			const bagsRaw = rule.replace(/\w+\s\w+\sbags\scontain\s/,'').split(', ');
			const name = rule.match(/^\w+\s\w+/)[0];
			const bags = [];

			for(let bag of bagsRaw) {
				const matches = bag.match(/^(\d+)\s(\w+\s\w+)/);
				bags.push({
					qty: matches[1],
					name: matches[2]
				})
			}
			collection[name] = new Bag(name,bags);
		} else if(/\d/.test(rule)) {
			const bagRaw = rule.replace(/\w+\s\w+\sbags\scontain\s/,'')
			const name = rule.match(/^\w+\s\w+/)[0];
			const bags = [];
			const matches = bagRaw.match(/^(\d+)\s(\w+\s\w+)/);
			bags.push({
				qty: matches[1],
				name: matches[2]
			});
			collection[name] = new Bag(name,bags);
		} else {
			const name = rule.match(/^\w+\s\w+/)[0];
			const bags = [];
			collection[name] = new Bag(name,bags);
		}
	});

	// console.log(collection);
	let canContainEventually = 0;
	for(let rule in collection) {
		if(canContainShinyGold(collection[rule].bags)) {
			canContainEventually++;
		}
	}
	console.log(canContainEventually);

	function canContainShinyGold(bags) {

		for(let bag of bags) {
			if(bag.name === 'shiny gold') {
				return true;
			}
			const can = canContainShinyGold(collection[bag.name].bags);
			if (can) {
				return true;
			}
		}
		return false;
	}
})();

function Bag(name, bags) {
	this.name = name;
	this.bags = bags;
}