/* ==========================================================================
   BLOG SEARCH & CATEGORY FILTER CONTROLLER
   ========================================================================== */

const BLOG_POSTS = [
  {
    id: 'why-kids-should-learn-python',
    title: 'Why Learning Python at Age 11 Gives Kids an Unfair Advantage',
    category: 'python',
    categoryName: 'Python & Dev',
    badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    date: 'Aug 24, 2026',
    readTime: '5 min read',
    snippet: 'Discover why Python’s English-like syntax and Pygame graphics empower middle schoolers to transition from block coding to algorithms with confidence.',
    image: '../assets/img3.jpg'
  },
  {
    id: 'scratch-vs-roblox-coding',
    title: 'Scratch 3.0 vs. Roblox Studio: Which Should Your Child Start With?',
    category: 'scratch',
    categoryName: 'Scratch Coding',
    badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    date: 'Aug 18, 2026',
    readTime: '6 min read',
    snippet: 'A comprehensive comparison between visual block coding in Scratch and 3D spatial Lua scripting in Roblox Studio for parents.',
    image: '../assets/img7.jpg'
  },
  {
    id: 'robotics-screen-free-stem',
    title: 'Hands-On Robotics: How Micro:bit Connects Code to the Physical World',
    category: 'robotics',
    categoryName: 'Robotics & Hardware',
    badgeClass: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    date: 'Aug 12, 2026',
    readTime: '4 min read',
    snippet: 'Why tactile physical computing with ultrasonic sensors, motors, and LED matrices bridges digital concepts with real-world spatial physics.',
    image: '../assets/img5.jpg'
  },
  {
    id: 'ai-ethics-for-middle-school',
    title: 'Teaching AI Literacy & Machine Learning Ethics to Young Minds',
    category: 'ai',
    categoryName: 'AI & Ethics',
    badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    date: 'Aug 05, 2026',
    readTime: '5 min read',
    snippet: 'How to introduce computer vision, natural language processing, and data fairness to kids in a constructive, ethical sandbox.',
    image: '../assets/img9.jpg'
  },
  {
    id: 'screen-time-to-create-time',
    title: 'From Screen Consumers to Game Creators: A Parent’s Guide',
    category: 'parenting',
    categoryName: 'Parenting STEM',
    badgeClass: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    date: 'Jul 29, 2026',
    readTime: '4 min read',
    snippet: 'Practical strategies to transform passive tablet gaming into active algorithmic problem-solving and original game design.',
    image: '../assets/img8.jpg'
  },
  {
    id: 'early-stem-kindergarten-logic',
    title: 'How Early Should Kids Start? Cognitive Benefits of Coding at Age 6',
    category: 'scratch',
    categoryName: 'Scratch Jr',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    date: 'Jul 21, 2026',
    readTime: '3 min read',
    snippet: 'Pedagogical research explaining how sequencing blocks and story animations cultivate executive function and spatial memory.',
    image: '../assets/img2.jpg'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('blogGridContainer');
  const countDisplay = document.getElementById('blogCountDisplay');
  const searchInput = document.getElementById('blogSearchInput');
  const filterTabs = document.querySelectorAll('.blog-filter-tab');

  if (!container) return;

  let activeCategory = 'all';
  let activeQuery = '';

  function renderArticles() {
    const filtered = BLOG_POSTS.filter(post => {
      const matchesCat = (activeCategory === 'all') || (post.category === activeCategory);
      const matchesSearch = post.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
                            post.snippet.toLowerCase().includes(activeQuery.toLowerCase()) ||
                            post.categoryName.toLowerCase().includes(activeQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${BLOG_POSTS.length} Articles`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-orange-100 dark:bg-slate-700 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto">
            <i data-lucide="search" class="w-6 h-6"></i>
          </div>
          <h3 class="font-heading text-2xl font-bold text-slate-900 dark:text-white">No Matching Articles Found</h3>
          <p class="text-xs text-slate-500">Try searching for a different keyword like "Scratch", "Python", or "Robotics".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(post => `
      <article class="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition flex flex-col justify-between group">
        <div>
          <div class="aspect-video w-full overflow-hidden relative">
            <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${post.badgeClass} shadow">
              ${post.categoryName}
            </span>
          </div>
          <div class="p-6 space-y-3">
            <div class="flex items-center gap-2 text-xs text-slate-400">
              <span>${post.date}</span>
              <span>•</span>
              <span>${post.readTime}</span>
            </div>
            <h3 class="font-heading text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">
              <a href="blog-details.html?id=${post.id}">${post.title}</a>
            </h3>
            <p class="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
              ${post.snippet}
            </p>
          </div>
        </div>
        <div class="px-6 pb-6 pt-2">
          <a href="blog-details.html?id=${post.id}" class="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700">
            Read Full Article <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </article>
    `).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Filter tab interactions
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.className = 'blog-filter-tab px-4 py-2 rounded-full text-xs font-bold bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:text-orange-500 border border-slate-200 dark:border-slate-700 transition';
      });
      tab.className = 'blog-filter-tab px-4 py-2 rounded-full text-xs font-bold bg-orange-600 text-white shadow-md transition';
      activeCategory = tab.getAttribute('data-category');
      renderArticles();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeQuery = e.target.value;
      renderArticles();
    });
  }

  renderArticles();
});
