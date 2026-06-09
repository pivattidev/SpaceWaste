document.addEventListener('DOMContentLoaded', () => {
  generateStars();
});

    // FAQ Accordion
    document.querySelectorAll('.faq-pergunta').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('aberto');

        // Close all
        document.querySelectorAll('.faq-item').forEach(el => {
          el.classList.remove('aberto');
          el.querySelector('.faq-pergunta').setAttribute('aria-expanded', 'false');
        });

        // Open clicked (unless it was already open)
        if (!isOpen) {
          item.classList.add('aberto');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });