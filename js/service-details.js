/* ==========================================================================
   DYNAMIC SERVICE DETAILS CONTROLLER
   Reads ?id= from query params and renders full curriculum syllabus,
   prerequisites, outcomes, pricing, and FAQ.
   ========================================================================== */

const COURSES_DATA = {
  'scratch-jr': {
    title: 'Scratch Jr & Creative Logic',
    ageRange: 'Ages 6 to 8',
    level: 'Beginner (No reading or typing needed)',
    tagline: 'Turn stories, cartoons, and fairy tales into interactive animations.',
    heroBg: 'bg-[#FFA7BA]/20 dark:bg-rose-950/40',
    badgeColor: 'bg-[#FFA7BA] text-rose-950',
    accentColor: 'text-[#EE5928]',
    buttonColor: 'btn-meelo-orange',
    heroImage: '../assets/img2.jpg',
    heroAlt: 'Young learner building Scratch Jr animations',
    priceMonthly: 89,
    priceAnnual: 67,
    overview: 'Scratch Jr introduces early childhood computational concepts without the obstacle of keyboard typing. Students drag visual command puzzle blocks to control animal sprites, animate space journeys, record funny character voices, and develop foundational sequencing instincts.',
    keySkills: ['Sequencing & Order of Operations', 'Directional & Spatial Math (X, Y)', 'Event Triggers & Start Flags', 'Creative Storytelling & Sound Design', 'Early Computational Mindset'],
    curriculum: [
      { week: 'Week 1', title: 'Meet Your Sprite & First Animation', desc: 'Moving left, right, jumping, and triggering actions when tapped.' },
      { week: 'Week 2', title: 'Fairy Tale Stage & Sound Effects', desc: 'Creating multi-scene backdrops and recording custom voice acting.' },
      { week: 'Week 3', title: 'Repeating Loops & Dance Parties', desc: 'Making characters repeat sequences and dance to background beats.' },
      { week: 'Week 4', title: 'Speed & Size Transformations', desc: 'Controlling speed clocks and growing/shrinking magical objects.' },
      { week: 'Week 5', title: 'Collision Physics: The Frog Pond', desc: 'Triggering actions when one sprite bumps into another.' },
      { week: 'Week 6', title: 'Interactive Storybook Project (Part 1)', desc: 'Designing multi-page branching interactive stories.' },
      { week: 'Week 7', title: 'Interactive Storybook Project (Part 2)', desc: 'Polishing animations, transitions, and character conversations.' },
      { week: 'Week 8', title: 'Graduation & Live Parent Showcase', desc: 'Presenting their storybook to the cohort and earning the Junior Storyteller Badge.' }
    ],
    faqs: [
      { q: 'Does my 6-year-old need to know how to read?', a: 'No reading or typing is required. Scratch Jr uses color-coded symbols and pictures.' },
      { q: 'Can my child use an iPad or tablet?', a: 'Yes! Scratch Jr runs natively on iPads, Android tablets, and Chromebooks.' }
    ]
  },

  'scratch-arcade': {
    title: 'Scratch 3.0 Arcade Game Dev',
    ageRange: 'Ages 8 to 10',
    level: 'Beginner to Intermediate',
    tagline: 'Design, code, and publish original 2D platformers and space shooters.',
    heroBg: 'bg-[#EE5928]/10 dark:bg-orange-950/40',
    badgeColor: 'bg-[#EE5928] text-white',
    accentColor: 'text-[#EE5928]',
    buttonColor: 'btn-meelo-orange',
    heroImage: '../assets/img1.jpg',
    heroAlt: 'Child coding an arcade game on a laptop',
    priceMonthly: 129,
    priceAnnual: 97,
    overview: 'Our most popular game development track! Children learn core computer science principles—variables, loops, conditional if-else branches, and broadcast messaging—while building real playable games inspired by Mario, Asteroids, and Flappy Bird.',
    keySkills: ['2D Velocity & Gravity Physics', 'Score & Health Variables', 'Clone Enemy Spawning Arrays', 'Broadcasting & Custom Logic Blocks', 'Game Publishing & Web Export'],
    curriculum: [
      { week: 'Week 1', title: 'Arcade Physics & Player Movement', desc: 'Smooth arrow-key controls and boundaries.' },
      { week: 'Week 2', title: 'Gravity, Jumping & Ground Collision', desc: 'Building realistic jump velocity physics and platform collisions.' },
      { week: 'Week 3', title: 'Score Variables & Collectibles', desc: 'Tracking coins, high scores, and bonus gems.' },
      { week: 'Week 4', title: 'Enemy AI & Cloning Arrays', desc: 'Spawning flying enemies using clone mechanics.' },
      { week: 'Week 5', title: 'Lives, Health Bars & Game Over Loops', desc: 'Broadcasting messages between title screens, gameplay, and game-over scenes.' },
      { week: 'Week 6', title: 'Boss Battles & Power-Ups', desc: 'Programming multi-stage boss attack patterns.' },
      { week: 'Week 7', title: 'Level Design & Sound Synthesis', desc: 'Creating multi-level adventures with background music.' },
      { week: 'Week 8', title: 'Publishing to CodeJam Arcade & Demo Day', desc: 'Publishing their web game for friends and family to play.' }
    ],
    faqs: [
      { q: 'Can students play their games at home after class?', a: 'Yes! All projects are stored on the cloud and shareable with a simple web link.' },
      { q: 'What is the maximum class size?', a: 'Every cohort is strictly capped at 4 students per coach.' }
    ]
  },

  'python-game-dev': {
    title: 'Python Game & App Builder',
    ageRange: 'Ages 11 to 14',
    level: 'Intermediate to Advanced',
    tagline: 'Transition to typed text code with Python 3, Pygame, and algorithmic thinking.',
    heroBg: 'bg-[#A6C96C]/20 dark:bg-emerald-950/40',
    badgeColor: 'bg-[#A6C96C] text-emerald-950',
    accentColor: 'text-emerald-600',
    buttonColor: 'btn-meelo-orange',
    heroImage: '../assets/img3.jpg',
    heroAlt: 'Teenager coding Python with headphones',
    priceMonthly: 129,
    priceAnnual: 97,
    overview: 'The definitive gateway from visual blocks to industrial programming. Middle schoolers learn Python 3 fundamentals (lists, dictionaries, functions, OOP, and loops) and apply them immediately to graphic Pygame arcade design, text RPGs, and math simulations.',
    keySkills: ['Clean Python 3 Syntax & Indentation', 'Pygame 2D Canvas & Vector Physics', 'Functions, Return Values & OOP', 'Data Structures (Lists, Dictionaries)', 'AP Computer Science Foundations'],
    curriculum: [
      { week: 'Week 1', title: 'Python Syntax & Interactive Terminal', desc: 'Variables, f-strings, data types, and console adventures.' },
      { week: 'Week 2', title: 'Conditionals & Text-Based RPG Game', desc: 'Branching dungeon quests with combat calculators.' },
      { week: 'Week 3', title: 'Loops, Lists & Inventory Systems', desc: 'Managing player backpacks and score histories.' },
      { week: 'Week 4', title: 'Introduction to Pygame 2D Engine', desc: 'Initializing windows, RGB colors, and animation frames.' },
      { week: 'Week 5', title: 'Player Sprites & Keyboard Controls', desc: 'Controlling 2D characters with smooth acceleration.' },
      { week: 'Week 6', title: 'Collision Physics & Particle Bursts', desc: 'Detecting rect collisions and triggering explosion particles.' },
      { week: 'Week 7', title: 'Game Architecture & Polish', desc: 'Adding sound effects, high score persistence, and splash screens.' },
      { week: 'Week 8', title: 'Capstone Tournament & Code Review', desc: 'Live presentation and peer code review.' }
    ],
    faqs: [
      { q: 'Is this suitable preparation for High School AP Computer Science?', a: 'Yes, our Python curriculum covers over 80% of AP CS Principles concepts.' }
    ]
  },

  'robotics-iot': {
    title: 'Robotics & Micro:bit Hardware Lab',
    ageRange: 'Ages 8 to 14',
    level: 'All Levels (Physical kit mailed home)',
    tagline: 'Build autonomous smart rovers and write code that interacts with the physical world.',
    heroBg: 'bg-[#8FD5DC]/20 dark:bg-cyan-950/40',
    badgeColor: 'bg-[#8FD5DC] text-cyan-950',
    accentColor: 'text-cyan-600',
    buttonColor: 'btn-meelo-orange',
    heroImage: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80',
    heroAlt: 'Micro:bit robotics hardware kit for the lab',
    priceMonthly: 169,
    priceAnnual: 127,
    overview: 'Connect software code to real-world hardware. Every student receives a Micro:bit v2 robotics kit mailed to their doorstep. Students program ultrasonic sonar obstacle detectors, motor speeds, LED matrices, and Bluetooth radio remotes.',
    keySkills: ['Physical Micro:bit v2 Circuits & Sensors', 'Ultrasonic Distance Math & Sonar', 'Motor Kinematics & Differential Steering', 'Radio Mesh Broadcasting', 'Hardware Debugging & Problem Solving'],
    curriculum: [
      { week: 'Week 1', title: 'Unboxing & First Micro:bit Program', desc: '5x5 LED animations, music synthesis, and accelerometer.' },
      { week: 'Week 2', title: 'Chassis Assembly & Motor Calibration', desc: 'Wiring dual DC motors and testing wheel velocity.' },
      { week: 'Week 3', title: 'Ultrasonic Sonar & Wall Detection', desc: 'Calculating sound wave echoes to detect obstacles.' },
      { week: 'Week 4', title: 'Autonomous Maze Navigation', desc: 'Writing decision algorithms so the rover navigates tight corners.' },
      { week: 'Week 5', title: 'Infrared Line-Following Racer', desc: 'Using photoresistors to guide rovers along black track lines.' },
      { week: 'Week 6', title: 'Bluetooth Remote Control via 2nd Board', desc: 'Transmitting tilt signals over 2.4GHz radio to steer the rover.' },
      { week: 'Week 7', title: 'Smart City Autonomous Rescue Mission', desc: 'Designing planetary rover challenge tasks.' },
      { week: 'Week 8', title: 'Robotics Hackathon & Showcase', desc: 'Streaming live robot trials to the cohort!' }
    ],
    faqs: [
      { q: 'Do we need to return the hardware kit?', a: 'No! The $120 Micro:bit kit is yours to keep permanently.' }
    ]
  },

  'ai-explorers': {
    title: 'AI & Machine Learning Explorers',
    ageRange: 'Ages 10 to 14',
    level: 'Intermediate',
    tagline: 'Train computer vision models and program intelligent chatbot agents.',
    heroBg: 'bg-purple-100/40 dark:bg-purple-950/40',
    badgeColor: 'bg-purple-500 text-white',
    accentColor: 'text-purple-600',
    buttonColor: 'btn-meelo-orange',
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    heroAlt: 'AI robot companion for the machine learning lab',
    priceMonthly: 149,
    priceAnnual: 112,
    overview: 'Demystify artificial intelligence for middle schoolers. Kids train neural networks using their webcams, build computer vision gesture controllers, program natural language chatbots, and discuss ethical AI usage.',
    keySkills: ['Computer Vision & Pose Tracking', 'Training Data & Bias Awareness', 'Natural Language Processing (NLP)', 'Ethical AI & Future Literacy'],
    curriculum: [
      { week: 'Week 1', title: 'What is AI? Training Your First Model', desc: 'Training image classification models using browser webcams.' },
      { week: 'Week 2', title: 'Pose Tracking & Motion Games', desc: 'Controlling game sprites with body movement and hand gestures.' },
      { week: 'Week 3', title: 'Audio Recognition & Voice Assistants', desc: 'Training sound models to build voice-activated smart lights.' },
      { week: 'Week 4', title: 'Natural Language Processing & Chatbots', desc: 'Understanding sentiment analysis and rule-based conversational AI.' },
      { week: 'Week 5', title: 'Bias, Ethics & Algorithmic Fairness', desc: 'Exploring how data bias happens and designing responsible AI.' },
      { week: 'Week 6', title: 'Generative AI & Creative Code', desc: 'Combining algorithmic art with AI synthesis.' },
      { week: 'Week 7', title: 'Capstone AI Assistant Project', desc: 'Building a custom smart assistant tool.' },
      { week: 'Week 8', title: 'AI Science Fair & Demos', desc: 'Presenting machine learning apps to families.' }
    ],
    faqs: [
      { q: 'Is this safe and age-appropriate?', a: '100% safe. All machine learning runs client-side in a private browser sandbox.' }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('dynamicServiceContent');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id') || 'scratch-arcade';
  const data = COURSES_DATA[courseId] || COURSES_DATA['scratch-arcade'];

  document.title = `${data.title} | CodeJam Kids Coding Academy`;

  container.innerHTML = `
    <!-- SECTION 1: HERO -->
    <section class="py-14 md:py-16 ${data.heroBg} border-b border-orange-500/10 flex items-center min-h-[340px]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-7 text-center lg:text-left space-y-4">
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span class="px-3.5 py-1 rounded-full text-xs font-bold ${data.badgeColor}">${data.ageRange}</span>
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">${data.level}</span>
            </div>
            <h1 class="font-heading text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              ${data.title}
            </h1>
            <p class="font-subheading text-lg sm:text-xl text-slate-700 dark:text-slate-200 italic">
              "${data.tagline}"
            </p>
            <div class="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <a href="booking.html?course=${courseId}" class="${data.buttonColor} px-8 py-3.5 rounded-full text-sm font-bold shadow-xl inline-flex items-center gap-2">
                <i data-lucide="sparkles" class="w-4 h-4"></i> Book & Enroll in Course
              </a>
              <a href="pricing.html" class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-3.5 rounded-full text-sm font-bold shadow-md hover:border-orange-500 transition">
                View Tuition Plans
              </a>
            </div>
          </div>
          <div class="lg:col-span-5 hidden lg:flex justify-center">
            <div class="relative">
              <div class="absolute -top-8 -left-10 w-36 h-36 bg-white/60 dark:bg-white/10 rounded-full -z-10"></div>
              <svg class="absolute -top-4 -right-8 w-10 h-10 text-amber-400 rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M15 25 C5 15 5 5 15 15 C25 25 35 25 40 15 C45 5 35 5 30 15 C20 35 10 45 25 35" stroke-linecap="round"/>
              </svg>
              <img src="${data.heroImage}" alt="${data.heroAlt}" class="w-72 h-80 object-cover rounded-t-[140px] rounded-b-[44px] border-4 border-white dark:border-slate-700 shadow-2xl">
              <span class="absolute -bottom-5 -left-5 w-24 h-24 bg-white/70 dark:bg-white/10 rounded-3xl rotate-12 -z-10"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: OVERVIEW & KEY SKILLS -->
    <section class="py-16 bg-white dark:bg-slate-900 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div class="lg:col-span-7 space-y-6">
            <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white">Program Overview</h2>
            <p class="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">${data.overview}</p>
            <div class="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 class="font-heading text-xl font-bold text-slate-900 dark:text-white">Key Learning Outcomes:</h3>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-700 dark:text-slate-200">
                ${data.keySkills.map(skill => `
                  <li class="flex items-center gap-2">
                    <i data-lucide="check-circle" class="w-4 h-4 text-green-500 flex-shrink-0"></i>
                    <span>${skill}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="p-8 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-2xl space-y-6">
              <div class="space-y-1">
                <span class="text-xs uppercase font-bold tracking-wider text-amber-950 bg-amber-300 px-3 py-1 rounded-full">Included Tuition</span>
                <div class="font-heading text-4xl font-bold mt-2">$${data.priceMonthly} <span class="text-xs font-normal">/ month</span></div>
                <div class="text-xs text-white/90">or $${data.priceAnnual}/mo when billed annually</div>
              </div>
              <ul class="text-xs space-y-2.5 text-white/95 border-t border-white/20 pt-4">
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4"></i> 1:4 Small Live Class Cohort</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4"></i> In-Browser Cloud Code IDE</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4"></i> Weekly Recorded Class Replays</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4"></i> 30-Day Money-Back Guarantee</li>
              </ul>
              <a href="booking.html?course=${courseId}" class="block w-full py-3.5 rounded-full bg-slate-900 text-white font-bold text-xs text-center hover:bg-white hover:text-slate-900 transition shadow-lg">
                Enroll in Track Now ➜
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: 8-WEEK SYLLABUS -->
    <section class="py-16 bg-[#FBF8F1] dark:bg-[#0F1322]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-100 dark:bg-orange-950/60 px-3 py-1 rounded-full">Scaffolded Roadmap</span>
          <h2 class="font-heading text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2">8-Week Module Roadmap</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${data.curriculum.map(item => `
            <div class="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-3">
              <span class="text-[11px] font-bold text-orange-600 dark:text-orange-400 font-mono">${item.week}</span>
              <h3 class="font-heading text-lg font-bold text-slate-900 dark:text-white">${item.title}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- SECTION 4: FAQS -->
    <section class="py-16 bg-white dark:bg-slate-900 transition-colors">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 class="font-heading text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">Course FAQs</h2>
        ${data.faqs.map(faq => `
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">${faq.q}</h3>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${faq.a}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- SECTION 5: OTHER TRACKS SWITCHER -->
    <section class="py-12 bg-[#FBF8F1] dark:bg-[#0F1322] border-t border-slate-200/60 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 class="font-heading text-2xl font-bold text-slate-900 dark:text-white">Explore Other Age Tracks</h3>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a href="service-details.html?id=scratch-jr" class="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:text-orange-500">Scratch Jr (Ages 6–8)</a>
          <a href="service-details.html?id=scratch-arcade" class="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:text-orange-500">Scratch Arcade (Ages 8–10)</a>
          <a href="service-details.html?id=python-game-dev" class="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:text-orange-500">Python Dev (Ages 11–14)</a>
          <a href="service-details.html?id=robotics-iot" class="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:text-orange-500">Robotics Lab (Ages 8–14)</a>
          <a href="service-details.html?id=ai-explorers" class="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:text-orange-500">AI Machine Learning (Ages 10–14)</a>
        </div>
      </div>
    </section>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
