// import input from '../example.js';
import input from '../input.js';

(function () {
	const decks = input.split('\n\n');
	const p1Deck = decks[0].match(/\n(\d+)/g).map(x => parseInt(x.replace('\n', '')));
	const p2Deck = decks[1].match(/\n(\d+)/g).map(x => parseInt(x.replace('\n', '')));

	const result = playGame([...p1Deck], [...p2Deck], true);

	function playGame(d1, d2, isRoot) {
		const history = [`p1${d1.join('')}p2${d2.join('')}`];
		while (d1.length && d2.length) {
			const p1Card = d1.shift();
			const p2Card = d2.shift();

			if (p1Card <= d1.length && p2Card <= d2.length) {
				const winner = playGame(d1.slice(0, p1Card), d2.slice(0, p2Card), false);
				if (winner === 'd1') {
					d1.push(p1Card, p2Card);
				} else {
					d2.push(p2Card, p1Card);
				}
			} else {
				if (p1Card > p2Card) {
					d1.push(p1Card, p2Card);
				} else {
					d2.push(p2Card, p1Card);
				}
			}

			const snap = `p1${d1.join('')}p2${d2.join('')}`;
			if (history.indexOf(snap) > -1) {
				return 'd1';
			}
			history.push(snap);
		}

		const winningDeck = d1.length ? 'd1' : 'd2';
		if (isRoot) {
			return d1.length ? [...d1] : [...d2];
		} else {
			return winningDeck;
		}
	}

	console.log(result.reduce((acc, x, i) => acc + x * (result.length - i), 0));
})();