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
		const lines = data.split('\n');
		let mask;
		const finalArray = {};
		let floatingToApply = BigInt(0);
		let onesToApply = BigInt(0);
		
		for (let line of lines) {
			if (line.substr(0, 2) === 'ma') {
				mask = line.substr(7);
				let toApply = mask.split('').reduce((prev, curr, i) => {
					if (curr !== '0') {
						prev.push({ value: curr, po2: 35 - i });
					}
					return prev;
				}, []);
				onesToApply = toApply.filter(x => x.value === '1').reduce((prev, curr) => {
					return prev + BigInt(Math.pow(2, curr.po2));
				}, BigInt(0));
				floatingToApply = toApply.filter(x => x.value === 'X');
			} else {
				const [memIndex, value] = line.match(/\d+/g);
				let afterMask = BigInt(0);
				afterMask = BigInt(memIndex) | onesToApply;
				let memoryAddresses = [];

				for (let i = 0; i < floatingToApply.length; i++) {
					const floater = floatingToApply[i];
					if (memoryAddresses.length) {
						let newMems = [];
						for(let mem of memoryAddresses) {
							newMems.push(modifyBit(mem, BigInt(floater.po2), BigInt(0)));
							newMems.push(modifyBit(mem, BigInt(floater.po2), BigInt(1)));
						}
						memoryAddresses = newMems;
					} else {
						memoryAddresses.push(modifyBit(afterMask, BigInt(floater.po2), BigInt(0)));
						memoryAddresses.push(modifyBit(afterMask, BigInt(floater.po2), BigInt(1)));
					}
				}

				for (let mem of memoryAddresses) {
					finalArray[mem] = BigInt(value);
				}
			}
		}

		// console.log(finalArray.reduce((prev, curr) => {
		// 	if (curr) {
		// 		return prev + curr;
		// 	}
		// 	return prev;
		// }, BigInt(0)))
		let total = BigInt(0);
		for(let item in finalArray) {
			total = finalArray[item] + total;
		}
		console.log(total);
	}

	function modifyBit(number, position, bit) {
		const mask = BigInt(1) << position;
		return (number & ~mask) | ((bit << position) & mask);
	}
})();