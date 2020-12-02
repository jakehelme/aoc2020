const input = require('./input.json');

while(input.length){
    const a = input.pop();
    input.forEach(b => {
        if(a + b === 2020) {
            console.log(`The answer is ${a * b}`);
        }
    });
}
