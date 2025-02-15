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
    const developerMenu = document.getElementById("developerMenu");
    const oathAnimation = document.getElementById("oathAnimation");
    const nightbloodAnimation = document.getElementById("nightbloodAnimation");
    const sprenVisuals = document.getElementById("sprenVisuals");
    const achievementsPanel = document.getElementById("achievementsPanel");
    const writingPromptsPanel = document.getElementById("writingPromptsPanel");
    const progressTrackingPanel = document.getElementById("progressTrackingPanel");
    const tutorialPanel = document.getElementById("tutorialPanel");

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
    let achievements = [];
    let dailyGoal = 1000; // Daily writing goal in words
    let dailyProgress = 0;
    let currentOrder = "default";
    let currentIdeal = 0;

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

        // Anti-cheat mechanism
        if (words.length > 5000) {
            sprenCount = Math.max(sprenCount - 10, 0);
            showNotification("Cheating detected! Spren count reduced.");
        }

        // Spren collection based on average word count
        const averageWords = lastHourWordCount.reduce((a, b) => a + b, 0) / lastHourWordCount.length;
        if (Math.random() < averageWords / 1000) {
            sprenCount++;
            sprenCountElement.textContent = sprenCount;
            updateSprenVisuals();
            showNotification("Spren collected!");

            if (sprenCount > 100 && Math.random() < 0.01) {
                showNotification("You have become a Fused!");
                // Handle becoming a Fused
            }
        }

        // Bonding with orders
        if (currentOrder === "default" && sprenCount >= 100 && Math.random() < 0.005) {
            const newOrder = orders[Math.floor(Math.random() * orders.length)];
            if (!bonds[newOrder]) {
                bonds[newOrder] = 1;
                showNotification(`You have bonded with the ${newOrder}!`);
                unlockTheme(newOrder);
            }
        }

        // Daily goal progress
        dailyProgress = words.length;
        if (dailyProgress >= dailyGoal) {
            if (!achievements.includes("Daily Goal Achieved")) {
                achievements.push("Daily Goal Achieved");
                showNotification("Daily goal achieved!");
                updateAchievements();
            }
        }

        // XP and Ideals
        if (currentOrder !== "default" && Math.random() < 0.01) {
            xp[currentOrder] = (xp[currentOrder] || 0) + 10;
            if (xp[currentOrder] >= 100) {
                xp[currentOrder] = 0;
                currentIdeal++;
                showNotification(`You have reached the ${currentIdeal} Ideal of the ${currentOrder}!`);
                playAnimation("oath", currentOrder);
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
            lastHourWordCount,
            storyProgress,
            achievements,
            dailyProgress,
            currentOrder,
            currentIdeal
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
            storyProgress = data.storyProgress;
            achievements = data.achievements;
            dailyProgress = data.dailyProgress;
            currentOrder = data.currentOrder;
            currentIdeal = data.currentIdeal;
            updateStats();
            updateSprenVisuals();
            updateAchievements();
            showNotification("Data imported from .shard");
        };
        reader.readAsText(file);
    };

    const updateSprenVisuals = () => {
        const sprenImages = [
            "assets/spren/spren1.png",
            "assets/spren/spren2.png",
            "assets/spren/spren3.png",
            // Add more spren images as needed
        ];

        sprenVisuals.innerHTML = "";
        for (let i = 0; i < sprenCount; i++) {
            const img = document.createElement("img");
            img.src = sprenImages[i % sprenImages.length];
            sprenVisuals.appendChild(img);
        }
    };

    const updateAchievements = () => {
        const achievementElements = {
            "First 100 Words": document.getElementById("achievement1"),
            "Daily Goal Achieved": document.getElementById("achievement2"),
            "First Spren Collected": document.getElementById("achievement3"),
            "Bond with an Order": document.getElementById("achievement4"),
            "Unlock Nightblood Mode": document.getElementById("achievement5"),
            "Write for 7 Days Straight": document.getElementById("achievement6"),
            "Complete 10 Writing Prompts": document.getElementById("achievement7"),
            "Reach 10,000 Words": document.getElementById("achievement8"),
            "Reach 50,000 Words": document.getElementById("achievement9"),
            "Reach 100,000 Words": document.getElementById("achievement10")
        };

        achievements.forEach(achievement => {
            if (achievementElements[achievement]) {
                achievementElements[achievement].classList.add("achieved");
            }
        });
    };

    const unlockTheme = (order) => {
        const themeSelector = document.getElementById("themeSelector");
        const option = document.createElement("option");
        option.value = order.toLowerCase();
        option.textContent = order;
        themeSelector.appendChild(option);
    };

    const loadTutorial = () => {
        const tutorialSteps = [
            "Welcome to the Cosmere Editor!",
            "Start by writing your first few words.",
            "Collect spren by maintaining a steady writing pace.",
            "Unlock bonds with orders as you collect more spren.",
            "Achieve daily writing goals to earn achievements.",
            "Explore different themes and progress through the storyline.",
            "Use the toolbar buttons to access various features such as downloading, importing, and viewing analytics.",
            "Customize your experience in the settings panel.",
            "Good luck and happy writing!"
        ];

        let currentStep = 0;
        const showNextStep = () => {
            if (currentStep < tutorialSteps.length) {
                showNotification(tutorialSteps[currentStep]);
                currentStep++;
                setTimeout(showNextStep, 5000);
            }
        };

        showNextStep();
    };

    const generateWritingPrompt = () => {
        const prompts = [
            "Write about a character who discovers a hidden talent.",
            "Describe a scene where two characters meet for the first time.",
            "Write about a place that holds a special meaning for your protagonist.",
            "Create a dialogue between two characters with opposing views.",
            // Add more prompts as needed
        ];

        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        document.getElementById("writingPromptText").textContent = randomPrompt;
    };

    const renderGraph = (canvasId, labels, data, label) => {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const updateGraphs = () => {
        const labels = lastHourWordCount.map((_, index) => `Minute ${index + 1}`);
        renderGraph('dailyWordCountChart', labels, lastHourWordCount, 'Words per Minute');
        renderGraph('overallProgressChart', labels, Array(labels.length).fill(0).map((_, i) => i * dailyGoal), 'Overall Progress');
        renderGraph('wordCountProgressChart', labels, lastHourWordCount, 'Word Count Progress');
        renderGraph('sprenProgressChart', labels, Array(labels.length).fill(sprenCount), 'Spren Collected Over Time');
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
        updateGraphs();
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

    document.getElementById("devAddSprenBtn").addEventListener("click", () => {
        sprenCount += 10;
        updateStats();
        updateSprenVisuals();
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
        achievements = [];
        dailyProgress = 0;
        currentOrder = "default";
        currentIdeal = 0;
        updateStats();
        updateSprenVisuals();
        updateAchievements();
        showNotification("Progress reset (Developer Tool).");
    });

    document.getElementById("saveSettingsBtn").addEventListener("click", () => {
        dailyGoal = parseInt(document.getElementById("dailyGoalInput").value, 10);
        showNotification("Settings saved.");
    });

    document.getElementById("themeSelector").addEventListener("change", (event) => {
        currentOrder = event.target.value;
        currentIdeal = 0;
        document.body.className = `theme-${currentOrder}`;
        showNotification("Theme changed.");
    });

    document.getElementById("closeAchievementsBtn").addEventListener("click", () => {
        achievementsPanel.classList.add("hidden");
    });

    document.getElementById("closeWritingPromptsBtn").addEventListener("click", () => {
        writingPromptsPanel.classList.add("hidden");
    });

    document.getElementById("closeProgressTrackingBtn").addEventListener("click", () => {
        progressTrackingPanel.classList.add("hidden");
    });

    document.getElementById("closeTutorialBtn").addEventListener("click", () => {
        tutorialPanel.classList.add("hidden");
    });

    document.getElementById("newPromptBtn").addEventListener("click", () => {
        generateWritingPrompt();
    });

    editor.addEventListener("input", updateStats);

    // Initial setup
    updateStats();
    loadTutorial();
    generateWritingPrompt();
});