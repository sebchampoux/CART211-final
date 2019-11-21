document.addEventListener('DOMContentLoaded', e => {

	importPagePortion('main-nav', 'js-nav-placeholder');
	importPagePortion('footer', 'js-footer-placeholder');

	var body = document.querySelector('body');
	if (body.classList.contains('home-page')) {
		homePage();
	} else if (body.classList.contains('vision')) {
		visionPage();
	}

});

/**
 * Parses a string into an HTML element
 * @param {String} text
 * @returns {HTMLElement}
 */
function parseStringToHTML(text) {
	var temp = document.createElement('div');
	temp.innerHTML = text;
	return temp.children[0];
}

/**
 * Loads and appends a page portion
 * 
 * @param {String} filename filename of the page portion (excluding the directory and the extension)
 * @param {String} placeholderClass class of the placeholder HTML element that will be replaced by the inserted element
 * @returns {Promise}
 */
function importPagePortion(filename, placeholderClass) {
	return new Promise((resolve, reject) => {
		var request = new XMLHttpRequest();
		request.addEventListener('load', e => {
			var toReplace = document.querySelector('.' + placeholderClass);
			toReplace.parentNode.insertBefore(parseStringToHTML(request.response), toReplace);
			toReplace.parentNode.removeChild(toReplace);
			resolve();
		});
		request.addEventListener('error', () => reject('Page portion import failed'));
		request.open('GET', 'page-portions/' + filename + '.html');
		request.send();
	});
}

function homePage() {
	homePageAnims();
	homePageNewsletter();
}

function homePageAnims() {
	let heroTl = new TimelineMax({ paused: true });
	var statsTl = new TimelineMax({ paused: true });

	var halfHalftl = new TimelineMax({ delay: 1 });
	var halfHalfBG = document.querySelector('.half-half__content-bg');
	halfHalftl.set(halfHalfBG, { transformOrigin: '0 0' });

	halfHalftl.addLabel('in-bgs');
	halfHalftl.from(halfHalfBG, 0.6, { scaleX: 0 }, 'in-bgs');
	halfHalftl.add(tlAnimatedImage(document.querySelector('.half-half__image')), 'in-bgs+=0.2');

	halfHalftl.staggerFrom('.half-half__title, .half-half__text, .half-half .button', 1, { opacity: 0, ease: Power2.easeInOut }, 0.15);
}

function tlAnimatedImage(animatedImageObject) {
	var inner = animatedImageObject.querySelector('.animated-image__inner');
	var img = animatedImageObject.querySelector('.animated-image__img');
	var duration = 0.8;

	let tl = new TimelineMax();
	tl.addLabel('img-in');
	tl.from(inner, duration, { x: '-100%' }, 'img-in');
	tl.from(img, duration, { x: '100%' }, 'img-in');
	return tl;
}

function homePageNewsletter() {
	function inputIsEmpty(input) {
		return input.value === "" || input.value === null || input.value === undefined;
	}

	var inputs = document.querySelectorAll('.input');
	inputs.forEach(input => {
		input.addEventListener('blur', e => {
			if (inputIsEmpty(input)) {
				input.classList.toggle('input--not-empty', false);
			} else {
				input.classList.toggle('input--not-empty', true);
			}
		});
	});
}

function visionPage() {

	//fade effect
	AOS.init();

	//js for the scroll back up button
	var backUpButton = document.getElementById("backUpBtn");

	window.onscroll = function () { scrollDown() };

	function scrollDown() {
		if (window.scrollY > 20) {
			backUpButton.style.display = "block";
		}
		else {
			backUpButton.style.display = "none";
		}
	}

	backUpButton.addEventListener("click", goToTop);

	function goToTop() {
		window.scrollTo({ top: 0 });
	}

	//map pins

	$('#usa-1').click(function () {
		$(this).toggleClass('usa1-hover');
	});

	$('#usa-2').click(function () {
		$(this).toggleClass('usa2-hover');
	});

	$('#canada-pin').click(function () {
		$(this).toggleClass('canada-pin-hide');
		$('#canada-beaver').toggleClass('canada-beaver-show');
		$('p#map-info').toggleClass('canada-click');
	});

}
