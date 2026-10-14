'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
}
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  navigation.classList.toggle('open', !isOpen);
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

const caseStudies = {
  mps: {
    category: 'MPS / INFRAESTRUCTURA',
    title: 'Impresión corporativa con control y continuidad',
    summary: 'La impresión administrada combina conectividad, identidad, servidores y experiencia de usuario. Mi trabajo ha sido conectar esas piezas con las necesidades de cada entorno.',
    role: 'Coordinación de pruebas de concepto, despliegues y soporte de soluciones MPS, en colaboración con clientes, ingenieros y proveedores.',
    work: ['Diagnóstico de colas, conectividad, drivers y flujos de liberación de impresión.', 'Participación en configuraciones de autenticación, certificados y controles de acceso.', 'Coordinación de actualizaciones, pruebas técnicas y validación con usuarios.', 'Documentación de acuerdos, capacitación y seguimiento de incidencias.'],
    focus: 'Comprender el entorno antes de implementar; validar la solución con pruebas y acompañar su operación.'
  },
  operations: {
    category: 'LIDERAZGO / OPERACIONES TI',
    title: 'Orden para una operación exigente',
    summary: 'Una operación técnica necesita prioridades compartidas, responsables claros y comunicación continua. Mi experiencia abarca soluciones, mesa de ayuda y cierres.',
    role: 'Liderazgo y coordinación de equipos técnicos, seguimiento del servicio y colaboración con proveedores y áreas del negocio.',
    work: ['Coordinación de equipos con un alcance de hasta 19 personas.', 'Seguimiento de tickets, escalaciones, SLA e indicadores de operación.', 'Organización de reuniones técnicas, minutas y acuerdos de seguimiento.', 'Coordinación de cierres y documentación para dar continuidad al servicio.'],
    focus: 'Dar visibilidad al trabajo, priorizar según impacto y sostener el seguimiento hasta el cierre.'
  },
  security: {
    category: 'CIBERSEGURIDAD / CONTROLES',
    title: 'Seguridad integrada a la operación',
    summary: 'La seguridad debe formar parte de la administración cotidiana de los sistemas. Mi experiencia conecta controles técnicos, atención de incidentes y continuidad.',
    role: 'Participación en gestión de vulnerabilidades, hardening, controles de acceso y seguimiento de incidentes dentro de la operación TI.',
    work: ['Revisión de vulnerabilidades y seguimiento de acciones de remediación.', 'Hardening de entornos Windows y Linux y revisión de accesos.', 'Trabajo con herramientas de monitoreo y análisis, como Wazuh, Splunk y CrowdStrike Falcon.', 'Documentación y referencia a marcos como ISO 27001, NIST CSF y MITRE ATT&CK.'],
    focus: 'Traducir los hallazgos en prioridades concretas, considerando el riesgo y la continuidad del negocio.'
  }
};
const dialog = document.querySelector('.case-dialog');
let dialogTrigger = null;
document.querySelectorAll('[data-case]').forEach(button => {
  button.addEventListener('click', () => {
    const study = caseStudies[button.dataset.case];
    if (!study) return;
    dialogTrigger = button;
    document.querySelector('#case-category').textContent = study.category;
    document.querySelector('#case-title').textContent = study.title;
    document.querySelector('#case-summary').textContent = study.summary;
    document.querySelector('#case-role').textContent = study.role;
    document.querySelector('#case-focus').textContent = study.focus;
    const list = document.querySelector('#case-work');
    list.replaceChildren(...study.work.map(item => {
      const li = document.createElement('li');
      li.textContent = item;
      return li;
    }));
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogTrigger?.focus({preventScroll: true});
});
document.querySelector('.dialog-contact').addEventListener('click', event => {
  event.preventDefault();
  dialog.close();
  document.querySelector('#contacto').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  document.querySelector('#contacto .button').focus({preventScroll: true});
});

const toast = document.querySelector('.toast');
let toastTimeout;
function showToast(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 4500);
}
document.querySelector('.copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('dave989172@gmail.com');
    showToast('Correo copiado: dave989172@gmail.com');
  } catch {
    showToast('Puedes copiarlo directamente: dave989172@gmail.com');
  }
});

document.querySelector('#year').textContent = String(new Date().getFullYear());
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll('a').forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-15% 0px -60% 0px', threshold: 0});
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}
