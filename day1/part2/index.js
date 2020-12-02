const input = require('./../part1/input.json');

while(input.length){
    const a = input.pop();
    input.forEach(b => {
        input.forEach(c => {
            if(a + b + c === 2020) {
                console.log(`The answer is ${a * b * c}`);
                return;
            }
        });
    });
}
