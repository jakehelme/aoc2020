// import input from '../example.js';
import input from '../input.js';
import fs from 'fs';

(function () {
	let pics = input.split('\n\n').map(x => x.split('\n'));
	const picMap = new Map();
	for (let pic of pics) {
		const key = parseInt(pic[0].match(/\d+/)[0]);
		const value = { arr: pic.slice(1).map(x => x.split('')) };
		picMap.set(key, value);
	}

	for (let pic of picMap) {
		const t = pic[1].arr[0].join('');
		const r = pic[1].arr.map(x => x[x.length - 1]).join('');
		const b = pic[1].arr[pic[1].arr.length - 1].join('');
		const l = pic[1].arr.map(x => x[0]).join('');
		pic[1].sides = {
			top: { matches: 0, val: t },
			right: { matches: 0, val: r },
			bottom: { matches: 0, val: b },
			left: { matches: 0, val: l }
		};
	}

	for (let pic of picMap) {
		for (let pic2 of picMap) {
			if (pic2[0] === pic[0]) continue;
			for (let side in pic[1].sides) {
				for (let side2 in pic2[1].sides) {
					if (pic[1].sides[side].val === pic2[1].sides[side2].val || pic[1].sides[side].val === pic2[1].sides[side2].val.split('').reverse().join('')) {
						pic[1].sides[side].matches = pic[1].sides[side].matches + 1;
					}
				}
			}
		}
	}

	//find corners
	const cornerIds = [];
	for (let pic of picMap) {
		let nonMatches = 0;
		for (let side in pic[1].sides) {
			if (pic[1].sides[side].matches === 0) {
				nonMatches++;
			}
		}
		if (nonMatches === 2) {
			cornerIds.push(pic[0]);
		}
	}

	//start building final grid
	const assembledPic = [[]];
	//start with arbitrary corner
	let comparingPicId = cornerIds[0];
	let currentPic = picMap.get(comparingPicId);
	//rotate so that its top left corner
	while (!(currentPic.sides['top'].matches === 0 && currentPic.sides['left'].matches === 0)) {
		rotatePicClockwise(picMap.get(comparingPicId));
	}
	assembledPic[0][0] = comparingPicId;
	picMap.get(comparingPicId).placed = true;

	const finalGridLength = Math.sqrt(picMap.size);
	let checkTop = false;
	for (let i = 0; i < finalGridLength; i++) {
		for (let j = 0; j < finalGridLength - 1; j++) {
			for (let pic of picMap) {
				let foundMatch = false;
				
				if (pic[1].placed) continue;
				
				lookForMatchesClockwise();
				if(!foundMatch) {
					transpose(pic[1]);
					lookForMatchesClockwise();
				}

				if(foundMatch) break;

				function lookForMatchesClockwise() {
					let rotateCount = 0;
					while (rotateCount < 4) {
						if (checkTop) {
							if (picMap.get(assembledPic[i - 1][j]).sides['bottom'].val === pic[1].sides['top'].val) {
								assembledPic.push([]);
								assembledPic[i][j] = pic[0];
								pic[1].placed = true;
								foundMatch = true;
								checkTop = false;
								j--;
								return;
							} else {
								rotatePicClockwise(pic[1]);
								rotateCount++;
							}
						} else {
							if (picMap.get(assembledPic[i][j]).sides['right'].val === pic[1].sides['left'].val) {
								assembledPic[i][j + 1] = pic[0];
								pic[1].placed = true;
								foundMatch = true;
								return;
							} else {
								rotatePicClockwise(pic[1]);
								rotateCount++;
							}
						}
					}
					return;
				}
			}
		}
		checkTop = true;
	}

	// printFinalGrid();

	const borderlessGrid = [];
	for(let i = 0; i < assembledPic.length; i++) {
		borderlessGrid.push([]);
		for(let j = 0; j < assembledPic.length; j++) {
			borderlessGrid[i][j] = createBorderLessPic(picMap.get(assembledPic[i][j]));
		}
	}
	
	const stitched = seamTogether();
	printPic({arr: stitched});
	let seaMonsters = [];
	seaMonsters.push(findSeaMonsters(stitched));

	rotatePicClockwise({arr: stitched});
	seaMonsters.push(findSeaMonsters(stitched));
	
	rotatePicClockwise({arr: stitched});
	seaMonsters.push(findSeaMonsters(stitched));
	
	rotatePicClockwise({arr: stitched});
	seaMonsters.push(findSeaMonsters(stitched));

	transpose({arr: stitched});
	seaMonsters.push(findSeaMonsters(stitched));

	rotatePicClockwise({arr: stitched});
	seaMonsters.push(findSeaMonsters(stitched));

	rotatePicClockwise({arr: stitched});
	seaMonsters.push(findSeaMonsters(stitched));

	rotatePicClockwise({arr: stitched});
	seaMonsters.push(findSeaMonsters(stitched));

	const highest = Math.max(...seaMonsters);
		
	const stringedArr = stitched.map(x => x.join(''));
	const oneString = stringedArr.reduce((acc, x) => {return acc + x}, '');
	const hashCount = oneString.split('').filter(x => x === '#').length;
	console.log(hashCount - (15 * highest));

	function findSeaMonsters(arr) {
		let seaMonsterCount = 0;
		const line1pattern = /^..................#.$/;
		const line2pattern = /^#....##....##....###$/;
		const line3pattern = /^.#..#..#..#..#..#...$/;
		for(let i = 0; i < arr.length - 2; i++) {
			for(let j = 0; j < arr.length - 19; j++) {
				const line1 = arr[i].join('').slice(j, j + 20);
				const line2 = arr[i+1].join('').slice(j, j + 20);
				const line3 = arr[i+2].join('').slice(j, j + 20);
				if(line1pattern.test(line1) && line2pattern.test(line2) && line3pattern.test(line3)) {
					seaMonsterCount++;
				}
				// if(line1pattern.test(line3) && line2pattern.test(line2) && line3pattern.test(line1)) {
				// 	seaMonsterCount++;
				// }
			}
		}
		return seaMonsterCount;
	}

	function rotatePicClockwise(pic) {
		transpose(pic);
		reverseRows(pic);
	}

	function rotatePicCounterClockwise(pic) {
		reverseRows(pic);
		transpose(pic);
	}

	function reverseRows(pic) {
		for (let row of pic.arr) {
			row.reverse();
		}
		if(pic.sides) {
			pic.sides['top'].val = pic.sides['top'].val.split('').reverse().join('');
			pic.sides['bottom'].val = pic.sides['bottom'].val.split('').reverse().join('');
			let temp;
			temp = pic.sides['right'];
			pic.sides['right'] = pic.sides['left'];
			pic.sides['left'] = temp;
		}
	}

	function transpose(pic) {
		for (var i = 0; i < pic.arr.length; i++) {
			for (var j = 0; j < i; j++) {
				[pic.arr[i][j], pic.arr[j][i]] = [pic.arr[j][i], pic.arr[i][j]];
			}
		}
		if(pic.sides) {
			let temp;
			temp = pic.sides['top'];
			pic.sides['top'] = pic.sides['left'];
			pic.sides['left'] = temp;
			temp = pic.sides['bottom'];
			pic.sides['bottom'] = pic.sides['right'];
			pic.sides['right'] = temp;
		}
	}

	function printPic(pic) {
		let printOut = pic.arr.map(x => x.join(''));
		printOut = printOut.join('\n') + '\n';
		console.log(printOut);
		console.log();
	}

	function createBorderLessPic(pic) {
		const newArr = [];
		for(let i = 1; i < pic.arr.length - 1; i++) {
			newArr.push([]);
			for(let j = 1; j < pic.arr.length - 1; j++) {
				newArr[i - 1].push(pic.arr[i][j]);
			}
		}
		return newArr;
	}

	function seamTogether() {
		let buffer = [];
		for(let i = 0; i < borderlessGrid.length; i++) {
			for(let j = 0; j < borderlessGrid[0].length * borderlessGrid[0][0].length; j++) {
				buffer.push([]);
				if(j % borderlessGrid[0][0].length === 0 && j !== 0) {
					i++;
				}
				for(let k = 0; k < borderlessGrid.length; k++) {
					const picArr = borderlessGrid[i][k];
					buffer[j].push(...picArr[j % borderlessGrid[0][0].length]);
				}

			}
		}
		return buffer;
	}

	function printFinalGrid() {
		let total = ''
		for(let row of assembledPic) {
			let buffer = '';
			for (let i = 0; i < picMap.get(row[0]).arr.length; i++) {
				for(let col of row) {
					const picArr = picMap.get(col).arr;
					buffer += `${picArr[i].join('')} `;
				}
				buffer += '\n';
			}
			total += buffer + '\n';
			console.log(buffer);
			console.log();
		}
		fs.writeFileSync('assembled.txt', total);
	}

})();