/**
 * Custom Hooks for Application Effects
 */

import { useEffect, useRef } from 'react';

export const useAppEffects = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!cursor || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let ringAnimId = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      ringAnimId = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMove);
    animateRing();

    const hoverTargets = document.querySelectorAll(
      'a, button, .step-card, .offer-tile, .audience-card, .feature-cell'
    );

    const onEnter = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      ring.style.width = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = 'var(--bright)';
    };

    const onLeave = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'var(--lavender)';
    };

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(ringAnimId);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  // Particle animation background
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = 0;
    let H = 0;
    let particles = [];
    let animId = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.r = Math.random() * 1.4 + 0.2;
        this.speed = Math.random() * 0.35 + 0.08;
        this.opacity = Math.random() * 0.5 + 0.08;
        this.drift = (Math.random() - 0.5) * 0.12;
      }

      update() {
        this.y -= this.speed;
        this.x += this.drift;
        if (this.y < -5) this.reset();
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,165,245,${this.opacity})`;
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    particles = Array.from({ length: 130 }, () => new Particle());
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Reveal animation observer
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    // Reset all reveals
    targets.forEach((el) => {
      el.classList.remove('up');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('up');
          } else {
            entry.target.classList.remove('up');
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  return {
    cursorElement: '#cursor',
    ringElement: '#cursor-ring'
  };
};
