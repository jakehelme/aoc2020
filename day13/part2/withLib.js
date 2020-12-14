const crt = require('nodejs-chinese-remainder').crt;

//7,13,x,x,59,x,31,19
console.log( `  The solution is: ${7*13*59*31*19 - crt([0,1,4,6,7], [7,13,59,31,19])}`);
//17,x,13,19
console.log( `  The solution is: ${17*13*19 - crt([0,2,3], [17,13,19])}`);
//67,7,59,61
console.log( `  The solution is: ${67*7*59*61 - crt([0,1,2,3], [67,7,59,61])}`);
//67,x,7,59,61
console.log( `  The solution is: ${67*7*59*61 - crt([0,2,3,4], [67,7,59,61])}`);
//67,7,x,59,61
console.log( `  The solution is: ${67*7*59*61 - crt([0,1,3,4], [67,7,59,61])}`);
//1789,37,47,1889
console.log( `  The solution is: ${1789*37*47*1889 - crt([0,1,2,3], [1789,37,47,1889])}`);
//19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,383,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,29,x,457,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,17
console.log( `  The solution is: ${19*37*383*23*13*29*457*41*17 - crt([0,13,19,27,32,48,50,60,67], [19,37,383,23,13,29,457,41,17])}`);

// 294354277694112
// 294354277694107 what the...