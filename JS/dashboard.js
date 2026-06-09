document.addEventListener('DOMContentLoaded', function() {

  generateStars();

  var mensagensEl = document.getElementById('chat-mensagens');
  var inputEl     = document.getElementById('chat-input');
  var enviarBtn   = document.getElementById('chat-enviar');
  var chipsEl     = document.getElementById('chat-chips');

  enviarBtn.addEventListener('click', enviarMensagem);

  inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      enviarMensagem();
    }
  });

  chipsEl.querySelectorAll('.dash-chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      inputEl.value = chip.getAttribute('data-msg');
      enviarMensagem();
    });
  });

  function enviarMensagem() {
    var texto = inputEl.value.trim();
    if (!texto) return;

    chipsEl.style.display = 'none';
    adicionarMensagem('user', texto);
    inputEl.value = '';

    setTimeout(function() {
      var resposta = buscarResposta(texto);
      adicionarMensagem('bot', resposta);
    }, 800);
  }

  function buscarResposta(texto) {
    texto = texto.toLowerCase();

    if (texto.includes('kessler')) {
      return 'A Síndrome de Kessler foi proposta em 1978 por Donald Kessler. Se a densidade de detritos ficar alta demais, uma colisão gera fragmentos que causam outras colisões — um efeito cascata que poderia inutilizar órbitas por séculos. 💥';
    }

    if (texto.includes('velocidade')) {
      return 'Os detritos orbitam a 28.000 km/h — 8 vezes mais rápido que uma bala. Nessa velocidade, um fragmento de 1cm tem energia suficiente para destruir um satélite inteiro. ⚡';
    }

    if (texto.includes('missao') || texto.includes('missão') || texto.includes('limpeza')) {
      return 'As principais missões de limpeza são: ClearSpace-1 (ESA), RemoveDEBRIS (Surrey), ELSA-d (Astroscale) e ADRAS-J (JAXA). Cada uma usa uma tecnologia diferente — braço robótico, rede, arpão ou acoplamento magnético. 🧲';
    }

    if (texto.includes('orbita') || texto.includes('órbita') || texto.includes('leo') || texto.includes('geo')) {
      return 'Os detritos se distribuem em três órbitas: LEO (160–2.000 km) com 68% dos detritos, MEO (2.000–35.786 km) com 12%, e GEO (~35.786 km) com 20%. A LEO é a mais congestionada e perigosa. 🌍';
    }

    if (texto.includes('quantos') || texto.includes('quantidade') || texto.includes('numero') || texto.includes('número')) {
      return 'Existem mais de 27.000 detritos rastreados, 500.000 fragmentos maiores que 1cm e mais de 100 milhões menores que 1cm — esses últimos impossíveis de rastrear. 📊';
    }

    if (texto.includes('pais') || texto.includes('país') || texto.includes('russia') || texto.includes('china') || texto.includes('ranking')) {
      return 'O ranking de detritos é: 🥇 Rússia com 7.785 objetos, 🥈 EUA com 6.145 e 🥉 China com 4.923. A China gerou mais de 3.000 detritos em 2007 ao destruir seu próprio satélite num teste de míssil.';
    }

    if (texto.includes('ods') || texto.includes('sustentabilidade') || texto.includes('clima')) {
      return 'O SpaceWaste é alinhado ao ODS 13 da ONU — Ação Climática. Satélites de monitoramento climático dependem de órbitas seguras. Proteger o espaço é essencial para combater as mudanças climáticas. 🌱';
    }

    if (texto.includes('iss') || texto.includes('estação') || texto.includes('estacao')) {
      return 'A ISS orbita a 400 km de altitude e realiza manobras de desvio de detritos em média 3 vezes por ano. Os astronautas vivem constantemente sob risco de colisão. 🚀';
    }

    if (texto.includes('lixo') || texto.includes('detrito') || texto.includes('o que é')) {
      return 'Lixo espacial são objetos artificiais em órbita sem utilidade — satélites inativos, estágios de foguete e fragmentos de colisões. Hoje são mais de 27.000 detritos rastreados pela NASA. 🛸';
    }

    if (texto.includes('obrigado') || texto.includes('obrigada') || texto.includes('valeu')) {
      return 'Disponha! Se tiver mais dúvidas sobre lixo espacial é só perguntar. 🛰';
    }

    if (texto.includes('oi') || texto.includes('olá') || texto.includes('ola') || texto.includes('bom dia') || texto.includes('boa tarde')) {
      return 'Olá! Sou o SpaceBot 🛰 Pergunte sobre lixo espacial, órbitas, missões de limpeza ou a Síndrome de Kessler!';
    }

    return 'Não entendi muito bem. Tente perguntar sobre: lixo espacial, Síndrome de Kessler, velocidade dos detritos, missões de limpeza ou o ranking de países. 🤔';
  }

  function adicionarMensagem(tipo, texto) {
    var div = document.createElement('div');
    div.className = 'dash-chat-msg ' + tipo;

    if (tipo === 'bot') {
      div.innerHTML =
        '<div class="dash-chat-avatar">🤖</div>' +
        '<div class="dash-chat-balao">' + texto + '</div>';
    } else {
      div.innerHTML =
        '<div class="dash-chat-balao">' + texto + '</div>' +
        '<div class="dash-chat-avatar">👤</div>';
    }

    mensagensEl.appendChild(div);
    mensagensEl.scrollTop = mensagensEl.scrollHeight;
  }

});