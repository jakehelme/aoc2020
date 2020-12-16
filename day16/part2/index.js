import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(function () {
	// fs.readFile(path.resolve(__dirname, './example.txt'), 'utf8', start);
	fs.readFile(path.resolve(__dirname, '../input.txt'), 'utf8', start);

	function start(err, data) {
		if (err) throw new Error('na ah');
		const [classSec, ticketSec, nearbyTicSec] = data.split('\n\n');
		const fields = classSec.split('\n').map(field => {
			const numbers = field.match(/\d+/g).map(num => parseInt(num));
			const name = field.match(/\w+\s?\w+/)[0];
			return { name, ranges: [{ min: numbers[0], max: numbers[1] }, { min: numbers[2], max: numbers[3] }] };
		});

		const nearbyTickets = nearbyTicSec.split('\n').slice(1).map(ticketNums => {
			return ticketNums.split(',').map(x => parseInt(x));
		});
		const valids = [];
		for (let ticket of nearbyTickets) {
			let allValid = true;
			for (let value of ticket) {
				let isValid = false;
				for (let field of fields) {
					for (let range of field.ranges) {
						isValid = isValid || fallsInRange(value, range);
						if (isValid) break;
					}
					if (isValid) break;
				}
				allValid = allValid && isValid;
			}
			if (allValid) valids.push(ticket);
		}
		valids.push(ticketSec.split('\n')[1].split(',').map(x => parseInt(x)));
		for (let field of fields) {
			field.ticketIndex = [];
			for (let ticketIndex = 0; ticketIndex < valids[0].length; ticketIndex++) {
				let isValidForField = true;
				for (let valid of valids) {
					if (fallsInRange(valid[ticketIndex], field.ranges[0]) || fallsInRange(valid[ticketIndex], field.ranges[1])) {
						console.log();
					} else {
						isValidForField = false;
						break;
					}
				}
				if (isValidForField) {
					field.ticketIndex.push(ticketIndex);
				}
			}
		}

		while (fields.some(x => x.ticketIndex.length)) {
			const indexToRemove = fields.filter(field => field.ticketIndex.length === 1)[0].ticketIndex[0];
			for (let field of fields) {
				field.ticketIndex = field.ticketIndex.filter(x => x !== indexToRemove);
				if (!field.ticketIndex.length && isNaN(field.finalIndex)) {
					field.finalIndex = indexToRemove;
				}
			}
		}
		const myTicket = ticketSec.split('\n')[1].split(',').map(x => parseInt(x));
		const departureFields = fields.filter(x => x.name.substr(0, 2) === 'de');
		const answer = departureFields.reduce((prev, curr) => { return prev * myTicket[curr.finalIndex] }, 1);
		console.log(answer);
	}

	function fallsInRange(test, range) {
		return test >= range.min && test <= range.max;
	}
})()
