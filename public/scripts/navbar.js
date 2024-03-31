(async () => {
	try {
		const cities = await (await fetch("/cities/cities.json")).json();
		const citiesOptions = cities.map(city => {
			const newOption = document.createElement('option');
			newOption.setAttribute('value', `${city.city}, ${city.country}`);
			newOption.setAttribute('textContent', `${city.city}, ${city.country}`);
			return newOption;
		});
		const citiesList = document.getElementById("cities-list");
		citiesOptions.forEach(cityOption => citiesList.appendChild(cityOption));
		
		document.addEventListener("DOMContentLoaded", (e) => {
			$('#cities-search').autocomplete();
		}, false);
	}
	catch (err) {
		console.error(err);
	}
})();