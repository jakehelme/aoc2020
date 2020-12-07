const input = require('../example.json');

(function () {
	const collection = {};
	input.forEach(x => {
		console.log(x);
		const matches = x.match(/^(\w+\s\w+)\sbags\scontain\s(\d+)\s(\w+\s\w+)\sbags?[,\.](\s(\d+)\s(\w+\s\w+)\sbags?\.)?$/);
		const name = matches[1];
		const bags = [];
		bags.push({
			qty: matches[2],
			name: matches[3]
		});
		bags.push({
			qty: matches[4],
			name: matches[5]
		});
		const bag = new Bag(name, bags);
		collection[name] = bag;
	});
})();

function Bag(name, bags) {
	this.name = name;
	this.bags = bags;
}