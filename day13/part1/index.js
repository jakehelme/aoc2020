import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(function(){
	// fs.readFile(path.resolve(__dirname, '../example.txt'), 'utf8', start);
	fs.readFile(path.resolve(__dirname, '../input.txt'), 'utf8', start);

	function start(err, inputRaw) {
		if (err) console.error(err);
		console.log(inputRaw);
		let [earliest, busIds] = inputRaw.split('\n');
		earliest = parseInt(earliest);
		busIds = busIds.split(',').filter(busId => busId !== 'x');
		for(let i = earliest; ; i++) {
			for(let busId of busIds) {
				if(!(i % busId)) {
					console.log((i - earliest) * busId);
					return;
				}
			}
		}
	}
})();