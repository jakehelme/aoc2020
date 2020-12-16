import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(function(){
    // fs.readFile(path.resolve(__dirname, './example.txt'), 'utf8', start);
		fs.readFile(path.resolve(__dirname, '../input.txt'), 'utf8', start);
		
		function start(err, data) {
			if(err) throw new Error('na ah');
			const [classSec, ticketSec, nearbyTicSec] = data.split('\n\n');
			const rules = classSec.split('\n').flatMap(field => {
				const numbers = field.match(/\d+/g).map(num => parseInt(num));
				return [{min: numbers[0], max: numbers[1]},{min: numbers[2], max: numbers[3]}];
			});

			const nearbyTicketsFieldValues = nearbyTicSec.split('\n').slice(1).flatMap(ticketNums => {
				return ticketNums.split(',');
			}).map(ticketNums => parseInt(ticketNums));
			const invalids = [];
			for(let val of nearbyTicketsFieldValues) {
				let isValid = false;
				for(let rule of rules) {
					isValid = isValid || fallsInRange(val, rule);
					if(isValid) break;
				}
				if(!isValid) invalids.push(val);
			}

			console.log(invalids.reduce((prev, curr) => {return prev + curr}, 0));
		}

		function fallsInRange(test, range) {
			if(test >= range.min && test <= range.max) {
				return true;
			}
			return false;
		}
})()
