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

	console.log(getBagCount(collection['shiny gold'].bags));

	function getBagCount(bags) {
		let count = 0;
		for(let bag of bags) {
			count += parseInt(bag.qty);
			if(collection[bag.name].bags.length) {
				count += parseInt(bag.qty) * getBagCount(collection[bag.name].bags);
			}
		}
		return count;
	}
})();

function Bag(name, bags) {
	this.name = name;
	this.bags = bags;
}