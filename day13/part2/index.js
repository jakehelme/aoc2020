import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(function () {
	fs.readFile(path.resolve(__dirname, '../example.txt'), 'utf8', start);
	// fs.readFile(path.resolve(__dirname, '../input.txt'), 'utf8', start);

	function start(err, inputRaw) {
		if (err) console.error(err);
		let [earliest, busIds] = inputRaw.split('\n');
		earliest = parseInt(earliest);
		busIds = busIds.split(',').map(busId => parseInt(busId));
		const first = busIds[0];

		for (let t = 0; ; t = t + first) {
			let isEarliest = true;
			for (let i = 0; i < busIds.length; i++) {
				if(!isNaN(busIds[i])) {
					const isDepartureTime = !((t + i) % busIds[i]);
					isEarliest = isEarliest && isDepartureTime;
				}
				if(!isEarliest) break;
			}
			if (isEarliest) {
				console.log(t);
				break;
			} 
		}
	}
})();