const handleButtonClick = (e, type) => {
	if (type === 'previous') {
		
	}
}

const previousButton = document.getElementById("previous-hour");
const nextButton = document.getElementById("next-hour");
previousButton.addEventListener("click", (e) => { e.preventDefault(); handleButtonClick(e, 'previous') });
nextButton.addEventListener("click", (e) => { e.preventDefault(); handleButtonClick(e, 'next'); });