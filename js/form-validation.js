/* ==========================================================================
   FORM VALIDATION & TOAST NOTIFICATION UTILITY
   ========================================================================== */

function showToastMessage(message) {
  let toast = document.getElementById('meeloToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'meeloToast';
    toast.className = 'toast-box flex items-center gap-2';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg class="w-5 h-5 text-amber-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

window.showToastMessage = showToastMessage;

document.addEventListener('DOMContentLoaded', () => {
  // Generic form handlers
  const contactForm = document.getElementById('academyContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToastMessage('Thank you! Your trial request has been received. An advisor will contact you within 24 hours.');
      contactForm.reset();
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToastMessage('Authenticated successfully! Redirecting to student portal...');
      setTimeout(() => {
        window.location.href = window.location.pathname.includes('/pages/') ? 'user-dashboard.html' : 'pages/user-dashboard.html';
      }, 1000);
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToastMessage('Account created! Welcome to CodeJam Coding Academy.');
      setTimeout(() => {
        window.location.href = window.location.pathname.includes('/pages/') ? 'user-dashboard.html' : 'pages/user-dashboard.html';
      }, 1200);
    });
  }
});
