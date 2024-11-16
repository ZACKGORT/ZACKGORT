$(document).ready(function () {

  // Track the position of .big-reason
  var reasonElement = $('.big-reason')[0];
  setInterval(function () {
    var reasonPosition = reasonElement.getBoundingClientRect();
    var clw = (window.innerWidth || document.documentElement.clientWidth);
    var clh = (window.innerHeight || document.documentElement.clientHeight);

    // Add or remove the 'scared' class based on its position
    if ((reasonPosition.top >= 10 && reasonPosition.bottom <= clh) && (reasonPosition.left >= 10 && reasonPosition.right <= clw)) {
      $('.big-reason').removeClass('scared');
    } else {
      $('.big-reason').addClass('scared');
    }
  }, 100);

  // Initialize the 'throwable' functionality
  $('.big-reason').addClass('throwable');
  $('body').fadeIn();

  $(".throwable").throwable({
    gravity: { x: 0, y: 0.2 },
    autostart: true,
    shape: "circle",  // Set the shape as a circle
    bounce: 0.5,
    damping: 0.3,
    collisionDetection: true
  });

});