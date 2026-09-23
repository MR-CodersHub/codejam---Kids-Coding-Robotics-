/* ==========================================================================
   SHARED REUSABLE NAVBAR COMPONENT & PROFILE CONTROLLER
   Renders identical top navigation across all pages.
   Features:
   - Dynamic path resolution (works from root index.html or pages/ folder)
   - Active-state highlighting on the current page's nav menu item
   - Click-based Courses dropdown (opens on click, closes on outside/Escape)
   - Profile Dropdown (Login/Signup, My Profile, Admin Dashboard, User Dashboard)
   - Dedicated One-Click Dark/Light Theme Switch Button in Navbar
   - RTL / LTR Language Direction Toggle
   ========================================================================== */

(function () {
  function isSubpage() {
    const path = window.location.pathname.replace(/\\/g, '/');
    return path.includes('/pages/');
  }

  function getActivePage() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const file = (path.split('/').pop() || 'index.html').toLowerCase();
    if (file === '' || file === 'index.html') return 'home';
    if (file === 'home-2.html') return 'home2';
    if (file === 'about.html') return 'about';
    if (file.includes('service')) return 'courses';
    if (file.includes('blog')) return 'blog';
    if (file === 'contact.html') return 'contact';
    return null;
  }

  function renderNavbar() {
    const navbarContainer = document.getElementById('shared-navbar');
    if (!navbarContainer) return;

    const inPages = isSubpage();
    const homeUrl = inPages ? '../index.html' : 'index.html';
    const pagesPrefix = inPages ? '' : 'pages/';
    const assetPrefix = inPages ? '../' : '';

    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('meelo_theme') === 'dark';
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl' || localStorage.getItem('meelo_rtl') === 'true';

    if (isDark) document.documentElement.classList.add('dark');
    if (isRtl) document.documentElement.setAttribute('dir', 'rtl');

    const active = getActivePage();

    const ACTIVE_NAV = 'px-3 py-2 rounded-full text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-slate-800 font-bold transition';
    const INACTIVE_NAV = 'px-3 py-2 rounded-full text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 transition';

    navbarContainer.innerHTML = `
     
      <!-- Main Navigation Header -->
      <header class="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-orange-500/10 shadow-sm transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            
            <!-- Brand Logo (redirects to home page) -->
            <a href="${homeUrl}" class="flex items-center gap-3 group">
              <img src="${assetPrefix}assets/logo.png" alt="CodeJam Logo" class="w-11 h-11 object-contain transform group-hover:scale-105 transition-all">
              <div class="flex flex-col leading-none">
                <span class="font-heading text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400 tracking-tight">
                  CodeJam
                </span>
                <span class="font-display text-[9px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-[0.18em] uppercase mt-1">
                  Kids Coding Academy
                </span>
              </div>
            </a>

            <!-- Desktop Navigation Links -->
            <nav class="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        
              <a href="${homeUrl}" class="${active === 'home' ? ACTIVE_NAV : INACTIVE_NAV}">Home</a>
              <a href="${pagesPrefix}home-2.html" class="${active === 'home2' ? ACTIVE_NAV : INACTIVE_NAV}">Home 2</a>
              <a href="${pagesPrefix}about.html" class="${active === 'about' ? ACTIVE_NAV : INACTIVE_NAV}">About Us</a>
              
              <!-- Courses Dropdown (click to open, closes on outside click / Escape) -->
              <div class="relative">
                <button id="coursesDropdownBtn" class="px-3 py-2 rounded-full ${active === 'courses' ? 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-slate-800 font-bold' : 'text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800'} flex items-center gap-1 transition" aria-haspopup="true" aria-expanded="false">
                  Courses <i data-lucide="chevron-down" id="coursesChevron" class="w-4 h-4 transition-transform duration-200"></i>
                </button>
                <div id="coursesDropdownMenu" class="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-2 hidden z-50">
                  <a href="${pagesPrefix}services.html" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-orange-600 dark:text-orange-400 border-b border-slate-100 dark:border-slate-700 mb-1">
                    <i data-lucide="grid" class="w-4 h-4"></i> View All Courses & Tracks
                  </a>
                  <a href="${pagesPrefix}service-details.html?id=scratch-jr" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">
                    <i data-lucide="palette" class="w-4 h-4 text-pink-500"></i> Scratch Jr (Ages 6–8)
                  </a>
                  <a href="${pagesPrefix}service-details.html?id=scratch-arcade" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">
                    <i data-lucide="gamepad-2" class="w-4 h-4 text-orange-500"></i> Scratch Arcade (Ages 8–10)
                  </a>
                  <a href="${pagesPrefix}service-details.html?id=python-game-dev" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">
                    <i data-lucide="terminal" class="w-4 h-4 text-green-500"></i> Python Dev (Ages 11–14)
                  </a>
                  <a href="${pagesPrefix}service-details.html?id=robotics-iot" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">
                    <i data-lucide="bot" class="w-4 h-4 text-cyan-500"></i> Robotics & Micro:bit
                  </a>
                  <a href="${pagesPrefix}service-details.html?id=ai-explorers" class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">
                    <i data-lucide="sparkles" class="w-4 h-4 text-purple-500"></i> AI & Machine Learning
                  </a>
                </div>
              </div>

              <a href="${pagesPrefix}blog.html" class="${active === 'blog' ? ACTIVE_NAV : INACTIVE_NAV}">Blog</a>
              <a href="${pagesPrefix}contact.html" class="${active === 'contact' ? ACTIVE_NAV : INACTIVE_NAV}">Contact</a>
            </nav>

            <!-- Right Controls: Theme Switch, Profile Dropdown & CTA -->
            <div class="flex items-center gap-2 sm:gap-3">
              
              <!-- Direct Navbar Theme Switch Button -->
              <button id="directThemeToggleBtn" class="w-10 h-10 rounded-full bg-orange-50 dark:bg-slate-800 text-slate-700 dark:text-amber-400 border border-orange-200/60 dark:border-slate-700 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm" title="Toggle Light / Dark Mode" aria-label="Toggle Theme">
                <i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-5 h-5"></i>
              </button>

              <!-- Profile Icon Dropdown -->
              <div class="relative">
                <button id="profileDropdownBtn" class="w-10 h-10 rounded-full bg-orange-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-slate-700 flex items-center justify-center hover:scale-105 transition shadow-sm" aria-label="Profile menu">
                  <i data-lucide="user" class="w-5 h-5"></i>
                </button>

                <!-- Dropdown Menu -->
                <div id="profileDropdownMenu" class="dropdown-menu absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-3 hidden z-50">
                  <div class="px-3 py-2 border-b border-slate-100 dark:border-slate-700 mb-2">
                    <div class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Account Access</div>
                  </div>

                  <!-- Auth Links -->
                  <div class="space-y-1">
                    <a href="${pagesPrefix}login.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 transition">
                      <i data-lucide="log-in" class="w-4 h-4 text-orange-500"></i> Sign In
                    </a>
                    <a href="${pagesPrefix}signup.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 transition">
                      <i data-lucide="user-plus" class="w-4 h-4 text-pink-500"></i> Sign Up
                    </a>
                  </div>

                  <div class="my-2 border-t border-slate-100 dark:border-slate-700"></div>
                  
                  <div class="px-3 py-1 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Account</div>
                  <div class="space-y-1 mt-1">
                    <a href="${pagesPrefix}user-dashboard.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700 hover:text-amber-600 transition">
                      <i data-lucide="graduation-cap" class="w-4 h-4 text-amber-500"></i> Student Dashboard
                    </a>
                    <a href="${pagesPrefix}admin-dashboard.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-700 hover:text-purple-600 transition">
                      <i data-lucide="shield-check" class="w-4 h-4 text-purple-500"></i> Admin Dashboard
                    </a>
                  </div>

                  <div class="my-2 border-t border-slate-100 dark:border-slate-700"></div>

                  <div class="space-y-1">
                    <a href="${pagesPrefix}booking.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 dark:bg-slate-700 hover:bg-orange-100 transition">
                      <i data-lucide="credit-card" class="w-4 h-4 text-orange-500"></i> Book & Purchase Course
                    </a>
                  </div>
                </div>
              </div>

              <!-- Mobile Hamburger Button -->
              <button id="mobileNavToggleBtn" class="lg:hidden p-2 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800" aria-label="Toggle Navigation">
                <i data-lucide="menu" class="w-6 h-6"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Drawer (Floating overlay, does not push hero down) -->
        <div id="mobileMenuDrawer" class="hidden lg:hidden absolute top-full left-0 right-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800 shadow-2xl px-6 pt-4 pb-8 space-y-2 z-50 transition-all duration-300 max-h-[calc(100vh-80px)] overflow-y-auto">
          <a href="${homeUrl}" class="block px-3 py-2.5 rounded-xl text-sm ${active === 'home' ? 'font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-slate-800' : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800'} transition">Home</a>
          <a href="${pagesPrefix}home-2.html" class="block px-3 py-2.5 rounded-xl text-sm ${active === 'home2' ? 'font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-slate-800' : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800'} transition">Home 2 </a>
          <a href="${pagesPrefix}about.html" class="block px-3 py-2.5 rounded-xl text-sm ${active === 'about' ? 'font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-slate-800' : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800'} transition">About Us</a>

          <!-- Mobile Courses Dropdown Accordion -->
          <div class="space-y-1">
            <button id="mobileCoursesDropdownBtn" type="button" class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm ${active === 'courses' ? 'font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-slate-800' : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800'} transition">
              <span>Courses</span>
              <i data-lucide="chevron-down" id="mobileCoursesChevron" class="w-4 h-4 transition-transform duration-200"></i>
            </button>
            <div id="mobileCoursesDropdownMenu" class="hidden pl-2 pr-1 py-1 space-y-1 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60">
              <a href="${pagesPrefix}services.html" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-orange-600 dark:text-orange-400 hover:bg-orange-100/50 dark:hover:bg-slate-700 transition">
                <i data-lucide="grid" class="w-3.5 h-3.5"></i> View All Courses & Tracks
              </a>
              <a href="${pagesPrefix}service-details.html?id=scratch-jr" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700 transition">
                <i data-lucide="palette" class="w-3.5 h-3.5 text-pink-500"></i> Scratch Jr (Ages 6–8)
              </a>
              <a href="${pagesPrefix}service-details.html?id=scratch-arcade" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700 transition">
                <i data-lucide="gamepad-2" class="w-3.5 h-3.5 text-orange-500"></i> Scratch Arcade (Ages 8–10)
              </a>
              <a href="${pagesPrefix}service-details.html?id=python-game-dev" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700 transition">
                <i data-lucide="terminal" class="w-3.5 h-3.5 text-green-500"></i> Python Dev (Ages 11–14)
              </a>
              <a href="${pagesPrefix}service-details.html?id=robotics-iot" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700 transition">
                <i data-lucide="bot" class="w-3.5 h-3.5 text-cyan-500"></i> Robotics & Micro:bit
              </a>
              <a href="${pagesPrefix}service-details.html?id=ai-explorers" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700 transition">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-purple-500"></i> AI & Machine Learning
              </a>
            </div>
          </div>

          <a href="${pagesPrefix}blog.html" class="block px-3 py-2.5 rounded-xl text-sm ${active === 'blog' ? 'font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-slate-800' : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800'} transition">Blog</a>
          <a href="${pagesPrefix}contact.html" class="block px-3 py-2.5 rounded-xl text-sm ${active === 'contact' ? 'font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-slate-800' : 'font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800'} transition">Contact</a>
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <a href="${pagesPrefix}booking.html" class="flex-1 text-center py-3 rounded-full btn-meelo-orange text-white font-bold text-xs shadow-lg">Book Course</a>
          </div>
        </div>
      </header>
    `;

    // Event Listeners
    const profileBtn = document.getElementById('profileDropdownBtn');
    const profileMenu = document.getElementById('profileDropdownMenu');
    const themeBtn = document.getElementById('themeToggleBtn');
    const directThemeBtn = document.getElementById('directThemeToggleBtn');
    const rtlBtn = document.getElementById('rtlToggleBtn');
    const mobileBtn = document.getElementById('mobileNavToggleBtn');
    const mobileDrawer = document.getElementById('mobileMenuDrawer');

    if (profileBtn && profileMenu) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
          profileMenu.classList.add('hidden');
        }
      });
    }

    // Courses Dropdown: click to open, outside click / Escape to close
    const coursesBtn = document.getElementById('coursesDropdownBtn');
    const coursesMenu = document.getElementById('coursesDropdownMenu');
    const coursesChevron = document.getElementById('coursesChevron');

    function openCoursesDropdown() {
      coursesMenu.classList.remove('hidden');
      if (coursesChevron) coursesChevron.classList.add('rotate-180');
      coursesBtn.setAttribute('aria-expanded', 'true');
    }

    function closeCoursesDropdown() {
      coursesMenu.classList.add('hidden');
      if (coursesChevron) coursesChevron.classList.remove('rotate-180');
      coursesBtn.setAttribute('aria-expanded', 'false');
    }

    if (coursesBtn && coursesMenu) {
      coursesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !coursesMenu.classList.contains('hidden');
        if (isOpen) {
          closeCoursesDropdown();
        } else {
          if (profileMenu) profileMenu.classList.add('hidden');
          openCoursesDropdown();
        }
      });

      document.addEventListener('click', (e) => {
        if (!coursesMenu.contains(e.target) && !coursesBtn.contains(e.target)) {
          closeCoursesDropdown();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeCoursesDropdown();
        }
      });
    }

    // Mobile Courses Dropdown Toggle
    const mobileCoursesBtn = document.getElementById('mobileCoursesDropdownBtn');
    const mobileCoursesMenu = document.getElementById('mobileCoursesDropdownMenu');
    const mobileCoursesChevron = document.getElementById('mobileCoursesChevron');

    if (mobileCoursesBtn && mobileCoursesMenu) {
      mobileCoursesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !mobileCoursesMenu.classList.contains('hidden');
        if (isOpen) {
          mobileCoursesMenu.classList.add('hidden');
          if (mobileCoursesChevron) mobileCoursesChevron.classList.remove('rotate-180');
        } else {
          mobileCoursesMenu.classList.remove('hidden');
          if (mobileCoursesChevron) mobileCoursesChevron.classList.add('rotate-180');
        }
      });
    }

    function toggleTheme() {
      const isDarkNow = document.documentElement.classList.toggle('dark');
      localStorage.setItem('meelo_theme', isDarkNow ? 'dark' : 'light');
      renderNavbar();
    }

    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (directThemeBtn) directThemeBtn.addEventListener('click', toggleTheme);

    if (rtlBtn) {
      rtlBtn.addEventListener('click', () => {
        const isRtlNow = document.documentElement.getAttribute('dir') === 'rtl';
        const newDir = isRtlNow ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('meelo_rtl', newDir === 'rtl' ? 'true' : 'false');
        renderNavbar();
      });
    }

    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileDrawer.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
          mobileDrawer.classList.add('hidden');
        }
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
    setTimeout(() => {
      if (window.lucide) window.lucide.createIcons();
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }
})();