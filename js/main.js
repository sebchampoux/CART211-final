document.addEventListener('DOMContentLoaded', e => {
    	
});

//js for the scroll back up button
backUpButton = document.getElementsByClassName("backUp");

window.onscroll = function() {scrollDown()};

function scrollDown() {
  if (document.body.scrollToTop > 20 || document.documentElement.scrollToTop > 20) {
    backUpButton.style.display = "block";
  } else {
    backUpButton.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollToTop = 0; 
  document.documentElement.scrollToTop = 0; 
} 