function generateStars() {

  // Criação do canvas para as estrelas
  var canvas = document.createElement('canvas');
  canvas.id = 'stars-canvas';
  document.body.prepend(canvas);

  // Configurações iniciais
  var ctx = canvas.getContext('2d');
  var estrelas = [];
  var largura, altura;

  // Configurações das camadas de estrelas para criar profundidade
  var camadas = [
    { quantidade: 180, tamanhoMin: 0.2, tamanhoMax: 0.5, opacidadeMin: 0.1, opacidadeMax: 0.3 },
    { quantidade: 70,  tamanhoMin: 0.5, tamanhoMax: 0.9, opacidadeMin: 0.2, opacidadeMax: 0.5 },
    { quantidade: 20,  tamanhoMin: 0.9, tamanhoMax: 1.2, opacidadeMin: 0.3, opacidadeMax: 0.6 },
  ];

  // Cores variadas para as estrelas, incluindo tons de branco, azul e rosa
  var cores = [
    'rgba(255, 255, 255,',
    'rgba(255, 255, 255,',
    'rgba(255, 255, 255,',
    'rgba(255, 220, 240,',
    'rgba(200, 240, 255,',
  ];

  // Função para gerar um número aleatório entre min e max
  function aleatorio(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Função para criar uma estrela com propriedades aleatórias dentro dos limites da camada
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

  // Função para iniciar as estrelas criando o número definido em cada camada
  function iniciarEstrelas() {
    estrelas = [];
    camadas.forEach(function(camada) {
      for (var i = 0; i < camada.quantidade; i++) {
        estrelas.push(criarEstrela(camada));
      }
    });
  }

  // Função para redimensionar o canvas e reiniciar as estrelas quando a janela for redimensionada
  function redimensionar() {
    largura = canvas.width  = window.innerWidth;
    altura  = canvas.height = window.innerHeight;
    iniciarEstrelas();
  }

  // Função para desenhar as estrelas no canvas, atualizando suas opacidades para criar o efeito de piscar
  function desenhar() {
    ctx.clearRect(0, 0, largura, altura);

    // Atualiza a opacidade de cada estrela para criar o efeito de piscar
    estrelas.forEach(function(estrela) {

      // Aumenta ou diminui a opacidade da estrela em direção ao seu alvo
      if (estrela.opacidade < estrela.opacidadeAlvo) {
        estrela.opacidade += estrela.velocidadePiscar;
      } else {
        estrela.opacidade -= estrela.velocidadePiscar;
        if (estrela.opacidade <= 0.05) {
          estrela.opacidadeAlvo = aleatorio(0.2, 1.0);
        }
      }

      // Limita a opacidade para evitar que as estrelas desapareçam completamente ou fiquem muito brilhantes
      if (estrela.opacidade < 0.05) estrela.opacidade = 0.05;
      if (estrela.opacidade > 1)    estrela.opacidade = 1;

      // Desenha a estrela como um círculo preenchido, com um brilho suave para as estrelas maiores
      ctx.beginPath();
      ctx.arc(estrela.x, estrela.y, estrela.tamanho, 0, Math.PI * 2);
      ctx.fillStyle = estrela.cor + estrela.opacidade + ')';
      ctx.fill();

      // Adiciona um brilho suave para as estrelas maiores, criando um efeito de halo
      if (estrela.tamanho > 1.5) {
        ctx.beginPath();
        ctx.arc(estrela.x, estrela.y, estrela.tamanho * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = estrela.cor + (estrela.opacidade * 0.15) + ')';
        ctx.fill();
      }

    });

    // Solicita a próxima animação para criar um loop contínuo de desenho
    requestAnimationFrame(desenhar);
  }

  // Inicia o processo de redimensionamento e desenho, e adiciona um listener para redimensionar o canvas quando a janela for redimensionada
  window.addEventListener('resize', redimensionar);

  // Chama as funções para configurar o canvas e iniciar a animação
  redimensionar();
  desenhar();
}