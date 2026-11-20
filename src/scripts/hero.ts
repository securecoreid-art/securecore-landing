/**
 * Home hero animations (no dependencies, CSP-safe: external module, no inline styles).
 *
 * A. Network canvas  – drifting nodes, data packets travelling along links,
 *                      and occasional "threat detected (amber) → secured (blue)" pulses.
 * B. Live report     – scan beam + bar fills (CSS, enabled by `.is-live`),
 *                      counting numbers and a typing assessment log.
 *
 * Respects prefers-reduced-motion, pauses when off-screen or when the tab is hidden.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const BLUE = '90, 168, 240';
const AMBER = '253, 188, 91';
const IDLE = '154, 168, 191';

/* ------------------------------------------------------------------ A. network */

type Node = { x: number; y: number; vx: number; vy: number; r: number; state: 0 | 1 | 2; t: number };
type Packet = { a: Node; b: Node; p: number; speed: number };

const ALERT_MS = 1600; // amber "threat detected"
const SECURED_MS = 1400; // blue "secured"

function startNetwork(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let link = 150;
  let nodes: Node[] = [];
  let packets: Packet[] = [];
  let raf = 0;
  let running = false;
  let visible = true;
  let last = 0;
  let spawnIn = 0;
  let alertIn = 1200;

  const rand = (min: number, max: number) => min + Math.random() * (max - min);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    const small = w < 700;
    link = small ? 110 : 150;
    const count = Math.max(16, Math.min(small ? 34 : 72, Math.round((w * h) / (small ? 14000 : 15000))));
    nodes = Array.from({ length: count }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-0.12, 0.12),
      vy: rand(-0.12, 0.12),
      r: rand(1.2, 2.6),
      state: 0,
      t: 0,
    }));
    packets = [];
  }

  function neighbours(n: Node) {
    return nodes.filter((m) => m !== n && Math.hypot(m.x - n.x, m.y - n.y) < link);
  }

  function update(dt: number) {
    for (const n of nodes) {
      n.x += n.vx * dt * 0.06;
      n.y += n.vy * dt * 0.06;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      if (n.state !== 0) {
        n.t += dt;
        if (n.state === 1 && n.t > ALERT_MS) {
          n.state = 2;
          n.t = 0;
        } else if (n.state === 2 && n.t > SECURED_MS) {
          n.state = 0;
          n.t = 0;
        }
      }
    }

    // data packets
    spawnIn -= dt;
    if (spawnIn <= 0 && packets.length < 26) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const near = neighbours(a);
      if (near.length) {
        const b = near[Math.floor(Math.random() * near.length)];
        packets.push({ a, b, p: 0, speed: 1 / rand(1100, 2000) });
      }
      spawnIn = rand(140, 320);
    }
    packets = packets.filter((pk) => {
      pk.p += pk.speed * dt;
      return pk.p < 1;
    });

    // threat detected → secured
    alertIn -= dt;
    if (alertIn <= 0) {
      const idle = nodes.filter((n) => n.state === 0 && n.x > w * 0.35);
      const n = idle[Math.floor(Math.random() * idle.length)];
      if (n) {
        n.state = 1;
        n.t = 0;
      }
      alertIn = rand(1800, 3400);
    }
  }

  function draw() {
    ctx!.clearRect(0, 0, w, h);

    // links
    ctx!.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx!.strokeStyle = `rgba(${BLUE}, ${(1 - d / link) * 0.28})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }
    }

    // packets
    for (const pk of packets) {
      const x = pk.a.x + (pk.b.x - pk.a.x) * pk.p;
      const y = pk.a.y + (pk.b.y - pk.a.y) * pk.p;
      const fade = Math.sin(pk.p * Math.PI);
      ctx!.fillStyle = `rgba(${BLUE}, ${0.15 * fade})`;
      ctx!.beginPath();
      ctx!.arc(x, y, 5, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = `rgba(${BLUE}, ${0.95 * fade})`;
      ctx!.beginPath();
      ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx!.fill();
    }

    // nodes
    for (const n of nodes) {
      if (n.state === 0) {
        ctx!.fillStyle = `rgba(${IDLE}, 0.6)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
        continue;
      }
      const color = n.state === 1 ? AMBER : BLUE;
      const k = n.t / (n.state === 1 ? ALERT_MS : SECURED_MS);
      // expanding ring
      ctx!.strokeStyle = `rgba(${color}, ${0.7 * (1 - k)})`;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.arc(n.x, n.y, n.r + 4 + k * 22, 0, Math.PI * 2);
      ctx!.stroke();
      // soft halo + core
      ctx!.fillStyle = `rgba(${color}, 0.18)`;
      ctx!.beginPath();
      ctx!.arc(n.x, n.y, n.r + 6, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = `rgba(${color}, 1)`;
      ctx!.beginPath();
      ctx!.arc(n.x, n.y, n.r + 1.2, 0, Math.PI * 2);
      ctx!.fill();
    }
  }

  function frame(now: number) {
    const dt = Math.min(50, now - (last || now));
    last = now;
    update(dt);
    draw();
    if (running) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || !visible || document.hidden) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  resize();

  if (reduceMotion) {
    draw(); // one calm, static frame
    return;
  }

  let resizeTimer = 0;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resize();
      if (!running) draw();
    }, 150);
  }).observe(canvas);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  }).observe(canvas);

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  start();
}

/* ------------------------------------------------------------- B. live report */

function startReport(card: HTMLElement) {
  if (reduceMotion) return; // keep the static, fully rendered card

  const counters = Array.from(card.querySelectorAll<HTMLElement>('[data-count]'));
  const bars = Array.from(card.querySelectorAll<SVGRectElement>('rect[data-w]'));
  const lines = Array.from(card.querySelectorAll<HTMLLIElement>('[data-log] li'));
  const texts = lines.map((li) => li.textContent ?? '');
  let timer = 0;
  let active = false;

  function countUp() {
    const targets = counters.map((el) => Number(el.dataset.count) || 0);
    const widths = bars.map((r) => Number(r.dataset.w) || 0);
    const duration = 1400;
    const start = Date.now();
    const tick = () => {
      const k = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      counters.forEach((el, i) => (el.textContent = String(Math.round(targets[i] * eased))));
      bars.forEach((r, i) => {
        // small stagger per bar
        const kb = Math.min(1, Math.max(0, (Date.now() - start - i * 120) / duration));
        r.setAttribute('width', String(widths[i] * (1 - Math.pow(1 - kb, 3))));
      });
      if (k < 1 || bars.some((r, i) => Number(r.getAttribute('width')) < widths[i])) window.setTimeout(tick, 32);
    };
    tick();
  }

  function typeLine(index: number, char: number) {
    if (!active) return;
    if (index >= lines.length) {
      lines[lines.length - 1].classList.remove('is-typing');
      timer = window.setTimeout(restartLog, 4200);
      return;
    }
    const li = lines[index];
    li.classList.add('is-typing');
    li.textContent = texts[index].slice(0, char);
    if (char < texts[index].length) {
      const delay = texts[index][char - 1] === '…' ? 260 : 22 + Math.random() * 30;
      timer = window.setTimeout(() => typeLine(index, char + 1), delay);
    } else {
      timer = window.setTimeout(() => {
        li.classList.remove('is-typing');
        typeLine(index + 1, 0);
      }, 520);
    }
  }

  function restartLog() {
    lines.forEach((li) => {
      li.textContent = '';
      li.classList.remove('is-typing');
    });
    typeLine(0, 0);
  }

  let started = false;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      active = true;
      if (!started) {
        started = true;
        card.classList.add('is-live');
        countUp();
      }
      clearTimeout(timer);
      restartLog();
    } else {
      active = false;
      clearTimeout(timer);
    }
  }).observe(card);
}

/* ----------------------------------------------------------------------- init */

const canvas = document.querySelector<HTMLCanvasElement>('[data-net]');
if (canvas) startNetwork(canvas);

const card = document.querySelector<HTMLElement>('[data-report]');
if (card) startReport(card);
