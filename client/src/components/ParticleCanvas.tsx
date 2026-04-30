import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

class Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3.2 + 1.2;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
    this.alpha = 0.8;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.008;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      if (particlesRef.current.length < 200) {
        particlesRef.current.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const particleColor = theme === 'light' ? '#0081b8' : '#00abf0';

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0);
      particlesRef.current.forEach(p => {
        p.update();
        p.draw(ctx, particleColor);
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
<canvas
  ref={canvasRef}
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 0, // Garanta que o fundo do BODY esteja atrás disso
    opacity: theme === 'dark' ? 0.4 : 0.6, // Menos opacidade no dark para não acinzentar
    mixBlendMode: 'screen', // Faz as cores brilharem sem afetar o preto do fundo
  }}
  aria-hidden="true"
/>
  );
}
