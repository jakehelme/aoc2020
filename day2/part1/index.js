const input = require('./input.json');
// const input = require('./example.json');
let validPasswords = 0;

input.forEach(entry => {
	const [_, start, stop, character, password] = entry.match(/^(\d+)-(\d+)\s(\w):\s(\w+)/);
	const reg = new RegExp(character, 'g');
	const count = (password.match(reg) || []).length;
	if (count >= start && count <= stop) {
		validPasswords++;
	}
});

console.log(`There are ${validPasswords} valid passwords`);