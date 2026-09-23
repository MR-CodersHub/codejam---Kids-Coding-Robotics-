/* ==========================================================================
   INTERACTIVE STUDENT PROJECT DEMOS & CANVASES
   1. Scratch Star Voyager (Arrow keys / touch canvas arcade game)
   2. Python Turtle Glow Mandala (Interactive visual script runner)
   3. Robo-Bot Maze Navigator (Step-by-step logic block executor)
   ========================================================================== */

// --- Audio Synthesizer for Kid-Friendly Feedback (Web Audio API) ---
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, High C
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.1);
      osc.stop(this.ctx.currentTime + idx * 0.1 + 0.25);
    });
  }

  playBeep() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }
}

window.soundFx = new SoundEffects();

// --- Confetti Explosion Engine ---
function launchConfetti(count = 70) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#EE5928', '#F9B829', '#FA6B88', '#88BD37', '#44B8C7', '#9063CD'];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() * 200 - 100),
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.rotation += p.rotSpeed;
      p.opacity -= 0.008;

      if (p.opacity > 0) {
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    });

    if (alive > 0) {
      animFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animFrame);
    }
  }

  window.soundFx.playWin();
  render();
}

// ==========================================================================
// 1. GAME: Space Astro-Dodger (Scratch-Style Arcade)
// ==========================================================================
class ScratchAstroGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = 640;
    this.height = this.canvas.height = 360;

    this.player = { x: 300, y: 300, size: 26, speed: 6, vx: 0 };
    this.stars = [];
    this.meteors = [];
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.running = false;
    this.keys = {};

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD'].includes(e.code)) {
        this.keys[e.code] = true;
      }
    });
    window.addEventListener('keyup', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD'].includes(e.code)) {
        this.keys[e.code] = false;
      }
    });
  }

  start() {
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.running = true;
    this.stars = [];
    this.meteors = [];
    this.player.x = this.width / 2;
    this.loop();
  }

  stop() {
    this.running = false;
  }

  spawnEntities() {
    if (Math.random() < 0.04) {
      this.stars.push({
        x: Math.random() * (this.width - 30) + 15,
        y: -20,
        speed: 2 + Math.random() * 2,
        size: 14
      });
    }
    if (Math.random() < 0.03) {
      this.meteors.push({
        x: Math.random() * (this.width - 40) + 20,
        y: -30,
        speed: 3 + Math.random() * 3,
        size: 22,
        rotation: 0
      });
    }
  }

  update() {
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
      this.player.x -= this.player.speed;
    }
    if (this.keys['ArrowRight'] || this.keys['KeyD']) {
      this.player.x += this.player.speed;
    }
    this.player.x = Math.max(20, Math.min(this.width - 20, this.player.x));

    this.spawnEntities();

    // Stars
    for (let i = this.stars.length - 1; i >= 0; i--) {
      const s = this.stars[i];
      s.y += s.speed;
      const dist = Math.hypot(this.player.x - s.x, this.player.y - s.y);
      if (dist < this.player.size + s.size) {
        this.score += 10;
        window.soundFx.playPop();
        this.stars.splice(i, 1);
        continue;
      }
      if (s.y > this.height + 20) {
        this.stars.splice(i, 1);
      }
    }

    // Meteors
    for (let i = this.meteors.length - 1; i >= 0; i--) {
      const m = this.meteors[i];
      m.y += m.speed;
      m.rotation += 0.05;
      const dist = Math.hypot(this.player.x - m.x, this.player.y - m.y);
      if (dist < this.player.size + m.size) {
        this.lives--;
        window.soundFx.playBeep();
        this.meteors.splice(i, 1);
        if (this.lives <= 0) {
          this.gameOver = true;
          this.running = false;
        }
        continue;
      }
      if (m.y > this.height + 30) {
        this.meteors.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.fillStyle = '#0F1322';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Background cosmic dust
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 20; i++) {
      this.ctx.fillRect((i * 37 + (Date.now() / 25)) % this.width, (i * 29) % this.height, 2, 2);
    }

    // Draw Rocket (Player)
    this.ctx.save();
    this.ctx.translate(this.player.x, this.player.y);
    // Rocket body
    this.ctx.fillStyle = '#EE5928';
    this.ctx.beginPath();
    this.ctx.moveTo(0, -22);
    this.ctx.lineTo(16, 16);
    this.ctx.lineTo(-16, 16);
    this.ctx.closePath();
    this.ctx.fill();
    // Rocket Cockpit
    this.ctx.fillStyle = '#67C3CE';
    this.ctx.beginPath();
    this.ctx.arc(0, 2, 6, 0, Math.PI * 2);
    this.ctx.fill();
    // Thruster fire
    this.ctx.fillStyle = '#F9B829';
    this.ctx.beginPath();
    this.ctx.moveTo(-8, 16);
    this.ctx.lineTo(0, 26 + Math.random() * 6);
    this.ctx.lineTo(8, 16);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();

    // Draw Collectible Stars
    this.stars.forEach(s => {
      this.ctx.save();
      this.ctx.translate(s.x, s.y);
      this.ctx.fillStyle = '#F9B829';
      this.ctx.shadowColor = '#F9B829';
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw Meteors
    this.meteors.forEach(m => {
      this.ctx.save();
      this.ctx.translate(m.x, m.y);
      this.ctx.rotate(m.rotation);
      this.ctx.fillStyle = '#8B5CF6';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, m.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = '#A78BFA';
      this.ctx.fillRect(-4, -4, 5, 5);
      this.ctx.restore();
    });

    // HUD
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 16px "Fredoka", sans-serif';
    this.ctx.fillText(`⭐ Stars: ${this.score}`, 16, 28);
    this.ctx.fillText(`❤️ Energy: ${'♥'.repeat(Math.max(0, this.lives))}`, this.width - 130, 28);

    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(15, 19, 34, 0.85)';
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = '#EE5928';
      this.ctx.font = 'bold 28px "Fredoka", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Mission Complete!', this.width / 2, this.height / 2 - 20);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = '18px "Plus Jakarta Sans", sans-serif';
      this.ctx.fillText(`Total Stars Gathered: ${this.score}`, this.width / 2, this.height / 2 + 15);
      this.ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
      this.ctx.fillStyle = '#F9B829';
      this.ctx.fillText('Click "Restart Mission" to play again', this.width / 2, this.height / 2 + 50);
      this.ctx.textAlign = 'left';
    }
  }

  loop() {
    if (!this.running) {
      if (this.gameOver) this.draw();
      return;
    }
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

// ==========================================================================
// 2. PYTHON TURTLE MANDALA ART RUNNER
// ==========================================================================
class PythonTurtleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = 640;
    this.height = this.canvas.height = 360;
    this.animId = null;
  }

  drawMandala(pattern = 'rainbow-flower', speed = 25) {
    cancelAnimationFrame(this.animId);
    this.ctx.fillStyle = '#0B0F19';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const centerX = this.width / 2;
    const centerY = this.height / 2;
    let step = 0;
    const maxSteps = 160;

    const colors = ['#EE5928', '#F9B829', '#88BD37', '#44B8C7', '#FA6B88', '#9063CD'];

    const renderStep = () => {
      if (step > maxSteps) {
        window.soundFx.playWin();
        return;
      }

      this.ctx.save();
      this.ctx.translate(centerX, centerY);
      const angle = (step * (pattern === 'rainbow-flower' ? 144 : 121) * Math.PI) / 180;
      const radius = step * 1.05;

      this.ctx.rotate(angle);
      this.ctx.strokeStyle = colors[step % colors.length];
      this.ctx.lineWidth = 2.5;
      this.ctx.shadowColor = colors[step % colors.length];
      this.ctx.shadowBlur = 8;

      this.ctx.beginPath();
      this.ctx.arc(radius, 0, 16 + (step % 12), 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();

      step++;
      this.animId = requestAnimationFrame(renderStep);
    };

    renderStep();
  }
}

// ==========================================================================
// 3. ROBO-BOT MAZE SIMULATOR (Robotics Block Execution)
// ==========================================================================
class RoboMazeSim {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = 640;
    this.height = this.canvas.height = 360;

    this.gridCols = 8;
    this.gridRows = 5;
    this.cellW = this.width / this.gridCols;
    this.cellH = this.height / this.gridRows;

    this.maze = [
      [0, 0, 0, 1, 0, 0, 0, 0],
      [1, 1, 0, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 2] // 2 = Gem Target
    ];

    this.bot = { x: 0, y: 0, dir: 0 }; // 0: Right, 1: Down, 2: Left, 3: Up
    this.program = [];
    this.executing = false;
  }

  reset() {
    this.bot = { x: 0, y: 0, dir: 0 };
    this.program = [];
    this.executing = false;
    this.draw();
  }

  addCommand(cmd) {
    if (this.executing) return;
    this.program.push(cmd);
    window.soundFx.playPop();
    this.draw();
  }

  async runProgram(onSuccess) {
    if (this.executing || this.program.length === 0) return;
    this.executing = true;

    for (let cmd of this.program) {
      window.soundFx.playBeep();
      if (cmd === 'FORWARD') {
        let nx = this.bot.x;
        let ny = this.bot.y;
        if (this.bot.dir === 0) nx++;
        if (this.bot.dir === 1) ny++;
        if (this.bot.dir === 2) nx--;
        if (this.bot.dir === 3) ny--;

        if (nx >= 0 && nx < this.gridCols && ny >= 0 && ny < this.gridRows && this.maze[ny][nx] !== 1) {
          this.bot.x = nx;
          this.bot.y = ny;
        }
      } else if (cmd === 'TURN_RIGHT') {
        this.bot.dir = (this.bot.dir + 1) % 4;
      } else if (cmd === 'TURN_LEFT') {
        this.bot.dir = (this.bot.dir + 3) % 4;
      }

      this.draw();
      await new Promise(r => setTimeout(r, 450));
    }

    this.executing = false;
    if (this.maze[this.bot.y][this.bot.x] === 2) {
      launchConfetti();
      if (onSuccess) onSuccess('Gem Collected! Great logic flow!');
    }
  }

  draw() {
    this.ctx.fillStyle = '#181E34';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw Grid & Walls
    for (let r = 0; r < this.gridRows; r++) {
      for (let c = 0; c < this.gridCols; c++) {
        const x = c * this.cellW;
        const y = r * this.cellH;

        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        this.ctx.strokeRect(x, y, this.cellW, this.cellH);

        if (this.maze[r][c] === 1) {
          // Obstacle Wall
          this.ctx.fillStyle = '#2C3454';
          this.ctx.fillRect(x + 4, y + 4, this.cellW - 8, this.cellH - 8);
          this.ctx.fillStyle = '#475569';
          this.ctx.fillText('⚡', x + this.cellW / 2 - 8, y + this.cellH / 2 + 6);
        } else if (this.maze[r][c] === 2) {
          // Target Gem
          this.ctx.fillStyle = '#F9B829';
          this.ctx.font = '24px sans-serif';
          this.ctx.fillText('💎', x + this.cellW / 2 - 14, y + this.cellH / 2 + 8);
        }
      }
    }

    // Draw Cute Robot
    const rx = this.bot.x * this.cellW + this.cellW / 2;
    const ry = this.bot.y * this.cellH + this.cellH / 2;

    this.ctx.save();
    this.ctx.translate(rx, ry);
    this.ctx.rotate((this.bot.dir * 90 * Math.PI) / 180);

    // Robot body
    this.ctx.fillStyle = '#88BD37';
    this.ctx.beginPath();
    this.ctx.roundRect(-22, -18, 44, 36, 10);
    this.ctx.fill();

    // Eyes
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(8, -6, 5, 0, Math.PI * 2);
    this.ctx.arc(8, 6, 5, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#0F172A';
    this.ctx.beginPath();
    this.ctx.arc(10, -6, 2.5, 0, Math.PI * 2);
    this.ctx.arc(10, 6, 2.5, 0, Math.PI * 2);
    this.ctx.fill();

    // Antenna
    this.ctx.strokeStyle = '#F9B829';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(-16, 0);
    this.ctx.lineTo(-24, 0);
    this.ctx.stroke();

    this.ctx.restore();
  }
}

window.ScratchAstroGame = ScratchAstroGame;
window.PythonTurtleCanvas = PythonTurtleCanvas;
window.RoboMazeSim = RoboMazeSim;
window.launchConfetti = launchConfetti;
