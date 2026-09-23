/* ==========================================================================
   DASHBOARD NAVBAR — Minimal header for User & Admin dashboards
   Features:
   - Brand logo + CodeJam name (links back to home)
   - Role badge (auto-detected from page filename)
   - Dark / Light theme toggle
   - Logout button (redirects to login.html)
   ========================================================================== */

(function () {

  /* ── Helpers ─────────────────────────────────────────────────────────── */
  function getRole() {
    const file = window.location.pathname.replace(/\\/g, '/').split('/').pop();
    if (file && file.includes('admin')) return 'admin';
    return 'student';
  }

  function renderDashboardNavbar() {
    const container = document.getElementById('dashboard-navbar');
    if (!container) return;

    const isDark = document.documentElement.classList.contains('dark') ||
                   localStorage.getItem('meelo_theme') === 'dark';

    if (isDark) document.documentElement.classList.add('dark');

    const role    = getRole();
    const isAdmin = role === 'admin';

    // Visual tokens per role
    const badgeBg    = isAdmin ? 'bg-purple-100 dark:bg-purple-900/40'    : 'bg-amber-100 dark:bg-amber-900/30';
    const badgeTxt   = isAdmin ? 'text-purple-700 dark:text-purple-300'   : 'text-amber-700 dark:text-amber-300';
    const badgeDot   = isAdmin ? 'bg-purple-500'                          : 'bg-amber-400';
    const badgeLabel = isAdmin ? 'Admin Portal'                           : 'Student Portal';
    const badgeIcon  = isAdmin ? 'shield-check'                           : 'graduation-cap';
    const logoutHref = '../pages/login.html';
    const homeHref   = '../index.html';

    container.innerHTML = `
      <header id="dashboard-header"
        class="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 dark:border-slate-700/60
               bg-white/90 dark:bg-[#0F1322]/90 backdrop-blur-xl shadow-sm transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-[70px]">

            <!-- LEFT: Brand -->
            <a href="${homeHref}" class="flex items-center gap-3 group shrink-0">
              <img src="../assets/logo.png" alt="CodeJam Logo"
                   class="w-9 h-9 object-contain transition-transform group-hover:scale-105">
              <div class="flex flex-col leading-none">
                <span class="font-heading text-xl font-bold text-orange-600 dark:text-orange-400 tracking-tight">
                  CodeJam
                </span>
                <span class="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.18em]">
                  Kids Coding Academy
                </span>
              </div>
            </a>

            <!-- CENTER: Role Badge (hidden on xs) -->
            <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border
                        border-slate-200/70 dark:border-slate-700 ${badgeBg} select-none">
              <span class="w-2 h-2 rounded-full ${badgeDot} animate-pulse shrink-0"></span>
              <i data-lucide="${badgeIcon}" class="w-3.5 h-3.5 ${badgeTxt} shrink-0"></i>
              <span class="text-[11px] font-bold ${badgeTxt} tracking-wide">${badgeLabel}</span>
            </div>

            <!-- RIGHT: Controls -->
            <div class="flex items-center gap-2">

              <!-- Dark / Light Toggle -->
              <button id="dash-theme-btn" title="Toggle theme" aria-label="Toggle theme"
                class="w-9 h-9 rounded-full flex items-center justify-center
                       bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700
                       text-slate-600 dark:text-amber-400 hover:scale-110 active:scale-95 transition-all shadow-sm">
                <i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-4 h-4"></i>
              </button>

              <!-- Logout -->
              <a href="${logoutHref}"
                class="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold
                       bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700
                       text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-900/20
                       hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800/50
                       transition-all shadow-sm">
                <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
                <span class="hidden sm:inline">Logout</span>
              </a>

            </div>
          </div>
        </div>
      </header>
    `;

    /* ── Theme Toggle ────────────────────────────────────────────────── */
    const themeBtn = document.getElementById('dash-theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nowDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('meelo_theme', nowDark ? 'dark' : 'light');
        renderDashboardNavbar();
      });
    }

    /* ── Lucide Icons ────────────────────────────────────────────────── */
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => { if (window.lucide) window.lucide.createIcons(); }, 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderDashboardNavbar);
  } else {
    renderDashboardNavbar();
  }

})();
