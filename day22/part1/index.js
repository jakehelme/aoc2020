// import input from '../example.js';
import input from '../input.js';

(function(){
	const decks = input.split('\n\n');
	const p1Deck = decks[0].match(/\n(\d+)/g).map(x => parseInt(x.replace('\n','')));
	const p2Deck = decks[1].match(/\n(\d+)/g).map(x => parseInt(x.replace('\n','')));
	
	while(p1Deck.length && p2Deck.length) {
		const p1Card = p1Deck.shift();
		const p2Card = p2Deck.shift();

		if(p1Card > p2Card) {
			p1Deck.push(p1Card, p2Card);
		} else {
			p2Deck.push(p2Card, p1Card);
		}
	}

	const winningDeck = p1Deck.length ? p1Deck : p2Deck;
	const answer = winningDeck.reduce((acc, x, i) => acc + x * (winningDeck.length - i), 0);
	console.log(answer);
})();