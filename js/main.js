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
	// Create the in timelines
	var hero = document.querySelector('.hero-area');
	hero.inTimeline = heroTl(hero);
	var stats = document.querySelector('.stats');
	stats.inTimeline = statsTl(stats);
	var halfHalfs = document.querySelectorAll('.half-half');
	halfHalfs.forEach(h => h.inTimeline = halfHalfTl(h));
	var newsletter = document.querySelector('.newsletter');
	newsletter.inTimeline = newsletterTl(newsletter);

	var sectionsWithInAnim = [
		hero,
		stats
	].concat(Array.from(halfHalfs)).concat([
		newsletter
	]);

	// Make sections appear on scroll
	var controller = new ScrollMagic.Controller();
	sectionsWithInAnim.forEach(section => {
		new ScrollMagic.Scene({
			triggerElement: section,
			triggerHook: 'onEnter',
			duration: 0,
			offset: 350,
			reverse: false
		}).on('enter', e => section.inTimeline.delay(0.15).play())
			.addTo(controller);
	});
}

function heroTl(heroRoot) {
	var textBox = heroRoot.querySelector('.text-box');

	let tl = new TimelineMax({ paused: true });
	tl.set(textBox, { transformOrigin: '100% 0' });

	tl.addLabel('in-video');
	tl.from(heroRoot.querySelector('.hero-area__video-mask'), 0.8, { x: '100%' }, 'in-video');
	tl.from(heroRoot.querySelector('.featured-video'), 0.8, { x: '-100%' }, 'in-video');
	tl.from(textBox, 0.6, { scaleX: 0 }, '-=0.3');
	tl.staggerFrom(heroRoot.querySelectorAll('.text-box__title, .text-box__text, .text-box__btn-wrapper'), 1, { opacity: 0, x: '20%' }, 0.15);
	tl.from(heroRoot.querySelector('.hero-area__trees-overlay'), 0.6, { opacity: 0 }, '-=0.5');
	return tl;
}

function statsTl(statsRoot) {
	var statsBg = statsRoot.querySelector('.stats__bg');

	let tl = new TimelineMax({ paused: true });
	tl.set(statsBg, { transformOrigin: '0 0' });
	tl.from(statsBg, 0.7, { scaleY: 0 });
	tl.addLabel('in-content', '-=0.2');
	tl.from(statsRoot.querySelector('.stats__title'), 1, { y: '-50%', opacity: 0 }, 'in-content');
	tl.staggerFrom(statsRoot.querySelectorAll('.stat'), 1, { opacity: 0, y: '-25%' }, 0.2, 'in-content+=0.2');
	return tl;
}

function halfHalfTl(halfHalfRoot) {
	let tl = new TimelineMax({ paused: true });
	var halfHalfBG = halfHalfRoot.querySelector('.half-half__content-bg');
	tl.set(halfHalfBG, { transformOrigin: '0 0' });

	tl.addLabel('in-bgs');
	tl.from(halfHalfBG, 0.6, { scaleX: 0 }, 'in-bgs');
	tl.add(tlAnimatedImage(halfHalfRoot.querySelector('.half-half__image')), 'in-bgs');
	tl.staggerFrom(halfHalfRoot.querySelectorAll('.half-half__title, .half-half__text, .half-half__btn-wrapper'), 1, { opacity: 0, ease: Power2.easeInOut }, 0.15);
	return tl;
}

function newsletterTl(newsletterRoot) {
	var textBox = newsletterRoot.querySelector('.text-box');
	var image = newsletterRoot.querySelector('.newsletter__image');

	let tl = new TimelineMax({ paused: true });
	tl.set(textBox, { transformOrigin: '0 0' });
	tl.set(image, { y: '-50%' });
	tl.from(textBox, 0.8, { scaleX: 0 });
	tl.from(image, 0.8, { x: '20%', opacity: 0 });
	tl.staggerFrom(newsletterRoot.querySelectorAll('.text-box__title, .text-box__text, .input-wrapper, .text-box__btn-wrapper'), 0.6, { x: '-10%', opacity: 0 }, 0.2, '-=0.5');
	return tl;
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

	function validateInput(input) {
		if (inputIsEmpty(input)) {
			input.classList.toggle('input--not-empty', false);
		} else {
			input.classList.toggle('input--not-empty', true);
		}
	}

	var inputs = document.querySelectorAll('.input');
	inputs.forEach(input => {
		validateInput(input);
		input.addEventListener('blur', e => validateInput(input));
	});
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

	//fade effect
	AOS.init();

	//block switch

	$('#iron-section').click(function () {
		$('#iron-id').css("opacity", "0" );
		$('#iron-section').toggleClass('iron-background');
	});

	$('#gold-section').click(function () {
		$('#gold-id').css("opacity", "0" );
		$('#gold-section').toggleClass('gold-background');
	});

	$('#diorite-section').click(function () {
		$('#diorite-id').css("opacity", "0" );
		$('#diorite-section').toggleClass('diorite-background');
	});

	$('#diamond-section').click(function () {
		$('#diamond-id').css("opacity", "0" );
		$('#diamond-section').toggleClass('diamond-background');
	});

	$('#granite-section').click(function () {
		$('#granite-id').css("opacity", "0" );
		$('#granite-section').toggleClass('granite-background');
	});

	$('#emerald-section').click(function () {
		$('#emerald-id').css("opacity", "0" );
		$('#emerald-section').toggleClass('emerald-background');
	});

	$('#coal-section').click(function () {
		$('#coal-id').css("opacity", "0" );
		$('#coal-section').toggleClass('coal-background');
	});





	
	//js for error button
	var errorButton = document.getElementById("animationButton");
	errorButton.addEventListener("click", errorFunction);

	function errorFunction() {
		$("#sustainability").css( "opacity", "0" );
		$(".error400").css( "opacity", "1" );
	}

	//swap light switch on click

	var lightswitchvar = document.getElementById("lightswitchid");
	lightswitchvar.addEventListener("click", lightFunction);

	function lightFunction() {
		$(".lightswitch").css( "z-index", "6" );
		$(".closedlight").css( "z-index", "7" );
		$("#beemovie-id").css( "opacity", "1" );
		$("#sustainability").css( "background-color", "#181818" );
		$("#animationButton").css( "opacity", "0" );

	}


	var closedlightvar = document.getElementById("closedlightid");
	closedlightvar.addEventListener("click", lightFunctionclosed);

	function lightFunctionclosed() {
		$(".lightswitch").css( "z-index", "7" );
		$(".closedlight").css( "z-index", "6" );
		$("#beemovie-id").css( "opacity", "0" );	
		$("#sustainability").css( "background-color", "#f9f9f9" );
		$("#animationButton").css( "opacity", "1" );	
	}

	//js for the scroll back up button
	var backUpButton = document.getElementById("backUpBtn");



	window.onscroll = function () { scrollDown() };

	function scrollDown() {
		if (window.scrollY > 20) {
			backUpButton.style.display = "block";
			$( ".main-nav" ).css( "position", "absolute" );
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
		$(this).toggleClass('canada-pin-change');
		$('#canada-beaver').toggleClass('canada-beaver-change');
	});

	/*random location pin*/

	var africa = document.getElementById("africa1");
	africa.addEventListener("click", randomPosition);


	function randomPosition() {
		var posx = (Math.random() * 100) + 1;
		var posy = (Math.random() * 100) + 1;
		africa.style.top = posy + '%';
		africa.style.left = posx + '%';
	}

	$('#australia1').click(function () {
		$(this).toggleClass('australia-fun');
	});
}