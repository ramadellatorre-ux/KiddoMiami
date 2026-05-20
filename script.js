(() => {
  const nav = document.getElementById('nav');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('hidden', y > 220 && y > lastY);
    lastY = y;
  }, { passive: true });

  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const toggle = document.getElementById('navToggle');
  const closeBtn = document.getElementById('drawerClose');

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('show');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  document.querySelectorAll('[data-drawer-link]').forEach(a => a.addEventListener('click', closeDrawer));

  const stage = document.getElementById('heroStage');
  const wrap = document.getElementById('heroPhotoWrap');
  let tiltX = 0, tiltY = 0, scrollOffset = 0;

  const applyTransform = () => {
    wrap.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${scrollOffset * 0.06}px)`;
  };

  if (stage && wrap) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const px = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const py = (e.clientY - rect.top - rect.height / 2) / rect.height;
      tiltX = -py * 8;
      tiltY = px * 12;
      applyTransform();
    });
    stage.addEventListener('mouseleave', () => {
      tiltX = 0; tiltY = 0;
      applyTransform();
    });
    window.addEventListener('scroll', () => {
      scrollOffset = window.scrollY;
      applyTransform();
    }, { passive: true });
  }

  const rays = document.getElementById('heroRays');
  if (rays) {
    const svgNS = 'http://www.w3.org/2000/svg';
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', 100 + Math.cos(a) * 70);
      line.setAttribute('y1', 100 + Math.sin(a) * 70);
      line.setAttribute('x2', 100 + Math.cos(a) * 96);
      line.setAttribute('y2', 100 + Math.sin(a) * 96);
      line.setAttribute('stroke', '#ea5e1f');
      line.setAttribute('stroke-width', '2.5');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('opacity', '.7');
      rays.appendChild(line);
    }
  }
})();
