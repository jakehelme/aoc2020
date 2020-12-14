import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(function () {
	// fs.readFile(path.resolve(__dirname, '../example.txt'), 'utf8', start);
	fs.readFile(path.resolve(__dirname, '../input.txt'), 'utf8', start);

	function start(err, inputRaw) {
		if (err) console.error(err);
		let [earliest, busIds] = inputRaw.split('\n');
		earliest = parseInt(earliest);
		busIds = busIds.split(',').map((busId, i) => ({ busId: parseInt(busId), index: i})).filter(busIdObj => !isNaN(busIdObj.busId));

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
	}
})();