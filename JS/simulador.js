document.addEventListener('DOMContentLoaded', function() {

  // Geração de estrelas
  generateStars();

  // Lógica do simulador de órbita
  var form       = document.getElementById('sim-form');
  var resultado  = document.getElementById('sim-resultado');
  var vazio      = document.getElementById('sim-vazio');
  var btnResetar = document.getElementById('btn-resetar');

  // Evento de submit do formulário
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validação de cada campo do formulário
    var nomeValido     = validarCampo('nome');
    var altitudeValida = validarCampo('altitude');
    var massaValida    = validarCampo('massa');
    var tipoValido     = validarCampo('tipo');

    // Se algum campo for inválido, não prossegue com os cálculos
    if (!nomeValido || !altitudeValida || !massaValida || !tipoValido) {
      return;
    }

    // Coleta dos valores do formulário
    var nome     = document.getElementById('nome').value.trim();
    var altitude = parseFloat(document.getElementById('altitude').value);
    var massa    = parseFloat(document.getElementById('massa').value);
    var tipo     = document.getElementById('tipo').value;

    var velocidade = calcularVelocidade(altitude);
    var periodo    = calcularPeriodo(altitude);
    var reentrada  = calcularReentrada(altitude);
    var risco      = calcularRisco(altitude);

    // Exibe os resultados no card
    mostrarResultado(nome, tipo, velocidade, periodo, reentrada, risco);
  });

  // Evento do botão "Resetar"
  btnResetar.addEventListener('click', function() {
    resultado.classList.remove('visivel');
    vazio.style.display = 'flex';
    form.reset();

    // Remove classes de inválido e mensagens de erro
    var grupos = form.querySelectorAll('.campo-grupo');
    grupos.forEach(function(grupo) {
      grupo.classList.remove('invalido');
    });

    // Limpa mensagens de erro
    var erros = form.querySelectorAll('.campo-erro');
    erros.forEach(function(erro) {
      erro.textContent = '';
    });
  });
 
  var RAIO_TERRA = 6371;

  // Funções de cálculo
  function calcularVelocidade(altitude) {
    var raioOrbita = RAIO_TERRA + altitude;
    var velocidadeKms = 7.9 * Math.sqrt(RAIO_TERRA / raioOrbita);
    var velocidadeKmh = velocidadeKms * 3600;
    return Math.round(velocidadeKmh).toLocaleString('pt-BR') + ' km/h';
  }

  function calcularPeriodo(altitude) {
    var raioOrbita = RAIO_TERRA + altitude;
    var periodoSeg = 2 * Math.PI * Math.sqrt(Math.pow(raioOrbita, 3) / 398600);
    var periodoMin = periodoSeg / 60;

    if (periodoMin < 60) {
      return Math.round(periodoMin) + ' min por órbita';
    } else {
      var horas = Math.floor(periodoMin / 60);
      var min   = Math.round(periodoMin % 60);
      return horas + 'h ' + min + 'min por órbita';
    }
  }

  function calcularReentrada(altitude) {
    if (altitude < 300) {
      return 'Menos de 1 ano';
    } else if (altitude < 400) {
      return '1 a 5 anos';
    } else if (altitude < 500) {
      return '5 a 25 anos';
    } else if (altitude < 600) {
      return '25 a 100 anos';
    } else if (altitude < 800) {
      return '100 a 500 anos';
    } else {
      return 'Mais de 500 anos';
    }
  }

  function calcularRisco(altitude) {
    if (altitude >= 400 && altitude <= 600) {
      return {
        nivel: 'ALTO',
        cor: '#ff4444',
        desc: 'Zona crítica — mesma faixa da ISS e grandes constelações de satélites. Alta probabilidade de colisão.'
      };
    } else if (altitude < 400) {
      return {
        nivel: 'MÉDIO',
        cor: '#f0c040',
        desc: 'Órbita baixa — reentrada relativamente rápida, mas ainda representa risco para missões tripuladas.'
      };
    } else {
      return {
        nivel: 'MUITO ALTO',
        cor: '#ff6b35',
        desc: 'Órbita alta — o objeto permanecerá em órbita por séculos, acumulando risco de colisões futuras.'
      };
    }
  }

  // Função para exibir os resultados no card
  function mostrarResultado(nome, tipo, velocidade, periodo, reentrada, risco) {
    var tiposNomes = {
      satelite: '🛰️ Satélite',
      detrito:  '💥 Detrito espacial',
      foguete:  '🚀 Estágio de foguete',
      cubesat:  '📦 CubeSat'
    };

    // Preenche os campos do resultado com os valores calculados
    document.getElementById('res-nome').textContent      = nome;
    document.getElementById('res-tipo').textContent      = tiposNomes[tipo];
    document.getElementById('res-velocidade').textContent = velocidade;
    document.getElementById('res-periodo').textContent    = periodo;
    document.getElementById('res-reentrada').textContent  = reentrada;

    // Exibe o nível de risco com cor e descrição
    var riscoValor = document.getElementById('res-risco');
    var riscoDesc  = document.getElementById('res-risco-desc');
    riscoValor.textContent  = risco.nivel;
    riscoValor.style.color  = risco.cor;
    riscoDesc.textContent   = risco.desc;

    // Exibe o card de resultado e oculta a mensagem de vazio
    vazio.style.display = 'none';
    resultado.classList.add('visivel');
  }

  // Função para validar campos do formulário
  function validarCampo(id) {
    var campo  = document.getElementById(id);
    var erro   = document.getElementById('erro-' + id);
    var grupo  = document.getElementById('campo-' + id);
    var valor  = campo.value.trim();
    var mensagem = '';

    // Validações específicas para cada campo
    if (id === 'nome') {
      if (valor === '') {
        mensagem = 'Dê um nome ao objeto.';
      } else if (valor.length < 2) {
        mensagem = 'Nome muito curto.';
      }
    }

    if (id === 'altitude') {
      var alt = parseFloat(valor);
      if (valor === '') {
        mensagem = 'Informe a altitude.';
      } else if (isNaN(alt) || alt < 160 || alt > 36000) {
        mensagem = 'Altitude deve ser entre 160 e 36.000 km.';
      }
    }

    if (id === 'massa') {
      var mas = parseFloat(valor);
      if (valor === '') {
        mensagem = 'Informe a massa.';
      } else if (isNaN(mas) || mas < 1) {
        mensagem = 'Massa mínima é 1 kg.';
      }
    }

    if (id === 'tipo') {
      if (valor === '') {
        mensagem = 'Selecione o tipo do objeto.';
      }
    }

    // Exibe mensagem de erro ou marca o campo como válido
    if (mensagem !== '') {
      if (erro)  erro.textContent = mensagem;
      if (grupo) grupo.classList.add('invalido');
      return false;
    } else {
      if (erro)  erro.textContent = '';
      if (grupo) grupo.classList.remove('invalido');
      return true;
    }
  }

});