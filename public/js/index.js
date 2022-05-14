function ratingStars(starNumber) {
	const starsArray = document.querySelectorAll("div > i");
	starsArray.forEach(star => {
		star.classList.replace("fa", "far");
	});

	for (let i = 0; i < starNumber; i++) {
		starsArray[i].classList.replace("far", "fa");
	}

	const inputs = document.querySelectorAll("input[type='radio'");
	inputs.forEach(input => {
		input.checked = false;
	});

	document.querySelector(`input#s-${starNumber}`).checked = true;
}

function goToRestaurant(restaurantName) {
	
}
