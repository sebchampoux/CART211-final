document.addEventListener('DOMContentLoaded', e => {
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

});