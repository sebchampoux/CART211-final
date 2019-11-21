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

//map pins

$('#usa-1').click(function() {
  $(this).toggleClass('usa1-hover');
});

$('#usa-2').click(function() {
  $(this).toggleClass('usa2-hover');
});

$('#canada-pin').click(function() {
  $(this).toggleClass('canada-pin-hide');
  $('#canada-beaver').toggleClass('canada-beaver-show');
  $('p#map-info').toggleClass('canada-click');
});



});

