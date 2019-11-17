document.addEventListener('DOMContentLoaded', e => {
	var body = document.querySelector('body');
	if (body.classList.contains('home-page')) {
		homePage();
	} else if (body.classList.contains('vision')) {
		visionPage();
	}
});

function homePage() {
	console.log('hello, world !');
}

function visionPage() {
	//js for the scroll back up button
	var backUpButton = document.getElementById("backUpBtn");

	function scrollDown() {
		if (window.scrollY > 20) {
			backUpButton.style.display = "block";
		}
		else {
			backUpButton.style.display = "none";
		}
	}

	function goToTop() {
		window.scrollTo({ top: 0 });
	}

	window.onscroll = function () { scrollDown() };
	backUpButton.addEventListener("click", goToTop);
}