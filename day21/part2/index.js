// import input from '../example.js';
import input from '../input.js';

(function () {
	const rows = input.split('\n');
	const foods = [];
	const allAllergens = new Set();
	const allIngredients = new Set();
	const allergensPotentialIngredients = new Map();

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
		allergensPotentialIngredients.set(allergen, []);
		let firstRun = true;
		for (let food of foodsWithAllergen) {
			if (firstRun) {
				food.ingredients.forEach(x => allergensPotentialIngredients.get(allergen).push(x));
				firstRun = false;
			} else {
				const updatedPotentialIngredients = [];
				for (let ing of food.ingredients) {
					const idx = allergensPotentialIngredients.get(allergen).indexOf(ing);
					if (idx > -1) {
						updatedPotentialIngredients.push(ing);
					}
				}
				allergensPotentialIngredients.set(allergen, updatedPotentialIngredients);
			}
		}
	}

	const dontContainAllergens = [];

	for (let food of foods) {
		for (let ingredient of food.ingredients) {
			let appears = false;
			for (let allergenKV of allergensPotentialIngredients) {
				for (let compIng of allergenKV[1]) {
					if (ingredient === compIng) appears = true;
				}
			}
			if (!appears) dontContainAllergens.push(ingredient);
		}
	}

	{
		const identified = [];
		for (let allergenKV of allergensPotentialIngredients) {
			if (allergenKV[1].length === 1) identified.push(allergenKV[1][0]);
		}


		for (let ingredient of identified) {
			for (let allergenKV of allergensPotentialIngredients) {
				if (allergenKV[1].length !== 1) {
					for (let compIng of allergenKV[1]) {
						if (ingredient === compIng) {
							allergensPotentialIngredients.set(allergenKV[0], allergenKV[1].filter(x => x !== compIng));
							if (allergensPotentialIngredients.get(allergenKV[0]).length === 1) {
								identified.push(allergensPotentialIngredients.get(allergenKV[0])[0]);
							}
						}
					}
				}
			}
		}
	}

	const identifiedAllergens = [];
	for(let allergen of allergensPotentialIngredients.keys()) {
		identifiedAllergens.push(allergen);
	}
	identifiedAllergens.sort();
	let cdil = '';
	for(let all of identifiedAllergens) {
		const ing = allergensPotentialIngredients.get(all)[0];
		cdil += `${ing},`;
	}
	cdil = cdil.substr(0, cdil.length - 1);

	console.log(cdil);
})();