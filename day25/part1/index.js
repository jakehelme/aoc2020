

(function(){
	
	// const cardPubKey = 5764801;
	const cardPubKey = 9093927;
	// const doorPubKey = 17807724;
	const doorPubKey = 11001876;

	const cardLoop = getSecretLoopSize(cardPubKey);
	const doorLoop = getSecretLoopSize(doorPubKey);

	const enc1 = getEncryptionKey(cardPubKey, doorLoop);
	const enc2 = getEncryptionKey(doorPubKey, cardLoop);
	
	console.log(enc1, enc2, enc1 === enc2);

	function getEncryptionKey(subjectNumb, loopSize) {
		let value = 1;
		for(let i = 0; i < loopSize; i++) {
			value = loopOp(value, subjectNumb);
		}
		return value;
	}

	function getSecretLoopSize(pubKey) {
		let value = 1;
		let loopCount = 0;
		while(pubKey !== value) {
			loopCount++;
			value = loopOp(value, 7);
		}
		return loopCount;
	}

	function loopOp(value, subjectNumber) {
		let val = value * subjectNumber;
		val = val % 20201227;
		return val;
	}

})();