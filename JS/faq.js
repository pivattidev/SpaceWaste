document.addEventListener('DOMContentLoaded', () => {
  generateStars();
});

    // Lógica para abrir/fechar as perguntas
    document.querySelectorAll('.faq-pergunta').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('aberto');

        // Fecha todas as perguntas
        document.querySelectorAll('.faq-item').forEach(el => {
          el.classList.remove('aberto');
          el.querySelector('.faq-pergunta').setAttribute('aria-expanded', 'false');
        });

        // Abre a pergunta clicada se ela não estava aberta
        if (!isOpen) {
          item.classList.add('aberto');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });