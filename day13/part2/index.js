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
		busIds = busIds.split(',').map((busId, i) => ({ busId: parseInt(busId), index: i})).filter(busIdObj => !isNaN(busIdObj.busId));
		// const first = busIds[0];
		
		// const highest = Math.max(...busIds.map(x => x.busId));
		// const highestIndex = busIds.filter(x => x.busId === highest)[0].index;

		// for(let t = 100000000000008; ; t += highest) {
		// // for(let t = highest; ; t += highest) {
		// 	let isEarliest = true;
		// 	for (let i = 0; i < busIds.length; i++) {
		// 		const isDepartureTime = !((t - highestIndex + busIds[i].index) % busIds[i].busId);
		// 		isEarliest = isEarliest && isDepartureTime;
		
		// 		if(!isEarliest) break;
		// 	}
		// 	if (isEarliest) {
		// 		console.log(t - highestIndex);
		// 		break;
		// 	} 
		// }

		const N = busIds.reduce((prev, curr) => {return prev * curr.busId}, 1);
		const m = busIds.map(x => N / x.busId);
		const n = busIds.map(x => x.busId);
		const a = busIds.map(x => x.index);
		const u = [];
		const v = [];
		for(let i = 0; i < n.length; i++) {
			const [up, vp] = bezoutsIdent(n[i], m[i]);
			u.push(up);
			v.push(vp);
		}
		const e = v.map((y,i) => y * m[i]);
		let x = e.map((y,i) => y * a[i]).reduce((curr, prev) => curr + prev, 0);
		while(true) {
			if(x > 0) {
				x -= N;
				if(x < 0) {
					console.log(`x ≡ ${x} (mod ${N})`);
					break;
				}
			} else if(x < 0) {
				x += N;
				if(x > 0) {
					console.log(`x ≡ ${x} (mod ${N})`);
					break;
				}
			}
		}

		function bezoutsIdent(a,b) {
			let r = a;
			let rp = b;
			let u = 1;
			let v = 0;
			let up = 0;
			let vp = 1;
			while(rp !== 0) {
				let q = Math.floor(r / rp);
				let rs = r;
				let us = u;
				let vs = v;
				r = rp;
				u = up;
				v = vp;
				rp = rs - q * rp;
				up = us - q * up;
				vp = vs - q * vp;
			}
			return [u, v];
		}

		// for (let t = 0; ; t = t + first) {
		// 	let isEarliest = true;
		// 	for (let i = 0; i < busIds.length; i++) {
		// 		if(!isNaN(busIds[i])) {
		// 			const isDepartureTime = !((t + i) % busIds[i]);
		// 			isEarliest = isEarliest && isDepartureTime;
		// 		}
		// 		if(!isEarliest) break;
		// 	}
		// 	if (isEarliest) {
		// 		console.log(t);
		// 		break;
		// 	} 
		// }
	}
})();