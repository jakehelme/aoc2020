// const input = require('./example.json');
const input = require('../input.json');

(function () {
	const collection = {};
	input.forEach(rule => {
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