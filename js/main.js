document.addEventListener('DOMContentLoaded', e => {

//fade effect
AOS.init();

//js for the scroll back up button
var backUpButton = document.getElementById("backUpBtn");

window.onscroll = function() {scrollDown()};

function scrollDown() {
  if (window.scrollY > 20 ) {
    backUpButton.style.display = "block";
  } 
  else {
    backUpButton.style.display = "none";
  }
}

backUpButton.addEventListener("click",goToTop);

function goToTop() {
  window.scrollTo({top:0}); 
}



})
