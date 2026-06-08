function generateStars() {

  var canvas = document.createElement('canvas');
  canvas.id = 'stars-canvas';
  document.body.prepend(canvas);

  var ctx = canvas.getContext('2d');
  var estrelas = [];
  var largura, altura;

  var camadas = [
    { quantidade: 180, tamanhoMin: 0.2, tamanhoMax: 0.5, opacidadeMin: 0.1, opacidadeMax: 0.3 },
    { quantidade: 70,  tamanhoMin: 0.5, tamanhoMax: 0.9, opacidadeMin: 0.2, opacidadeMax: 0.5 },
    { quantidade: 20,  tamanhoMin: 0.9, tamanhoMax: 1.2, opacidadeMin: 0.3, opacidadeMax: 0.6 },
  ];

  var cores = [
    'rgba(255, 255, 255,',
    'rgba(255, 255, 255,',
    'rgba(255, 255, 255,',
    'rgba(255, 220, 240,',
    'rgba(200, 240, 255,',
  ];

  function aleatorio(min, max) {
    return Math.random() * (max - min) + min;
  }

  function criarEstrela(camada) {
    return {
      x:                Math.random() * largura,
      y:                Math.random() * altura,
      tamanho:          aleatorio(camada.tamanhoMin, camada.tamanhoMax),
      opacidade:        aleatorio(camada.opacidadeMin, camada.opacidadeMax),
      opacidadeAlvo:    aleatorio(camada.opacidadeMin, camada.opacidadeMax),
      velocidadePiscar: aleatorio(0.005, 0.1),
      cor:              cores[Math.floor(Math.random() * cores.length)],
    };
  }

  function iniciarEstrelas() {
    estrelas = [];
    camadas.forEach(function(camada) {
      for (var i = 0; i < camada.quantidade; i++) {
        estrelas.push(criarEstrela(camada));
      }
    });
  }

  function redimensionar() {
    largura = canvas.width  = window.innerWidth;
    altura  = canvas.height = window.innerHeight;
    iniciarEstrelas();
  }

  function desenhar() {
    ctx.clearRect(0, 0, largura, altura);

    estrelas.forEach(function(estrela) {

      if (estrela.opacidade < estrela.opacidadeAlvo) {
        estrela.opacidade += estrela.velocidadePiscar;
      } else {
        estrela.opacidade -= estrela.velocidadePiscar;
        if (estrela.opacidade <= 0.05) {
          estrela.opacidadeAlvo = aleatorio(0.2, 1.0);
        }
      }

      if (estrela.opacidade < 0.05) estrela.opacidade = 0.05;
      if (estrela.opacidade > 1)    estrela.opacidade = 1;

      ctx.beginPath();
      ctx.arc(estrela.x, estrela.y, estrela.tamanho, 0, Math.PI * 2);
      ctx.fillStyle = estrela.cor + estrela.opacidade + ')';
      ctx.fill();

      if (estrela.tamanho > 1.5) {
        ctx.beginPath();
        ctx.arc(estrela.x, estrela.y, estrela.tamanho * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = estrela.cor + (estrela.opacidade * 0.15) + ')';
        ctx.fill();
      }

    });

    requestAnimationFrame(desenhar);
  }

  window.addEventListener('resize', redimensionar);

  redimensionar();
  desenhar();
}