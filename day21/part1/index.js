// import input from '../example.js';
import input from '../input.js';

(function () {
	const rows = input.split('\n');
	const foods = [];
	const allAllergens = new Set();
	const allIngredients = new Set();
	const potentialIngredients = new Map();

	for (let row of rows) {
		const ingredients = row.replace(/\s\(.+$/, '').split(' ');
		const allergens = row.match(/\(contains\s(.+)\)/)[1].split(', ');
		allergens.forEach(x => allAllergens.add(x));
		ingredients.forEach(x => allIngredients.add(x));
		const food = { ingredients, allergens };
		foods.push(food);
	}

	for (let allergen of allAllergens) {
		const foodsWithAllergen = foods.filter(x => x.allergens.indexOf(allergen) > -1);
		potentialIngredients.set(allergen, []);
		let firstRun = true;
		for (let food of foodsWithAllergen) {
			if (firstRun) {
				food.ingredients.forEach(x => potentialIngredients.get(allergen).push(x));
				firstRun = false;
			} else {
				const updatedPotentialIngredients = [];
				for (let ing of food.ingredients) {
					const idx = potentialIngredients.get(allergen).indexOf(ing);
					if (idx > -1) {
						updatedPotentialIngredients.push(ing);
					}
				}
				potentialIngredients.set(allergen, updatedPotentialIngredients);
			}
		}
	}

	const dontContainAllergens = [];

	for (let food of foods) {
		for (let ingredient of food.ingredients) {
			let appears = false;
			for (let allergen of potentialIngredients) {
				for (let compIng of allergen[1]) {
					if (ingredient === compIng) appears = true;
				}
			}
			if (!appears) dontContainAllergens.push(ingredient);
		}
	}

	console.log(dontContainAllergens.length);
})();