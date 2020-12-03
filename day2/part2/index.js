const input = require('./../part1/input.json');

// const input = require('./../part1/example.json');
let validPasswords = 0;

input.forEach(entry => {
	const [_, pos1, pos2, character, password] = entry.match(/^(\d+)-(\d+)\s(\w):\s(\w+)/);
	let charMatches = 0;
	if(password.substr(pos1 - 1, 1) === character){
		charMatches++;
	}
	if(password.substr(pos2 - 1, 1) === character){
		charMatches++;
	}
	if(charMatches === 1) {
		validPasswords++;
	}
});

console.log(`There are ${validPasswords} valid passwords`);