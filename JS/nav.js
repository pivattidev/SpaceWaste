document.addEventListener("DOMContentLoaded", function() {

    // Efeito de rolagem para a navbar
    var navbar = document.querySelector(".navbar");
    var toggle = document.getElementById("nav-toggle");
    var navMenu = document.getElementById("nav-links");

    // Adiciona ou remove a classe "rolada" com base na posição de rolagem
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("rolada");
        } else {
            navbar.classList.remove("rolada");
        }
    });

    // Lógica para abrir/fechar o menu em telas menores
    toggle.addEventListener('click', function() {
        navMenu.classList.toggle('aberto');
    });

    // Fecha o menu quando um link é clicado
    var links = navMenu.querySelectorAll('a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('aberto');
        });
    });

    // Destaca o link ativo com base na URL
    var paginaAtual = window.location.pathname.split("/").pop();
    links.forEach(function(link) {
        var href = link.getAttribute('href').split("/").pop();
        if (href === paginaAtual) {
            link.classList.add('ativo');
        }
    });
});