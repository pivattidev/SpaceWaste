// ── INICIALIZAÇÃO DO DOCUMENTO ────────────────────
// Aguarda o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', function() {

// Seleciona elementos da navbar
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('.nav-link');

// ── EFEITO SCROLL DA NAVBAR ───────────────────────
// Adiciona classe 'rolada' quando usuário rola a página
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('rolada',window.scrollY > 50);
    }
});


// ── TOGGLE DO MENU MOBILE ─────────────────────────
// Abre/fecha menu quando clica no botão .
if (navToggle) {
    navToggle.addEventListener('click', function() {
        navbar.classList.toggle('aberto');
    });
  }


// ── FECHAR MENU AO CLICAR ─────────────────────────
// Fecha o menu quando usuário clica em um link
 const links = document.querySelectorAll('a');
 links.forEach(function(link) {
    link.addEventListener('click', function() {
        navlinks.classList.remove('aberto');
    });
   });

});