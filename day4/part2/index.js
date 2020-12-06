const { match } = require('assert');
const fs = require('fs');
const path = require('path');

const c = path.join(__dirname, './../part1/input.txt');
// const c = path.join(__dirname, 'validEx.txt');

testInput();

function testInput() {
	fs.readFile(c, 'utf8', (_, data) => {
		let validPassports = 0;
		const passports = data.split(/\n{2,}/g);
		passports.forEach(passport => {
			if (!/byr:/.test(passport) || passport.match(/byr:(\d{4})(\s|\n|$)/)[1] < 1920 || passport.match(/byr:(\d{4})(\s|\n|$)/)[1] > 2002) {
				return;
			}
			if (!/iyr:/.test(passport) || passport.match(/iyr:(\d{4})(\s|\n|$)/)[1] < 2010 || passport.match(/iyr:(\d{4})(\s|\n|$)/)[1] > 2020) {
				return;
			}
			if (!/eyr:/.test(passport) || passport.match(/eyr:(\d{4})(\s|\n|$)/)[1] < 2020 || passport.match(/eyr:(\d{4})(\s|\n|$)/)[1] > 2030) {
				return;
			}
			if (/hgt:/.test(passport)) {
				const matches = passport.match(/hgt:(\d{2,3})(cm|in)/);
				if (matches && matches[2] === 'cm') {
					if (matches[1] < 150 || matches[1] > 193) {
						return;
					}
				} else if (matches && matches[2] === 'in') {
					if (matches[1] < 59 || matches[1] > 76) {
						return;
					}
				} else {
					return;
				}
			} else {
				return;
			}
			if (!/hcl:#[0-9a-f]{6}(\s|\n)?/.test(passport)) {
				return;
			}
			if (!/ecl:(amb|blu|brn|gry|grn|hzl|oth)/.test(passport)) {
				return;
			}
			if (!/pid:\d{9}(\s|\n|$)/.test(passport)) {
				return;
			}
			validPassports++;
		});
		console.log(validPassports);
	});
}

// function testBirthYear(input) {
//  	return /byr:(\d{4})/.test(input) && input.match(/byr:(\d{4})(\s|\n|$)/)[1] >= 1920 && input.match(/byr:(\d{4})(\s|\n|$)/)[1] <= 2002;
// }

// module.exports = {
// 	testBirthYear
// };