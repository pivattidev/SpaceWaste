document.addEventListener('DOMContentLoaded', function() {

  // Geração de estrelas
  generateStars();

  // Validação e envio do formulário de contato
  var form           = document.getElementById('contato-form');
  var formContainer  = document.getElementById('form-container');
  var formSucesso    = document.getElementById('form-sucesso');
  var btnNova        = document.getElementById('btn-nova-mensagem');

  // Evento de submit do formulário
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Valida cada campo do formulário
    var nomeValido     = validarCampo('nome');
    var emailValido    = validarCampo('email');
    var assuntoValido  = validarCampo('assunto');
    var mensagemValida = validarCampo('mensagem');

    // Se algum campo for inválido, não prossegue com o envio
    if (!nomeValido || !emailValido || !assuntoValido || !mensagemValida) {
      return; 
    }

    // Simula envio do formulário
    mostrarSucesso();
  });

  // Validação em tempo real ao perder o foco (blur) de cada campo
  var inputs = form.querySelectorAll('.campo-input');
  inputs.forEach(function(input) {
    input.addEventListener('blur', function() {
      validarCampo(input.id);
    });
  });

  // Evento do botão "Enviar nova mensagem"
  btnNova.addEventListener('click', function() {
    formSucesso.classList.remove('visivel');

    // Exibe o formulário novamente
    formContainer.style.display = 'block';

    // Limpa o formulário e remove classes de validação
    form.reset();

    // Remove classes de válido/inválido e mensagens de erro
    var grupos = form.querySelectorAll('.campo-grupo');
    grupos.forEach(function(grupo) {
      grupo.classList.remove('valido', 'invalido');
    });

    // Limpa mensagens de erro
    var erros = form.querySelectorAll('.campo-erro');
    erros.forEach(function(erro) {
      erro.textContent = '';
    });
  });

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
        mensagem = 'Nome é obrigatório.';
      } else if (valor.length < 3) {
        mensagem = 'Nome muito curto — mínimo 3 caracteres.';
      }
    }

    // Validação do campo de e-mail
    if (id === 'email') {
      var temArroba = valor.indexOf('@') > 0;
      var temPonto  = valor.lastIndexOf('.') > valor.indexOf('@');
      if (valor === '') {
        mensagem = 'E-mail é obrigatório.';
      } else if (!temArroba || !temPonto) {
        mensagem = 'Digite um e-mail válido.';
      }
    }

    // Validação do campo de assunto
    if (id === 'assunto') {
      if (valor === '') {
        mensagem = 'Selecione um assunto.';
      }
    }

    // Validação do campo de mensagem
    if (id === 'mensagem') {
      if (valor === '') {
        mensagem = 'A mensagem não pode estar vazia.';
      } else if (valor.length < 20) {
        mensagem = 'Mensagem muito curta — mínimo 20 caracteres.';
      }
    }

    // Exibe mensagem de erro ou marca o campo como válido
    if (mensagem !== '') {
      erro.textContent = mensagem;
      grupo.classList.add('invalido');
      grupo.classList.remove('valido');
      return false;
    } else {
      erro.textContent = '';
      grupo.classList.remove('invalido');
      if (valor !== '') {
        grupo.classList.add('valido');
      }
      return true;
    }
  }

  // Função para mostrar mensagem de sucesso após envio do formulário
  function mostrarSucesso() {
    formContainer.style.display = 'none';
    formSucesso.classList.add('visivel');
  }

});