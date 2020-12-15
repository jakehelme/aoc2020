import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(function(){
    fs.readFile(path.resolve(__dirname, './example.txt'), 'utf8', start);
    // fs.readFile(path.resolve(__dirname, '../input.txt'), 'utf8', start);
    
    function start(err, data) {
        if (err) throw new Error('na ah');
        const lines = data.split('\n');
        let mask;
        const mem = [];
        let or = BigInt(0);
        let and = BigInt(0);
        let toApply;
        for(let line of lines) {
            if(line.substr(0,2) === 'ma') {
                mask = line.substr(7);
                toApply = mask.split('').reduce((prev, curr, i) => {
                    if(curr !== 'X'){
                        prev.push({value: curr, po2: 35 - i});
                    }
                    return prev;
                }, []);
                and = toApply.filter(x => x.value === '0').reduce((prev, curr) => {
                    return prev + BigInt(Math.pow(2, curr.po2));
                },BigInt(0));
                or = toApply.filter(x => x.value === '1').reduce((prev, curr) => {
                    return prev + BigInt(Math.pow(2, curr.po2));
                },BigInt(0));
            } else {
                const [memIndex, value] = line.match(/\d+/g);
                let newValue = BigInt(0);
                newValue = BigInt(value) & ~and | or;
                mem[memIndex] = newValue;
            }
        }
        console.log(mem.reduce((prev, curr) => {
            if(curr) {
                return prev + curr;
            }
            return prev;
        },BigInt(0)))
    }

    function toBinary(input) {
		var result = "";
		for (var i = 0; i < input.length; i++) {
			var bin = input[i].charCodeAt().toString(2);
			result += Array(8 - bin.length + 1).join("0") + bin;
		} 
		return result;
	}
})();