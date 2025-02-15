(() => {
    // DOM Elements
    const editor = document.getElementById('editor');
    const themeToggle = document.getElementById('themeToggle');
    const downloadBtn = document.getElementById('downloadBtn');
    const importBtn = document.getElementById('importBtn');
    const inspireBtn = document.getElementById('inspireBtn');
    const notifyBtn = document.getElementById('notifyBtn');
    const encyclopediaBtn = document.getElementById('encyclopediaBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const nightbloodModeBtn = document.getElementById('nightbloodModeBtn');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const closeEncyclopediaBtn = document.getElementById('closeEncyclopediaBtn');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const sprenCount = document.getElementById('sprenCount');
    const stormlightLevel = document.getElementById('stormlightLevel');
    const inspirationText = document.getElementById('inspirationText');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const progress = document.getElementById('progress');
    const settingsPanel = document.getElementById('settingsPanel');
    const encyclopediaPanel = document.getElementById('encyclopediaPanel');
    const shardbladeAnimation = document.getElementById('shardbladeAnimation');
    const nightbloodOverlay = document.getElementById('nightbloodOverlay');
    const autoSaveToggle = document.getElementById('autoSaveToggle');
    const notificationToggle = document.getElementById('notificationToggle');
    const stormlightModeToggle = document.getElementById('stormlightModeToggle');
    const orderSelect = document.getElementById('orderSelect');
    const root = document.documentElement;
  
    // Sanderson Quotes
    const quotes = [
      "The most important step a writer can take is the next one.",
      "Honor is dead. But I'll see what I can do.",
      "Accept the pain, but don't accept that you deserved it.",
      "Sometimes a hypocrite is just a man in the process of changing.",
      "You will be warm again.",
      "The purpose of a storyteller is not to tell you how to think, but to give you questions to think upon.",
      "Journey before destination.",
      "You cannot have my pain!",
      "The question is not whether you will love, hurt, dream, and die. It is what you will love, why you will hurt, when you will dream, and how you will die.",
      "The trick to happiness wasn’t in freezing every momentary pleasure and clinging to each one, but in ensuring one’s life would produce many future moments to anticipate."
    ];
  
    // Notification Messages
    const notifications = [
      "You’re doing great, Radiant!",
      "The Stormfather is watching.",
      "Keep going, you’re forging a Shardblade!",
      "Your words are infused with Stormlight.",
      "The spren are gathering around your work.",
      "You’re one step closer to becoming a Windrunner.",
      "The next chapter awaits, Radiant.",
      "Your story is a beacon of hope.",
      "The Cosmere is proud of your progress.",
      "Your words are changing the world."
    ];
  
    // State Management
    let isTyping = false;
    const DEBOUNCE_TIME = 1000;
    let timeoutId;
    let notificationTimeout;
    let stormlightMode = false;
    let nightbloodMode = false;
  
    // Performance Optimized Handlers
    const saveState = () => {
      localStorage.setItem('editorState', editor.value);
      localStorage.setItem('theme', root.dataset.theme);
      localStorage.setItem('autoSave', autoSaveToggle.checked);
      localStorage.setItem('notifications', notificationToggle.checked);
      localStorage.setItem('stormlightMode', stormlightModeToggle.checked);
      localStorage.setItem('order', orderSelect.value);
      localStorage.setItem('nightbloodMode', nightbloodMode);
    };
  
    const updateMetrics = () => {
      const text = editor.value;
      const words = text.trim().split(/\s+/).length || 0;
      const chars = text.length;
  
      charCount.textContent = chars;
      wordCount.textContent = words;
      sprenCount.textContent = Math.floor(Math.random() * 100); // Random spren count for fun!
  
      // Update Stormlight Level
      const stormlight = Math.min(100, Math.floor((words / 1000) * 100)); // 1000 words = 100% Stormlight
      stormlightLevel.textContent = `${stormlight}%`;
  
      // Update Progress Bar
      progress.style.width = `${stormlight}%`;
  
      // Trigger notifications every 100 words
      if (notificationToggle.checked && words > 0 && words % 100 === 0) {
        triggerRandomNotification();
      }
    };
  
    const autoSave = () => {
      if (!isTyping || !autoSaveToggle.checked) return;
      saveState();
      isTyping = false;
    };
  
    const inspire = () => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      inspirationText.textContent = quote;
    };
  
    const showNotification = (message) => {
      if (!notificationToggle.checked) return;
      notificationText.textContent = message;
      notification.classList.remove('hidden');
      notification.classList.add('visible');
  
      clearTimeout(notificationTimeout);
      notificationTimeout = setTimeout(() => {
        notification.classList.remove('visible');
        notification.classList.add('hidden');
      }, 3000); // Hide after 3 seconds
    };
  
    const triggerRandomNotification = () => {
      const message = notifications[Math.floor(Math.random() * notifications.length)];
      showNotification(message);
    };
  
    const toggleStormlightMode = () => {
      stormlightMode = stormlightModeToggle.checked;
      if (stormlightMode) {
        document.body.classList.add('stormlight-mode');
        showNotification("Stormlight Mode Activated!");
      } else {
        document.body.classList.remove('stormlight-mode');
        showNotification("Stormlight Mode Deactivated.");
      }
    };
  
    const toggleNightbloodMode = () => {
      nightbloodMode = !nightbloodMode;
      if (nightbloodMode) {
        nightbloodOverlay.classList.add('visible');
        showNotification("Nightblood Mode Activated. Destroy Evil.");
      } else {
        nightbloodOverlay.classList.remove('visible');
        showNotification("Nightblood Mode Deactivated.");
      }
      saveState();
    };
  
    const changeOrderTheme = () => {
      const order = orderSelect.value;
      root.dataset.order = order;
      saveState();
      showNotification(`You are now a ${order.charAt(0).toUpperCase() + order.slice(1)}!`);
    };
  
    const forgeShardblade = () => {
      shardbladeAnimation.classList.add('visible');
      setTimeout(() => {
        shardbladeAnimation.classList.remove('visible');
      }, 2000); // Animation lasts 2 seconds
    };
  
    const downloadShardFile = () => {
      forgeShardblade();
      setTimeout(() => {
        const text = editor.value;
        const words = text.trim().split(/\s+/).length || 0;
        const timestamp = new Date().toISOString();
        const order = orderSelect.value;
  
        // Create a custom header for the .shard file
        const header = `Cosmere Codex Shard File\nOrder: ${order}\nWords: ${words}\nTimestamp: ${timestamp}\n\n`;
        const content = header + text;
  
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cosmere-codex-${Date.now()}.shard`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
  
        showNotification("Your Shard has been forged!");
      }, 2000); // Wait for the animation to finish
    };
  
    const importShardFile = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        editor.value = content.split('\n').slice(4).join('\n'); // Skip the header
        updateMetrics();
        showNotification("Shard file imported successfully!");
      };
      reader.readAsText(file);
    };
  
    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    };
  
    // Event Listeners
    editor.addEventListener('input', () => {
      isTyping = true;
      cancelAnimationFrame(timeoutId);
      timeoutId = requestAnimationFrame(() => {
        updateMetrics();
        timeoutId = setTimeout(autoSave, DEBOUNCE_TIME);
      });
    });
  
    themeToggle.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      saveState();
    });
  
    downloadBtn.addEventListener('click', downloadShardFile);
  
    importBtn.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.name.endsWith('.shard')) {
        importShardFile(file);
      } else {
        showNotification("Invalid file type. Please upload a .shard file.");
      }
    });
  
    inspireBtn.addEventListener('click', inspire);
  
    notifyBtn.addEventListener('click', triggerRandomNotification);
  
    encyclopediaBtn.addEventListener('click', () => {
      encyclopediaPanel.classList.add('visible');
    });
  
    closeEncyclopediaBtn.addEventListener('click', () => {
      encyclopediaPanel.classList.remove('visible');
    });
  
    settingsBtn.addEventListener('click', () => {
      settingsPanel.classList.add('visible');
    });
  
    closeSettingsBtn.addEventListener('click', () => {
      settingsPanel.classList.remove('visible');
    });
  
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  
    nightbloodModeBtn.addEventListener('click', toggleNightbloodMode);
  
    autoSaveToggle.addEventListener('change', saveState);
    notificationToggle.addEventListener('change', saveState);
    stormlightModeToggle.addEventListener('change', () => {
      toggleStormlightMode();
      saveState();
    });
  
    orderSelect.addEventListener('change', () => {
      changeOrderTheme();
    });
  
    // Initialize
    window.addEventListener('load', () => {
      editor.value = localStorage.getItem('editorState') || '';
      root.dataset.theme = localStorage.getItem('theme') || 'light';
      autoSaveToggle.checked = localStorage.getItem('autoSave') !== 'false';
      notificationToggle.checked = localStorage.getItem('notifications') !== 'false';
      stormlightModeToggle.checked = localStorage.getItem('stormlightMode') === 'true';
      nightbloodMode = localStorage.getItem('nightbloodMode') === 'true';
      orderSelect.value = localStorage.getItem('order') || 'windrunner';
      changeOrderTheme();
      toggleStormlightMode();
      if (nightbloodMode) toggleNightbloodMode();
  
      updateMetrics();
      inspire(); // Show a quote on load
  
      // ChromeOS-specific optimizations
      if (navigator.userAgent.includes('CrOS')) {
        editor.style.fontSize = '1.2rem';
        document.body.style.alignItems = 'center';
      }
  
      // Trigger a welcome notification
      showNotification("Welcome, Radiant. The Cosmere awaits your words.");
    });
  
    // Prevent jank on window resize
    window.addEventListener('resize', () => {
      cancelAnimationFrame(timeoutId);
    });
  })();