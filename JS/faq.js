 const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('rolada', window.scrollY > 20);
    });

    // Mobile nav toggle
    document.getElementById('nav-toggle').addEventListener('click', () => {
      document.getElementById('nav-links').classList.toggle('aberto');
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