const fs = require('fs');
const path = require('path');

const c = path.join(__dirname, 'input.txt');

const input = fs.readFile(c, 'utf8', (_, data) => {
	let validPassports = 0;
	const passports = data.split(/\n{2,}/g);
	passports.forEach(passport => {
		if(
			/byr:/.test(passport) &&
			/iyr:/.test(passport) &&
			/eyr:/.test(passport) &&
			/hgt:/.test(passport) &&
			/hcl:/.test(passport) &&
			/ecl:/.test(passport) &&
			/pid:/.test(passport) 
		) {
			validPassports++;
		}
	});
	console.log(validPassports);
});