/* ==========================================================================
   DYNAMIC BLOG DETAILS ARTICLE CONTROLLER
   Reads URL query parameter (?id=...) and renders full rich blog article,
   sidebar categories, author card, and related reads.
   ========================================================================== */

const BLOG_ARTICLES_DATA = {
  'why-kids-should-learn-python': {
    title: 'Why Learning Python at Age 11 Gives Kids an Unfair Advantage',
    category: 'Python & Dev',
    badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    date: 'August 24, 2026',
    readTime: '5 min read',
    author: 'Elena Rostova',
    authorRole: 'Senior Python & AI Specialist',
    authorBio: 'Elena is a former software architect with 8+ years experience making algebraic algorithms fun and approachable for middle schoolers.',
    image: '../assets/img3.jpg',
    content: `
      <p class="lead text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-6">
        When parents ask what programming language offers the highest long-term leverage for middle schoolers, the unanimous answer among tech educators and university researchers is Python.
      </p>
      
      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Human-Readable English-Like Syntax</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        Unlike languages burdened with excessive brackets and boilerplate (such as C++ or Java), Python reads almost like concise English. A child writing <code class="bg-slate-100 dark:bg-slate-800 text-orange-600 px-2 py-0.5 rounded font-mono text-sm">if player_score > 100: print("Winner!")</code> immediately understands the semantic relationship between conditional triggers and execution flow.
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Immediate Visual Gratification through Pygame and Turtle</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        Coding should never feel like dry arithmetic. With Python's built-in Turtle module and Pygame 2D libraries, young developers see their lines of code instantly morph into colorful geometric animations, physics bouncing balls, and playable asteroid-dodging arcade games.
      </p>

      <blockquote class="p-6 my-8 rounded-2xl bg-amber-50 dark:bg-slate-800/80 border-l-4 border-amber-500 text-amber-900 dark:text-amber-200 italic font-subheading text-xl">
        "Teaching a child Python isn't just about preparing them for software jobs—it trains systematic problem decomposition, persistence through debugging, and logical confidence."
      </blockquote>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Direct Bridge to Artificial Intelligence & Data Science</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        From OpenAI and NASA to Pixar and YouTube, Python powers the world's most innovative systems. By learning Python fundamentals at age 11 to 14, children build a lifelong foundation for machine learning, web backends, and scientific computing.
      </p>
    `,
    relatedPosts: [
      { id: 'scratch-vs-roblox-coding', title: 'Scratch 3.0 vs. Roblox Studio: Which Should Your Child Start With?' },
      { id: 'ai-ethics-for-middle-school', title: 'Teaching AI Literacy & Machine Learning Ethics to Young Minds' }
    ]
  },

  'scratch-vs-roblox-coding': {
    title: 'Scratch 3.0 vs. Roblox Studio: Which Should Your Child Start With?',
    category: 'Scratch Coding',
    badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    date: 'August 18, 2026',
    readTime: '6 min read',
    author: 'Sarah Jenkins',
    authorRole: 'Lead Game Dev Coach',
    authorBio: 'Sarah has guided over 2,000 children in building original 2D platformers and arcade mechanics.',
    image: '../assets/img7.jpg',
    content: `
      <p class="lead text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-6">
        Both Scratch and Roblox have sparked an unprecedented revolution in youth game development. But as a parent, how do you decide which platform is the optimal starting point for your child's age and experience level?
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">The Case for Scratch 3.0 (Best for Ages 6–10)</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        Created by MIT Media Lab, Scratch removes frustrating syntax errors (such as missing semicolons or typos) by utilizing color-coded snap-together logic blocks. Kids focus 100% on computational thinking, event loops, variables, and physics collisions without getting bogged down by typing speed.
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">When to Transition to Roblox Studio & Lua (Ages 10+)</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        Roblox Studio introduces 3D spatial coordinate math (X, Y, Z), complex lighting physics, and the Lua scripting language. If your child already has a strong grasp of variables, conditional branches, and basic typing, Roblox provides an exciting playground for multiplayer game publishing.
      </p>

      <blockquote class="p-6 my-8 rounded-2xl bg-orange-50 dark:bg-slate-800/80 border-l-4 border-orange-500 text-orange-900 dark:text-orange-200 italic font-subheading text-xl">
        "Scratch builds the foundational logic architecture; Roblox and Python empower students to turn that architecture into advanced, distributable digital worlds."
      </blockquote>
    `,
    relatedPosts: [
      { id: 'why-kids-should-learn-python', title: 'Why Learning Python at Age 11 Gives Kids an Unfair Advantage' },
      { id: 'screen-time-to-create-time', title: 'From Screen Consumers to Game Creators: A Parent’s Guide' }
    ]
  },

  'robotics-screen-free-stem': {
    title: 'Hands-On Robotics: How Micro:bit Connects Code to the Physical World',
    category: 'Robotics & Hardware',
    badgeColor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    date: 'August 12, 2026',
    readTime: '4 min read',
    author: 'David Alvarez',
    authorRole: 'Head of Robotics & IoT',
    authorBio: 'David is a Mechatronics Engineer passionate about inspiring hands-on tactile maker mindsets.',
    image: '../assets/img5.jpg',
    content: `
      <p class="lead text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-6">
        In an era saturated with virtual screens, physical computing bridges the critical gap between digital abstractions and the real physical world.
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Sensors, Motors and Real Physical Feedback</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        When a child writes code that tells an ultrasonic sensor to measure distances and turn a robotic rover wheel before it crashes into a chair, the concept of an "If-Else" condition becomes immediately tangible and memorable.
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">De-mystifying Hardware and Everyday Technology</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        By wiring LED matrices, moisture sensors, and servo motors to the BBC Micro:bit microcontroller, children stop viewing gadgets as magical black boxes and begin viewing them as engineered systems they can build, hack, and improve.
      </p>

      <blockquote class="p-6 my-8 rounded-2xl bg-cyan-50 dark:bg-slate-800/80 border-l-4 border-cyan-500 text-cyan-900 dark:text-cyan-200 italic font-subheading text-xl">
        "Tactile maker projects turn passive consumers of technology into active mechanical innovators who understand how the physical world operates."
      </blockquote>
    `,
    relatedPosts: [
      { id: 'why-kids-should-learn-python', title: 'Why Learning Python at Age 11 Gives Kids an Unfair Advantage' },
      { id: 'ai-ethics-for-middle-school', title: 'Teaching AI Literacy & Machine Learning Ethics to Young Minds' }
    ]
  },

  'ai-ethics-for-middle-school': {
    title: 'Teaching AI Literacy & Machine Learning Ethics to Young Minds',
    category: 'AI & Ethics',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    date: 'August 05, 2026',
    readTime: '5 min read',
    author: 'Elena Rostova',
    authorRole: 'Senior Python & AI Specialist',
    authorBio: 'Elena is a former software architect with 8+ years experience making algebraic algorithms fun and approachable for middle schoolers.',
    image: '../assets/img9.jpg',
    content: `
      <p class="lead text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-6">
        Artificial Intelligence is rapidly reshaping creativity, education, and software development. Teaching kids how AI models actually learn is essential for raising responsible digital citizens.
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Training Data: How Machines Learn Patterns</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        Through interactive browser-based sandboxes, students train computer vision models by collecting hundreds of webcam images of hand gestures or doodles. When they see how image variation improves classification accuracy, the concept of supervised learning becomes crystal clear.
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Exploring Algorithmic Bias & Fairness</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        If a model is only shown pictures of green apples, it will fail to recognize red apples. By experimenting with biased training datasets, children intuitively understand why diverse data and human oversight are vital in real-world artificial intelligence.
      </p>

      <blockquote class="p-6 my-8 rounded-2xl bg-purple-50 dark:bg-slate-800/80 border-l-4 border-purple-500 text-purple-900 dark:text-purple-200 italic font-subheading text-xl">
        "Our goal is not merely to teach children how to prompt AI, but to teach them how AI is engineered, where its limitations lie, and how to govern it with ethical discernment."
      </blockquote>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Creative Collaboration: AI as an Assistant</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        We teach students to use generative tools as brainstorming co-pilots for game storylines, sound effects, and character lore, while keeping core algorithmic logic, game rules, and creative direction entirely in their own hands.
      </p>
    `,
    relatedPosts: [
      { id: 'why-kids-should-learn-python', title: 'Why Learning Python at Age 11 Gives Kids an Unfair Advantage' },
      { id: 'screen-time-to-create-time', title: 'From Screen Consumers to Game Creators: A Parent’s Guide' }
    ]
  },

  'screen-time-to-create-time': {
    title: 'From Screen Consumers to Game Creators: A Parent’s Guide',
    category: 'Parenting STEM',
    badgeColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    date: 'July 29, 2026',
    readTime: '4 min read',
    author: 'Sarah Jenkins',
    authorRole: 'Lead Game Dev Coach',
    authorBio: 'Sarah has guided over 2,000 children in building original 2D platformers and arcade mechanics.',
    image: '../assets/img8.jpg',
    content: `
      <p class="lead text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-6">
        Nearly every parent faces the challenge of managing recreational screen time. But the key isn't merely restricting devices—it is shifting screen time from passive consumption into active, joyful creation.
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Passive Consumption vs. Active Creation</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        Binge-watching short videos or mindlessly scrolling provides quick dopamine hits without engaging deep cognitive circuits. In contrast, designing a game level, composing digital chiptune music, or coding an enemy AI patrol loop requires planning, debugging resilience, and spatial logic.
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Three Actionable Steps for Families</h2>
      <ul class="space-y-3 text-slate-600 dark:text-slate-300 list-disc list-inside mb-6">
        <li><strong>Adopt the "Make Before You Play" Rule:</strong> Encourage your child to add one new feature or sprite animation to their Scratch project before playing outside games.</li>
        <li><strong>Ask Designer Questions:</strong> When your child plays a video game, ask: <em>"How do you think the game calculates the score multiplier?"</em> or <em>"What happens if the player hits this obstacle?"</em></li>
        <li><strong>Celebrate Finished Projects:</strong> Host a monthly family "Arcade Night" where everyone plays and tests the games built by your young coder.</li>
      </ul>

      <blockquote class="p-6 my-8 rounded-2xl bg-pink-50 dark:bg-slate-800/80 border-l-4 border-pink-500 text-pink-900 dark:text-pink-200 italic font-subheading text-xl">
        "When kids realize that games are simply interactive stories written in code, they stop being addicted players and start seeing themselves as architects of their own ideas."
      </blockquote>
    `,
    relatedPosts: [
      { id: 'scratch-vs-roblox-coding', title: 'Scratch 3.0 vs. Roblox Studio: Which Should Your Child Start With?' },
      { id: 'early-stem-kindergarten-logic', title: 'How Early Should Kids Start? Cognitive Benefits of Coding at Age 6' }
    ]
  },

  'early-stem-kindergarten-logic': {
    title: 'How Early Should Kids Start? Cognitive Benefits of Coding at Age 6',
    category: 'Scratch Jr',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    date: 'July 21, 2026',
    readTime: '3 min read',
    author: 'Aria Chen',
    authorRole: 'Early Tech Education M.Ed',
    authorBio: 'Aria specializes in early-childhood developmental psychology and playful STEM learning frameworks.',
    image: '../assets/img2.jpg',
    content: `
      <p class="lead text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-6">
        Is age 6 too early for a child to learn programming? Developmental psychologists and cognitive science researchers confirm that early coding develops the foundational neural circuits for reading comprehension, sequencing, and spatial memory.
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Sequencing and Executive Function</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        In early childhood, grasping cause-and-effect sequences (e.g., <em>"First brush teeth, then put on shoes"</em>) is a major developmental milestone. With block coding platforms like Scratch Jr, kids arrange visual icon blocks from left to right to make a character jump, spin, and sing, reinforcing temporal sequencing naturally.
      </p>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Emotional Resilience and Debugging Mindset</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        In traditional school settings, making a mistake often carries red marks or negative feelings. In coding, bugs are expected and normal. Children learn to calmly test hypotheses: <em>"Why did the puppy sprite stop moving? Let's check block number three!"</em>
      </p>

      <blockquote class="p-6 my-8 rounded-2xl bg-amber-50 dark:bg-slate-800/80 border-l-4 border-amber-500 text-amber-900 dark:text-amber-200 italic font-subheading text-xl">
        "Early coding is not about vocational training—it is about nurturing playful curiosity, narrative storytelling, and the confidence to solve open-ended puzzles."
      </blockquote>

      <h2 class="font-heading text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Multimodal Storytelling & Creative Expression</h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        Young children draw their own characters, record their own voices for dialogues, and animate digital storybooks. Coding becomes a vibrant digital canvas that synthesizes art, music, language, and math.
      </p>
    `,
    relatedPosts: [
      { id: 'screen-time-to-create-time', title: 'From Screen Consumers to Game Creators: A Parent’s Guide' },
      { id: 'scratch-vs-roblox-coding', title: 'Scratch 3.0 vs. Roblox Studio: Which Should Your Child Start With?' }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('dynamicBlogArticleContent');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id') || 'why-kids-should-learn-python';
  const data = BLOG_ARTICLES_DATA[articleId] || BLOG_ARTICLES_DATA['why-kids-should-learn-python'];

  document.title = `${data.title} | CodeJam Academy STEM Blog`;

  container.innerHTML = `
    <!-- Article Header -->
    <header class="py-14 md:py-16 bg-orange-50/40 dark:bg-slate-800/40 border-b border-orange-500/10 flex items-center min-h-[340px]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-7 text-center lg:text-left space-y-4">
            <a href="blog.html" class="inline-flex items-center justify-center lg:justify-start gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700">
              <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to All Articles
            </a>
            <div class="inline-block px-3 py-1 rounded-full text-xs font-bold ${data.badgeColor}">
              ${data.category}
            </div>
            <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              ${data.title}
            </h1>
            <div class="flex items-center justify-center lg:justify-start flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-500">
              <span class="font-semibold text-slate-700 dark:text-slate-300">By ${data.author} (${data.authorRole})</span>
              <span>•</span>
              <span>${data.date}</span>
              <span>•</span>
              <span>${data.readTime}</span>
            </div>
          </div>
          <div class="lg:col-span-5 hidden lg:flex justify-center">
            <div class="relative">
              <div class="absolute -top-8 -left-10 w-36 h-36 bg-cyan-200/60 dark:bg-cyan-500/20 rounded-full -z-10"></div>
              <svg class="absolute -top-4 -right-8 w-10 h-10 text-amber-400 rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M15 25 C5 15 5 5 15 15 C25 25 35 25 40 15 C45 5 35 5 30 15 C20 35 10 45 25 35" stroke-linecap="round"/>
              </svg>
              <img src="${data.image}" alt="${data.title}" class="w-72 h-80 object-cover rounded-t-[140px] rounded-b-[44px] border-4 border-white dark:border-slate-700 shadow-2xl">
              <span class="absolute -bottom-5 -left-5 w-24 h-24 bg-amber-300/50 dark:bg-amber-500/20 rounded-3xl rotate-12 -z-10"></span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content & Sidebar -->
    <div class="py-12 bg-white dark:bg-slate-900 transition-colors">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Article Body -->
        <div class="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          ${data.content}
        </div>

        <!-- Author Bio Card -->
        <div class="my-12 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-heading text-2xl font-bold flex-shrink-0 shadow-md">
            ${data.author.charAt(0)}
          </div>
          <div class="space-y-1 text-center sm:text-left">
            <h4 class="font-heading text-xl font-bold text-slate-900 dark:text-white">${data.author}</h4>
            <div class="text-xs font-bold text-orange-600 dark:text-orange-400">${data.authorRole}</div>
            <p class="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1">${data.authorBio}</p>
          </div>
        </div>

        <!-- Related Reads -->
        <div class="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <h3 class="font-heading text-2xl font-bold text-slate-900 dark:text-white">Related Reading</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${data.relatedPosts.map(rp => `
              <a href="blog-details.html?id=${rp.id}" class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition block">
                <div class="text-xs font-bold text-orange-600 dark:text-orange-400 mb-1">Recommended Article</div>
                <div class="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">${rp.title}</div>
              </a>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
