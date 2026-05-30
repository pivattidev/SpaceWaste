document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.querySelector(".navbar");
    var toggle = document.getElementById("nav-toggle");
    var navMenu = document.getElementById("nav-links");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("rolada");
        } else {
            navbar.classList.remove("rolada");
        }
    });

    toggle.addEventListener('click', function() {
        navMenu.classList.toggle('aberto');
    });

    var links = navMenu.querySelectorAll('a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('aberto');
        });
    });

    var paginaAtual = window.location.pathname.split("/").pop();
    links.forEach(function(link) {
        var href = link.getAttribute('href').split("/").pop();
        if (href === paginaAtual) {
            link.classList.add('ativo');
        }
    });
});