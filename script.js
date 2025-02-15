document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    const wordCountElement = document.getElementById("wordCount");
    const charCountElement = document.getElementById("charCount");
    const sprenCountElement = document.getElementById("sprenCount");
    const stormlightLevelElement = document.getElementById("stormlightLevel");
    const voidlightElement = document.getElementById("voidlight");
    const inspirationTextElement = document.getElementById("inspirationText");
    const progressElement = document.getElementById("progress");
    const notificationElement = document.getElementById("notification");
    const notificationTextElement = document.getElementById("notificationText");
    const analyticsPanel = document.getElementById("analyticsPanel");
    const settingsPanel = document.getElementById("settingsPanel");
    const oathAnimation = document.getElementById("oathAnimation");
    const nightbloodAnimation = document.getElementById("nightbloodAnimation");
    const developerMenu = document.getElementById("developerMenu");

    const quotes = [
        "The most important step a writer can take is the next one.",
        "Journey before destination.",
        "Life before death, strength before weakness.",
        "Sometimes the prize is not worth the cost.",
        "Trust is the most valuable currency.",
        "Strength does not make one capable of rule; it makes one capable of service.",
        "The purpose of a storyteller is not to tell you how to think, but to give you questions to think upon.",
        "If you cannot defeat an enemy, well... a knife in the back is always a good option.",
        "There are no men like me. There's only me.",
        "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.",
        // Add more quotes as needed
    ];

    const orders = [
        "Windrunner", "Skybreaker", "Dustbringer", "Edgedancer", "Truthwatcher",
        "Lightweaver", "Elsecaller", "Willshaper", "Stoneward", "Bondsmith"
    ];

    let sprenCount = 0;
    let bonds = {};
    let xp = {};
    let stormlight = 0;
    let voidlight = 0;
    let lastHourWordCount = [];
    let storyProgress = [];
    let nightbloodUnlocked = false;

    const updateStats = () => {
        const text = editor.value;
        const words = text.match(/\b(\w+)\b/g) || [];
        const chars = text.replace(/\s/g, '');
        const spren = text.match(/\b(spren)\b/g) || [];
        stormlight = Math.min((words.length / 1000) * 100, 100);
        voidlight = 100 - stormlight;

        wordCountElement.textContent = words.length;
        charCountElement.textContent = chars.length;
        sprenCountElement.textContent = spren.length;
        stormlightLevelElement.textContent = `${stormlight.toFixed(0)}%`;
        voidlightElement.textContent = `${voidlight.toFixed(0)}%`;
        progressElement.style.width = `${stormlight}%`;

        lastHourWordCount.push(words.length);
        if (lastHourWordCount.length > 60) {
            lastHourWordCount.shift();
        }

        if (Math.random() < spren.length / 100) {
            sprenCount++;
            sprenCountElement.textContent = sprenCount;
            if (sprenCount > 100 && Math.random() < 0.01) {
                showNotification("You have become a Fused!");
                // Handle becoming a Fused
            }
        }

        if (sprenCount >= 100 && Math.random() < 0.005) {
            const newOrder = orders[Math.floor(Math.random() * orders.length)];
            if (!bonds[newOrder]) {
                bonds[newOrder] = 1;
                showNotification(`You have bonded with the ${newOrder}!`);
            }
        }
    };

    const showNotification = (message) => {
        notificationTextElement.textContent = message;
        notificationElement.classList.remove("hidden");
        setTimeout(() => {
            notificationElement.classList.add("hidden");
        }, 3000);
    };

    const playAnimation = (animationType, order) => {
        const animation = animationType === "oath" ? oathAnimation : nightbloodAnimation;
        const glyph = document.createElement("img");
        glyph.src = `assets/animations/${order.toLowerCase()}-glyph.png`;
        const text = document.createElement("p");
        text.textContent = `${order} - ${bonds[order]} Ideal`;
        animation.appendChild(glyph);
        animation.appendChild(text);
        animation.classList.remove("hidden");
        setTimeout(() => {
            animation.classList.add("hidden");
            animation.innerHTML = ""; // Clear the animation content
        }, 5000);
    };

    const exportData = () => {
        const data = {
            sprenCount,
            bonds,
            xp,
            stormlight,
            voidlight,
            lastHourWordCount
        };
        const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cosmere-editor.shard";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showNotification("Data exported as .shard");
    };

    const importData = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            sprenCount = data.sprenCount;
            bonds = data.bonds;
            xp = data.xp;
            stormlight = data.stormlight;
            voidlight = data.voidlight;
            lastHourWordCount = data.lastHourWordCount;
            updateStats();
            showNotification("Data imported from .shard");
        };
        reader.readAsText(file);
    };

    document.getElementById("themeToggle").addEventListener("click", () => {
        document.body.classList.toggle("nightblood-mode");
        showNotification("Theme toggled.");
    });

    document.getElementById("downloadBtn").addEventListener("click", () => {
        const blob = new Blob([editor.value], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cosmere-editor.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showNotification("File downloaded.");
    });

    document.getElementById("importBtn").addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.addEventListener("change", (event) => {
            const file = event.target.files[0];
            importData(file);
        });
        input.click();
    });

    document.getElementById("inspireBtn").addEventListener("click", () => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        inspirationTextElement.textContent = randomQuote;
        showNotification("Inspiration summoned.");
    });

    document.getElementById("notifyBtn").addEventListener("click", () => {
        showNotification("You have received a vision.");
    });

    document.getElementById("analyticsBtn").addEventListener("click", () => {
        analyticsPanel.classList.toggle("hidden");
    });

    document.getElementById("settingsBtn").addEventListener("click", () => {
        settingsPanel.classList.toggle("hidden");
    });

    document.getElementById("fullscreenBtn").addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    });

    document.getElementById("nightbloodModeBtn").addEventListener("click", () => {
        if (nightbloodUnlocked) {
            nightbloodAnimation.classList.toggle("hidden");
        } else {
            showNotification("You haven't unlocked Nightblood mode yet.");
        }
    });

    document.getElementById("closeAnalyticsBtn").addEventListener("click", () => {
        analyticsPanel.classList.add("hidden");
    });

    document.getElementById("closeSettingsBtn").addEventListener("click", () => {
        settingsPanel.classList.add("hidden");
    });

    document.getElementById("developerMenuBtn").addEventListener("click", () => {
        developerMenu.classList.toggle("hidden");
    });

    // Developer Menu Functions
    document.getElementById("devAddSprenBtn").addEventListener("click", () => {
        sprenCount += 10;
        updateStats();
        showNotification("Added 10 spren (Developer Tool).");
    });

    document.getElementById("devUnlockNightbloodBtn").addEventListener("click", () => {
        nightbloodUnlocked = true;
        showNotification("Nightblood mode unlocked (Developer Tool).");
    });

    document.getElementById("devResetProgressBtn").addEventListener("click", () => {
        sprenCount = 0;
        bonds = {};
        xp = {};
        stormlight = 0;
        voidlight = 0;
        lastHourWordCount = [];
        storyProgress = [];
        nightbloodUnlocked = false;
        updateStats();
        showNotification("Progress reset (Developer Tool).");
    });

    editor.addEventListener("input", updateStats);

    // Initial stats update
    updateStats();
});