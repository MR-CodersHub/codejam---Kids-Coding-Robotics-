/* ==========================================================================
   MEELO KIDS CODING ACADEMY - MAIN APPLICATION CONTROLLER
   Handles Navigation, Modals, Curriculum Accordions, Interactive Pricing,
   Student Portal & Dashboard, and Playground Execution.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  initNavigation();
  initSoundToggle();
  initProgramsFilter();
  initCurriculumTabs();
  initPricingToggle();
  initFamilyCalculator();
  initStudentPortal();
  initDemoModals();
  initTrialBooking();
});

// Helper to refresh icons dynamically
function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --- 1. Navigation & View Router ---
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Handle hash change & route view
  function handleRoute() {
    const hash = window.location.hash || '#home';
    const targetSection = document.querySelector(hash);

    navLinks.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  window.addEventListener('hashchange', handleRoute);

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

// --- 2. Sound Toggle ---
function initSoundToggle() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    window.soundFx.muted = !window.soundFx.muted;
    if (window.soundFx.muted) {
      soundBtn.classList.add('muted');
      soundBtn.innerHTML = '<i data-lucide="volume-x" class="icon"></i>';
      refreshIcons();
      showToast('Sound Muted');
    } else {
      soundBtn.classList.remove('muted');
      soundBtn.innerHTML = '<i data-lucide="volume-2" class="icon"></i>';
      refreshIcons();
      window.soundFx.playPop();
      showToast('Sound Enabled');
    }
  });
}

// --- 3. Toast Notification ---
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i data-lucide="sparkles" class="icon" style="color:var(--primary-yellow);"></i> <span>${message}</span>`;
  refreshIcons();
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// --- 4. Programs Age Filter ---
function initProgramsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const programCards = document.querySelectorAll('.program-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      window.soundFx.playPop();
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- 5. Curriculum Track Switcher & Accordion ---
function initCurriculumTabs() {
  const trackBtns = document.querySelectorAll('.track-btn');
  const trackContents = document.querySelectorAll('.curriculum-track-content');
  const accordionHeaders = document.querySelectorAll('.module-header');

  // Switch Track Tabs
  trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundFx.playPop();
      trackBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const track = btn.getAttribute('data-track');
      trackContents.forEach(content => {
        if (content.id === `track-${track}`) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });
    });
  });

  // Accordion Expand/Collapse
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      window.soundFx.playPop();
      const parent = header.parentElement;
      const isActive = parent.classList.contains('active');

      // Close sibling accordions in same track
      const siblings = parent.parentElement.querySelectorAll('.module-accordion-item');
      siblings.forEach(s => s.classList.remove('active'));

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
}

// --- 6. Pricing Toggle (Monthly vs Annual) ---
function initPricingToggle() {
  const switchPill = document.getElementById('pricingSwitch');
  const monthlyLabel = document.getElementById('labelMonthly');
  const annualLabel = document.getElementById('labelAnnual');
  const priceAmounts = document.querySelectorAll('.price-val');
  const pricePeriods = document.querySelectorAll('.price-period');

  if (!switchPill) return;

  let isAnnual = false;

  function togglePricing() {
    isAnnual = !isAnnual;
    window.soundFx.playPop();

    if (isAnnual) {
      switchPill.classList.add('annual');
      annualLabel.style.color = 'var(--primary-orange)';
      monthlyLabel.style.color = 'var(--text-dark)';

      priceAmounts.forEach(p => {
        const annualPrice = p.getAttribute('data-annual');
        if (annualPrice) p.textContent = annualPrice;
      });

      pricePeriods.forEach(p => p.textContent = '/month (billed yearly)');
      showToast('25% Annual Discount Applied! 🚀');
    } else {
      switchPill.classList.remove('annual');
      monthlyLabel.style.color = 'var(--primary-orange)';
      annualLabel.style.color = 'var(--text-dark)';

      priceAmounts.forEach(p => {
        const monthlyPrice = p.getAttribute('data-monthly');
        if (monthlyPrice) p.textContent = monthlyPrice;
      });

      pricePeriods.forEach(p => p.textContent = '/month');
    }
  }

  switchPill.addEventListener('click', togglePricing);
  if (monthlyLabel) monthlyLabel.addEventListener('click', () => { if (isAnnual) togglePricing(); });
  if (annualLabel) annualLabel.addEventListener('click', () => { if (!isAnnual) togglePricing(); });
}

// --- 7. Family Pricing Calculator ---
function initFamilyCalculator() {
  const kidsCountInput = document.getElementById('calcKidsCount');
  const planTierSelect = document.getElementById('calcPlanTier');
  const totalDisplay = document.getElementById('calcTotalAmount');
  const discountDisplay = document.getElementById('calcDiscountSaved');

  if (!kidsCountInput || !planTierSelect || !totalDisplay) return;

  function updateCalc() {
    const kids = parseInt(kidsCountInput.value) || 1;
    const basePrice = parseInt(planTierSelect.value) || 119;

    let discountRate = 0;
    if (kids === 2) discountRate = 0.15; // 15% off for 2 kids
    if (kids >= 3) discountRate = 0.25; // 25% off for 3+ kids

    const gross = kids * basePrice;
    const discount = gross * discountRate;
    const net = Math.round(gross - discount);

    totalDisplay.textContent = `$${net}`;
    if (discountDisplay) {
      discountDisplay.textContent = discount > 0 ? `Saved $${Math.round(discount)}/mo (${discountRate * 100}% off multi-kid discount)` : 'Add a 2nd child for 15% off!';
    }
  }

  kidsCountInput.addEventListener('input', updateCalc);
  planTierSelect.addEventListener('change', updateCalc);
}

// --- 8. Student Portal & Dashboard Controller ---
function initStudentPortal() {
  const authForm = document.getElementById('studentLoginForm');
  const demoLoginBtn = document.getElementById('demoStudentLoginBtn');
  const authContainer = document.getElementById('portalAuthContainer');
  const dashboardView = document.getElementById('portalDashboardView');
  const logoutBtn = document.getElementById('studentLogoutBtn');
  const runCodeBtn = document.getElementById('runCodeBtn');
  const codeEditor = document.getElementById('studentCodeEditor');
  const playgroundOutput = document.getElementById('playgroundOutput');

  // Quick Demo Student Login
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener('click', () => {
      window.soundFx.playWin();
      authContainer.style.display = 'none';
      dashboardView.classList.add('active');
      showToast('Welcome back, Leo! 🚀 Ready to code today?');
    });
  }

  // Regular Login
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.soundFx.playWin();
      authContainer.style.display = 'none';
      dashboardView.classList.add('active');
      showToast('Logged in successfully!');
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.soundFx.playPop();
      dashboardView.classList.remove('active');
      authContainer.style.display = 'block';
      showToast('Logged out');
    });
  }

  // In-Portal Code Runner
  if (runCodeBtn && codeEditor && playgroundOutput) {
    runCodeBtn.addEventListener('click', () => {
      window.soundFx.playPop();
      const code = codeEditor.value;
      playgroundOutput.innerHTML = '<span style="color:#F9B829"><i data-lucide="loader" class="icon"></i> Compiling and running code...</span>';
      refreshIcons();

      setTimeout(() => {
        if (code.includes('print(') || code.includes('console.log')) {
          playgroundOutput.innerHTML = `<span style="color:#4ADE80;"><i data-lucide="check-circle" class="icon"></i> <strong>Output:</strong><br>Hello Future Coder!<br>Loop completed 5 iterations.<br>Score: 100 XP awarded!</span>`;
          window.soundFx.playWin();
          launchConfetti(40);
        } else {
          playgroundOutput.innerHTML = `<span style="color:#4ADE80;"><i data-lucide="check-circle" class="icon"></i> <strong>Output:</strong><br>Code executed successfully! Canvas Sprite moved 50px right</span>`;
          window.soundFx.playPop();
        }
        refreshIcons();
      }, 600);
    });
  }
}

// --- 9. Interactive Demo Modals ---
let activeAstroGame = null;
let activeTurtleCanvas = null;
let activeRoboSim = null;

function initDemoModals() {
  const modalBackdrop = document.getElementById('demoGameModal');
  const modalCloseBtn = document.getElementById('closeModalBtn');
  const modalTitle = document.getElementById('modalGameTitle');
  const modalSubtitle = document.getElementById('modalGameSubtitle');
  const modalBody = document.getElementById('modalGameBody');
  const openButtons = document.querySelectorAll('.open-demo-btn');

  if (!modalBackdrop || !modalCloseBtn) return;

  function closeModal() {
    modalBackdrop.classList.remove('active');
    if (activeAstroGame) activeAstroGame.stop();
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const demoType = btn.getAttribute('data-demo');
      window.soundFx.playPop();
      modalBackdrop.classList.add('active');

      if (demoType === 'astro-dodger') {
        modalTitle.innerHTML = '<i data-lucide="gamepad-2" class="icon" style="color:var(--primary-orange);"></i> Space Astro-Dodger (Scratch Game)';
        modalSubtitle.textContent = 'Built by Maya S. (Age 8) using Variables, Physics & Event Broadcasts';
        modalBody.innerHTML = `
          <div class="game-container-box">
            <div class="game-hud-bar">
              <span><i data-lucide="cpu" class="icon"></i> Scratch Arcade Engine</span>
              <span>Use Left/Right Arrow Keys</span>
            </div>
            <canvas id="astroCanvas" class="game-canvas-screen"></canvas>
            <p class="game-controls-hint">Collect gold stars and dodge purple space boulders! Use <kbd>←</kbd> and <kbd>→</kbd> keys.</p>
            <div style="margin-top:14px; display:flex; gap:10px;">
              <button id="restartAstroBtn" class="btn btn-primary btn-sm"><i data-lucide="play" class="icon"></i> Restart Mission</button>
            </div>
          </div>
        `;
        refreshIcons();
        activeAstroGame = new window.ScratchAstroGame('astroCanvas');
        activeAstroGame.start();
        document.getElementById('restartAstroBtn').addEventListener('click', () => {
          activeAstroGame.start();
        });

      } else if (demoType === 'python-turtle') {
        modalTitle.innerHTML = '<i data-lucide="terminal" class="icon" style="color:var(--primary-green);"></i> Python Turtle Glow Mandala';
        modalSubtitle.textContent = 'Built by Ethan K. (Age 12) using Loops, Angles & Color Arrays';
        modalBody.innerHTML = `
          <div class="game-container-box">
            <div class="game-hud-bar">
              <span><i data-lucide="terminal" class="icon"></i> Python 3.12 Turtle Simulator</span>
              <span id="turtleStatus">Status: Ready</span>
            </div>
            <canvas id="turtleCanvas" class="game-canvas-screen"></canvas>
            <div style="margin-top:16px; display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
              <button id="drawFlowerBtn" class="btn btn-yellow btn-sm"><i data-lucide="sparkles" class="icon"></i> Draw Rainbow Flower</button>
              <button id="drawStarBtn" class="btn btn-primary btn-sm"><i data-lucide="star" class="icon"></i> Draw Cosmic Starburst</button>
            </div>
          </div>
        `;
        refreshIcons();
        activeTurtleCanvas = new window.PythonTurtleCanvas('turtleCanvas');
        activeTurtleCanvas.drawMandala('rainbow-flower');

        document.getElementById('drawFlowerBtn').addEventListener('click', () => {
          activeTurtleCanvas.drawMandala('rainbow-flower');
        });
        document.getElementById('drawStarBtn').addEventListener('click', () => {
          activeTurtleCanvas.drawMandala('starburst');
        });

      } else if (demoType === 'robo-maze') {
        modalTitle.innerHTML = '<i data-lucide="bot" class="icon" style="color:var(--primary-blue);"></i> Robo-Bot Maze Navigator';
        modalSubtitle.textContent = 'Built by Lucas W. (Age 10) using Micro:bit logic blocks';
        modalBody.innerHTML = `
          <div class="game-container-box">
            <div class="game-hud-bar">
              <span><i data-lucide="cpu" class="icon"></i> Hardware Logic Simulator</span>
              <span id="roboStatus">Target: Collect the Gem</span>
            </div>
            <canvas id="roboCanvas" class="game-canvas-screen"></canvas>
            <div style="margin-top:16px; display:flex; gap:8px; flex-wrap:wrap; justify-content:center;">
              <button id="cmdFwdBtn" class="btn btn-secondary btn-sm"><i data-lucide="arrow-up" class="icon"></i> Move Forward</button>
              <button id="cmdTurnRBtn" class="btn btn-secondary btn-sm"><i data-lucide="corner-up-right" class="icon"></i> Turn Right</button>
              <button id="cmdTurnLBtn" class="btn btn-secondary btn-sm"><i data-lucide="corner-up-left" class="icon"></i> Turn Left</button>
              <button id="cmdRunBtn" class="btn btn-primary btn-sm"><i data-lucide="play" class="icon"></i> Execute Program</button>
              <button id="cmdResetBtn" class="btn btn-yellow btn-sm"><i data-lucide="rotate-ccw" class="icon"></i> Reset</button>
            </div>
            <p id="roboMessage" style="margin-top:10px; color:#F9B829; font-weight:600; font-size:0.9rem;"></p>
          </div>
        `;
        refreshIcons();
        activeRoboSim = new window.RoboMazeSim('roboCanvas');
        activeRoboSim.reset();

        document.getElementById('cmdFwdBtn').addEventListener('click', () => activeRoboSim.addCommand('FORWARD'));
        document.getElementById('cmdTurnRBtn').addEventListener('click', () => activeRoboSim.addCommand('TURN_RIGHT'));
        document.getElementById('cmdTurnLBtn').addEventListener('click', () => activeRoboSim.addCommand('TURN_LEFT'));
        document.getElementById('cmdResetBtn').addEventListener('click', () => activeRoboSim.reset());
        document.getElementById('cmdRunBtn').addEventListener('click', () => {
          const msgEl = document.getElementById('roboMessage');
          msgEl.textContent = 'Executing instructions on Robo-Bot...';
          activeRoboSim.runProgram((res) => {
            msgEl.textContent = res;
          });
        });
      }
    });
  });
}

// --- 10. Trial Booking Modal & Form Submit ---
function initTrialBooking() {
  const openTrialBtns = document.querySelectorAll('.open-trial-btn');
  const trialModal = document.getElementById('trialModal');
  const closeTrialBtn = document.getElementById('closeTrialModalBtn');
  const trialForm = document.getElementById('trialBookingForm');

  if (!trialModal || !closeTrialBtn) return;

  function closeTrial() {
    trialModal.classList.remove('active');
  }

  openTrialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.soundFx.playPop();
      trialModal.classList.add('active');
    });
  });

  closeTrialBtn.addEventListener('click', closeTrial);
  trialModal.addEventListener('click', (e) => {
    if (e.target === trialModal) closeTrial();
  });

  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeTrial();
      launchConfetti(80);
      showToast('🎉 Free Trial Class Booked! Check your email for Zoom link & kit info.');
    });
  }
}
