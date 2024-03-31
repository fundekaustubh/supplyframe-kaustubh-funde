(async () => {
	try {
		const cities = await (await fetch("/cities/cities.json")).json();
		const citiesOptions = cities.map(city => {
			const newOption = document.createElement('option');
			newOption.setAttribute('value', `${city.city}, ${city.country}`);
			newOption.setAttribute('textContent', `${city.city}, ${city.country}`);
			// newOption.addEventListener('click', function () {
			// 	console.log('hi');
			// });
			return newOption;
		});
		const citiesList = document.getElementById("cities-list");
		citiesOptions.forEach(cityOption => citiesList.appendChild(cityOption));
		
		document.addEventListener("DOMContentLoaded", (e) => {
			console.log("dom content loaded");
			$('#cities-search').autocomplete();
		}, false);

		const citiesForm = document.getElementById("cities-form");
		// citiesForm.addEventListener("submit", async (e) => {
		// 	e.preventDefault();
		// 	const selectedCity = document.getElementById("selected-city").value;
		// 	const response = await fetch(`/api/weather/${selectedCity}`);
		// });
	}
	catch (err) {
		console.error(err);
	}
})()