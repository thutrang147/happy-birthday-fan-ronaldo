
import { useEffect, useRef } from 'react';
import { foodImages } from './assets/food/foodImages';
import './App.css';

function Confetti() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 8 + 4,
      d: Math.random() * 120,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      tilt: Math.random() * 10 - 5,
    }));
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      update();
    }
    function update() {
      particles.forEach(p => {
        p.y += Math.cos(p.d) + 2 + p.r / 2;
        p.x += Math.sin(p.d) * 2;
        p.d += 0.01;
        if (p.y > H) {
          p.y = -10;
          p.x = Math.random() * W;
        }
      });
    }
    function animate() {
      draw();
      requestAnimationFrame(animate);
    }
    animate();
  }, []);
  return <canvas ref={canvasRef} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none',zIndex:0}} />;
}

function FoodGallery() {
  return (
    <div className="food-gallery">
      {foodImages.map((img, idx) => (
        <img key={idx} src={img} alt="Đồ ăn" className="food-img" />
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="birthday-app">
      <Confetti />
      <Fireworks />
      <Balloons />
      <div className="birthday-content">
        <h1 className="rainbow-text">Chúc mừng sinh nhật</h1>
        <div className="trinh-highlight">TRÌNH</div>
        <h2 className="date-flash">06/09/2005</h2>
        <p className="subtitle">Chúc Trình tuổi mới thật nhiều niềm vui, hạnh phúc, thành công và luôn được ăn ngon!</p>
        <div className="ronaldo">SIUUU! Fan Ronaldo luôn cháy hết mình! 🐐⚽️</div>
        <FoodGallery />
        <div className="effect-cake">
          <div className="cake">
            <div className="cake-top"></div>
            <div className="cake-body"></div>
            <div className="cake-bottom"></div>
            <div className="candle">
              <div className="flame"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fireworks effect
function Fireworks() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    let fireworks = [];
    function createFirework() {
      const x = Math.random() * W;
      const y = H * (0.3 + Math.random() * 0.3);
      const colors = ['#ff2d2d', '#ffd700', '#00ffea', '#ff69b4', '#00ff00', '#ff6600'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const particles = Array.from({ length: 30 }, () => ({
        x,
        y,
        r: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 4 + 2,
        alpha: 1,
        color,
      }));
      fireworks.push({ particles });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      fireworks.forEach(fw => {
        fw.particles.forEach(p => {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        });
      });
    }
    function update() {
      fireworks.forEach(fw => {
        fw.particles.forEach(p => {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          p.alpha -= 0.02;
        });
      });
      fireworks = fireworks.filter(fw => fw.particles.some(p => p.alpha > 0));
    }
    function animate() {
      if (Math.random() < 0.08) createFirework();
      draw();
      update();
      requestAnimationFrame(animate);
    }
    animate();
  }, []);
  return <canvas ref={canvasRef} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none',zIndex:1}} />;
}

// Balloons effect
function Balloons() {
  const balloonColors = ['#ff2d2d', '#ffd700', '#00ffea', '#ff69b4', '#00ff00', '#ff6600'];
  const balloons = Array.from({ length: 12 }, (_, i) => ({
    left: `${8 + i * 7}%`,
    delay: `${Math.random() * 2}s`,
    color: balloonColors[i % balloonColors.length],
  }));
  return (
    <div className="balloons">
      {balloons.map((b, idx) => (
        <div
          key={idx}
          className="balloon"
          style={{ left: b.left, background: b.color, animationDelay: b.delay }}
        ></div>
      ))}
    </div>
  );
}

export default App;
