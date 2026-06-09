document.addEventListener('DOMContentLoaded', function() {

  // Geração de estrelas
  generateStars();

  // Animação de fade-in para os cards dos integrantes
  var cards = document.querySelectorAll('.member-card');

  // Inicialmente, os cards estão ocultos e deslocados para baixo
  cards.forEach(function(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(32px)';
  });

  // Aplica a animação com um pequeno delay entre cada card
  setTimeout(function() {
    cards.forEach(function(card, i) {
      card.style.transition = 'opacity 0.5s ease ' + (i * 0.1) + 's, transform 0.5s ease ' + (i * 0.1) + 's';

      setTimeout(function() {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 20);
    });
  }, 100);

  // Animação de anel nos cards dos integrantes
  cards.forEach(function(card) {
    var anel = card.querySelector('.member-foto-anel');
    if (!anel) return; 

    // Pausa a animação do anel inicialmente
    card.addEventListener('mouseenter', function() {
      anel.style.animationPlayState = 'running';
    });
    
    // Retorna o anel para o estado pausado quando o mouse sai do card
    card.addEventListener('mouseleave', function() {
      anel.style.animationPlayState = 'paused';
    });
  });

});