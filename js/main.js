document.addEventListener('DOMContentLoaded', e => {
	var body = document.querySelector('body');
	if (body.classList.contains('home-page')) {
		homePage();
	} else if (body.classList.contains('vision')) {
		visionPage();
	}
});

function homePage() {
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