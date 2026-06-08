document.addEventListener('DOMContentLoaded', function() {

  generateStars();

  var form           = document.getElementById('contato-form');
  var formContainer  = document.getElementById('form-container');
  var formSucesso    = document.getElementById('form-sucesso');
  var btnNova        = document.getElementById('btn-nova-mensagem');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var nomeValido     = validarCampo('nome');
    var emailValido    = validarCampo('email');
    var assuntoValido  = validarCampo('assunto');
    var mensagemValida = validarCampo('mensagem');

    if (!nomeValido || !emailValido || !assuntoValido || !mensagemValida) {
      return; 
    }

    mostrarSucesso();
  });

  var inputs = form.querySelectorAll('.campo-input');
  inputs.forEach(function(input) {
    input.addEventListener('blur', function() {
      validarCampo(input.id);
    });
  });

  btnNova.addEventListener('click', function() {
    formSucesso.classList.remove('visivel');

    formContainer.style.display = 'block';

    form.reset();

    var grupos = form.querySelectorAll('.campo-grupo');
    grupos.forEach(function(grupo) {
      grupo.classList.remove('valido', 'invalido');
    });

    var erros = form.querySelectorAll('.campo-erro');
    erros.forEach(function(erro) {
      erro.textContent = '';
    });
  });

  function validarCampo(id) {
    var campo  = document.getElementById(id);
    var erro   = document.getElementById('erro-' + id);
    var grupo  = document.getElementById('campo-' + id);
    var valor  = campo.value.trim();
    var mensagem = '';

    if (id === 'nome') {
      if (valor === '') {
        mensagem = 'Nome é obrigatório.';
      } else if (valor.length < 3) {
        mensagem = 'Nome muito curto — mínimo 3 caracteres.';
      }
    }

    if (id === 'email') {
      var temArroba = valor.indexOf('@') > 0;
      var temPonto  = valor.lastIndexOf('.') > valor.indexOf('@');
      if (valor === '') {
        mensagem = 'E-mail é obrigatório.';
      } else if (!temArroba || !temPonto) {
        mensagem = 'Digite um e-mail válido.';
      }
    }

    if (id === 'assunto') {
      if (valor === '') {
        mensagem = 'Selecione um assunto.';
      }
    }

    if (id === 'mensagem') {
      if (valor === '') {
        mensagem = 'A mensagem não pode estar vazia.';
      } else if (valor.length < 20) {
        mensagem = 'Mensagem muito curta — mínimo 20 caracteres.';
      }
    }

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

  function mostrarSucesso() {
    formContainer.style.display = 'none';
    formSucesso.classList.add('visivel');
  }

});