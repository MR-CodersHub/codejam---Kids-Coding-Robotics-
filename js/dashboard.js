/* ==========================================================================
   DASHBOARD CONTROLLER (Admin & User / Student Portals)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Admin Dashboard Interactivity
  const approveBtns = document.querySelectorAll('.admin-approve-btn');
  approveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const studentName = btn.getAttribute('data-student') || 'Student';
      btn.textContent = 'Approved ✓';
      btn.className = 'px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg pointer-events-none';
      if (window.showToastMessage) {
        window.showToastMessage(`Project submission for ${studentName} approved!`);
      }
    });
  });

  // Student Dashboard: In-Browser Code Lab
  const runCodeBtn = document.getElementById('dashboardRunCodeBtn');
  const codeInput = document.getElementById('dashboardCodeInput');
  const outputBox = document.getElementById('dashboardOutputBox');

  if (runCodeBtn && codeInput && outputBox) {
    runCodeBtn.addEventListener('click', () => {
      const code = codeInput.value;
      outputBox.innerHTML = '<span class="text-amber-400">Compiling and executing in sandbox...</span>';

      setTimeout(() => {
        if (code.includes('print') || code.includes('console.log')) {
          outputBox.innerHTML = `
            <div class="text-green-400 font-mono text-xs leading-relaxed">
              ✓ Output:<br>
              Hello Future Coder!<br>
              Loop cycle: 5 iterations completed.<br>
              <span class="text-amber-300 font-bold">+50 XP Awarded to your streak!</span>
            </div>
          `;
          if (window.showToastMessage) {
            window.showToastMessage('Code executed successfully! +50 XP added to profile.');
          }
        } else {
          outputBox.innerHTML = `
            <div class="text-green-400 font-mono text-xs">
              ✓ Code executed cleanly! Canvas sprite relocated to (X: 120, Y: 85).
            </div>
          `;
        }
      }, 500);
    });
  }

  // Hydrate icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
