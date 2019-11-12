document.addEventListener('DOMContentLoaded', e => {

});

//js for the scroll back up button
var backUpButton = document.getElementsByClassName("backUpBtn");

window.onscroll = function() {scrollDown()};

function scrollDown() {
  if (document.body.scrollToTop > 20 || document.documentElement.scrollToTop > 20) {
    backUpButton.style.display = "block";
  } else {
    backUpButton.style.display = "none";
  }
}

function scrollTop() {
  document.body.scrollToTop = 0; 
  document.documentElement.scrollToTop = 0; 
} 