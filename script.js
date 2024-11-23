$(document).ready(function () {
  // Track the position of .big-reason
  var reasonElement = $('.big-reason')[0];
  var collidableElements = $('.collidable'); // All collidable elements

  setInterval(function () {
    var reasonPosition = reasonElement.getBoundingClientRect();
    var clw = (window.innerWidth || document.documentElement.clientWidth);
    var clh = (window.innerHeight || document.documentElement.clientHeight);

    // Add or remove the 'scared' class based on its position
    if ((reasonPosition.top >= 10 && reasonPosition.bottom <= clh) && 
        (reasonPosition.left >= 10 && reasonPosition.right <= clw)) {
      $('.big-reason').removeClass('scared');
    } else {
      $('.big-reason').addClass('scared');
    }
  }, 100);

  // Initialize the 'throwable' functionality
  $('.big-reason').addClass('throwable');
  $('body').fadeIn();

  $(".throwable").throwable({
    gravity: { x: 0, y: 0.6 },
    autostart: true,
    shape: "circle",
    bounce: 0.5,
    damping: 0.3,
    collisionDetection: true,
    drag: true, // Enable dragging functionality
    onCollide: function () {
      // Custom collision handler logic
    }
  });

  // Collision detection for collidable elements
  setInterval(function () {
    var throwableRect = reasonElement.getBoundingClientRect();

    collidableElements.each(function () {
      var collidableRect = this.getBoundingClientRect();

      if (
        throwableRect.left < collidableRect.right &&
        throwableRect.right > collidableRect.left &&
        throwableRect.top < collidableRect.bottom &&
        throwableRect.bottom > collidableRect.top
      ) {
        $(this).addClass('collision'); // Highlight on collision
      } else {
        $(this).removeClass('collision'); // Remove highlight
      }
    });
  }, 50); // Check collisions frequently
});