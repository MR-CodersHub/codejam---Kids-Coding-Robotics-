/* ==========================================================================
   SHARED REUSABLE FOOTER COMPONENT
   Renders identical footer across all pages.
   ========================================================================== */

(function () {
  function isSubpage() {
    const path = window.location.pathname.replace(/\\/g, '/');
    return path.includes('/pages/');
  }

  function renderFooter() {
    const footerContainer = document.getElementById('shared-footer');
    if (!footerContainer) return;

    const inPages = isSubpage();
    const homeUrl = inPages ? '../index.html' : 'index.html';
    const pagesPrefix = inPages ? '' : 'pages/';
    const assetPrefix = inPages ? '../' : '';

    footerContainer.innerHTML = `
      <footer class="bg-[#181C2E] text-slate-300 pt-16 pb-12 border-t border-slate-800 transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Top Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            
            <!-- Col 1: Brand Info -->
            <div class="lg:col-span-2 space-y-4">
              <a href="${homeUrl}" class="flex items-center gap-3">
                <img src="${assetPrefix}assets/logo.png" alt="CodeJam Logo" class="w-10 h-10 object-contain">
                <div class="flex flex-col leading-none">
                  <span class="font-heading text-2xl font-bold text-white tracking-tight">CodeJam</span>
                  <span class="font-display text-[9px] font-semibold text-slate-400 tracking-[0.18em] uppercase mt-1">Kids Coding Academy</span>
                </div>
              </a>
              <p class="text-xs text-slate-400 leading-relaxed max-w-sm">
                Empowering children ages 6 to 14 through play-based computer science, game design, Python programming, and hands-on robotics kits.
              </p>
              <p class="font-mono text-[11px] text-slate-500">
                <span class="text-cyan-400">&lt;code&gt;</span> learn.play.create() <span class="text-cyan-400">&lt;/code&gt;</span>
              </p>
              <div class="flex items-center gap-3 pt-2">
                <a href="https://youtube.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:bg-orange-500 hover:text-white flex items-center justify-center transition" title="YouTube">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition" title="Twitter / X">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:bg-pink-500 hover:text-white flex items-center justify-center transition" title="Instagram">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:bg-indigo-500 hover:text-white flex items-center justify-center transition" title="GitHub">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              </div>
            </div>

            <!-- Col 2: Programs -->
            <div class="space-y-3">
              <div class="text-xs font-bold uppercase tracking-wider text-white">Programs</div>
              <ul class="space-y-2 text-xs">
                <li><a href="${pagesPrefix}service-details.html?id=scratch-jr" class="hover:text-orange-400 transition">Scratch Jr (Ages 6–8)</a></li>
                <li><a href="${pagesPrefix}service-details.html?id=scratch-arcade" class="hover:text-orange-400 transition">Scratch 3.0 (Ages 8–10)</a></li>
                <li><a href="${pagesPrefix}service-details.html?id=python-game-dev" class="hover:text-orange-400 transition">Python Dev (Ages 11–14)</a></li>
                <li><a href="${pagesPrefix}service-details.html?id=robotics-iot" class="hover:text-orange-400 transition">Robotics & Micro:bit</a></li>
                <li><a href="${pagesPrefix}service-details.html?id=ai-explorers" class="hover:text-orange-400 transition">AI & Machine Learning</a></li>
              </ul>
            </div>

            <!-- Col 3: Quick Links -->
            <div class="space-y-3">
              <div class="text-xs font-bold uppercase tracking-wider text-white">Quick Links</div>
              <ul class="space-y-2 text-xs">
                <li><a href="${homeUrl}" class="hover:text-orange-400 transition">Home</a></li>
                <li><a href="${pagesPrefix}home-2.html" class="hover:text-orange-400 transition">Home 2</a></li>
                <li><a href="${pagesPrefix}about.html" class="hover:text-orange-400 transition">About Us</a></li>
                <li><a href="${pagesPrefix}blog.html" class="hover:text-orange-400 transition">Blog</a></li>
                <li><a href="${pagesPrefix}booking.html" class="hover:text-orange-400 transition">Book a Class</a></li>
              </ul>
            </div>

            <!-- Col 4: Portals & Legal -->
            <div class="space-y-3">
              <div class="text-xs font-bold uppercase tracking-wider text-white">Company</div>
              <ul class="space-y-2 text-xs">
                <li><a href="${pagesPrefix}contact.html" class="hover:text-orange-400 transition">Contact Us</a></li>
                <li><a href="${pagesPrefix}faq.html" class="hover:text-orange-400 transition">FAQ </a></li>
                <li><a href="${pagesPrefix}pricing.html" class="hover:text-orange-400 transition">Pricing</a></li>
                <li><a href="${pagesPrefix}Privacy-policy.html" class="hover:text-orange-400 transition">Privacy Policy</a></li>
                <li><a href="${pagesPrefix}Terms-of-service.html" class="hover:text-orange-400 transition">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          <!-- Bottom Row -->
          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>© 2026 CodeJam Kids Coding Academy Inc. All rights reserved.</div>
            <div class="flex items-center gap-6">
              <a href="${pagesPrefix}Privacy-policy.html" class="hover:text-slate-400">Privacy Policy</a>
              <a href="${pagesPrefix}Terms-of-service.html" class="hover:text-slate-400">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
    setTimeout(() => {
      if (window.lucide) window.lucide.createIcons();
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFooter);
  } else {
    renderFooter();
  }
})();
