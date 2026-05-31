document.addEventListener('DOMContentLoaded', function() {

  var cards = document.querySelectorAll('.member-card');

  cards.forEach(function(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(32px)';
  });

  setTimeout(function() {
    cards.forEach(function(card, i) {
      card.style.transition = 'opacity 0.5s ease ' + (i * 0.1) + 's, transform 0.5s ease ' + (i * 0.1) + 's';

      setTimeout(function() {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 20);
    });
  }, 100);

  cards.forEach(function(card) {
    var anel = card.querySelector('.member-foto-anel');
    if (!anel) return; 

    card.addEventListener('mouseenter', function() {
      anel.style.animationPlayState = 'running';
    });

    card.addEventListener('mouseleave', function() {
      anel.style.animationPlayState = 'paused';
    });
  });

});