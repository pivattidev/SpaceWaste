document.addEventListener('DOMContentLoaded', function() {

  var curiosidades = [
    'Um detrito de 10 cm pode destruir completamente um satélite operacional.',
    'A velocidade média dos detritos é de 28.000 km/h — 8x mais rápido que uma bala.',
    'A ISS realiza manobras de desvio de detritos em média 3 vezes por ano.',
    'Há mais de 100 milhões de fragmentos menores que 1 cm que não podem ser rastreados.',
    'O Kessler Syndrome poderia tornar o acesso ao espaço impossível por séculos.',
    'A maioria dos detritos vem de apenas 5 eventos de fragmentação.',
    'O custo de uma colisão catastrófica pode superar US$ 1 bilhão.',
  ];

  var indiceAtual = Math.floor(Math.random() * curiosidades.length);
  var textoEl = document.getElementById('curiosidade-texto');
  var botaoEl = document.getElementById('btn-proxima');

  function mostrarCuriosidade() {
    textoEl.textContent = curiosidades[indiceAtual];
  }

  botaoEl.addEventListener('click', function() {
    indiceAtual = indiceAtual + 1;

    if (indiceAtual >= curiosidades.length) {
      indiceAtual = 0;
    }

    textoEl.style.opacity = '0';
    setTimeout(function() {
      mostrarCuriosidade();
      textoEl.style.opacity = '1';
    }, 300);
  });

  mostrarCuriosidade();

});