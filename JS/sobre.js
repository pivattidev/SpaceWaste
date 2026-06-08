document.addEventListener('DOMContentLoaded', function() {


const navbar = document.document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('.nav-link');


window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('rolada',window.scrollY > 50);
    }
});


if (navToggle) {
    navToggle.addEventListener('click', function() {
        navbar.classList.toggle('aberto');
    });
  }


 const links = document.querySelectorAll('a');
 links.forEach(function(link) {
    link.addEventListener('click', function() {
        navlinks.classList.remove('aberto');
    });
   });

});