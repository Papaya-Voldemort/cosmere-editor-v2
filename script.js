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
        "Journey before destination.",
        "Life before death, strength before weakness, journey before destination.",
        "The most important step a man can take is always the next one.",
        "Strength does not make one capable of rule; it makes one capable of service.",
        "The purpose of a storyteller is not to tell you how to think, but to give you questions to think upon.",
        "A burden shared is a burden halved.",
        "Somebody has to start. Somebody has to step forward and do what is right, because it is right.",
        "Expectations are like fine pottery. The harder you hold them, the more likely they are to crack.",
        "Trust is the most valuable currency.",
        "The hallmark of insecurity is bravado.",
        "You cannot have my pain.",
        "Sometimes a hypocrite is nothing more than a person who is in the process of changing.",
        "Power is an illusion of perception.",
        "You should try not to talk so much, it makes you sound stupid.",
        "A man’s emotions are what define him, and control is the hallmark of true strength.",
        "I am Unity.",
        "Honor is dead. But I will see what I can do.",
        "A coward is a man who only cares for himself.",
        "We are all a little mad. Some just hide it better than others.",
        "A king leads not by decree, but by example.",
        "Sometimes the prize is not worth the cost.",
        "You cannot have my pain.",
        "Words are where most change begins.",
        "To love the journey is to accept no such end.",
        "I will take responsibility for what I have done. If I must fall, I will rise each time a better man.",
        "We need those who laugh in the face of storms, who take joy in the efforts of creation rather than despairing at the difficulties.",
        "You should never ignore a possible future, merely because it makes you uncomfortable.",
        "It’s not a matter of perception. It’s a matter of transformation.",
        "The most powerful force in a person’s life is their own assumptions.",
        "A hypocrite is just a man in the process of changing.",
        "A man’s life should be about the journey, not about the destination.",
        "The only times I’ve failed are the ones where I gave up.",
        "The question is not whether we should fight, but how we should fight.",
        "Let others choose as they will. You cannot force them to believe as you do.",
        "In the end, all men are kings. All men are slaves.",
        "You can’t kill an idea, can’t silence a dream.",
        "If you cannot defeat an enemy, well... a knife in the back is always a good option.",
        "I am not strong enough to be a king, so I must be strong enough to be something else.",
        "You don’t need to be perfect to be a good leader.",
        "We are not bound by destiny. We are bound only by our decisions.",
        "Do not fear failure. Fear stagnation.",
        "The finest steel must go through the hottest fires.",
        "A person is what they do, not what they say they will do.",
        "Love can be a powerful weapon, if you learn how to wield it.",
        "It is not the end. But it is an end.",
        "A soldier’s duty is to follow orders. A warrior’s duty is to the people.",
        "Sometimes, a hypocrite is merely a person in the process of changing.",
        "No man can know everything, but a wise man knows what he does not know.",
        "The words of a king are only as good as the strength of his character.",
        "A man who trusts everyone is as foolish as a man who trusts no one.",
        "True power is not in ruling others, but in understanding them.",
        "I will protect those who cannot protect themselves.",
        "The only way to truly win is to never stop fighting.",
        "Fear is not weakness. It is the first step toward courage.",
        "Hatred is a poison that only weakens the soul.",
        "Honor is not about making the right choices. It is about making a choice and standing by it.",
        "It is easy to kill. It is harder to protect.",
        "The past is but a memory, the future but a dream. All we truly have is the present.",
        "To lack empathy is to lack wisdom.",
        "Strength means nothing if it is used only for oneself.",
        "The world is changed by those who dare.",
        "A sword is only as strong as the hand that wields it.",
        "The truth is often bitter, but it must be faced.",
        "We are shaped by our past, but we are not defined by it.",
        "Leadership is not about command. It is about inspiration.",
        "To know oneself is the beginning of wisdom.",
        "A wise man speaks when he has something to say, a fool speaks because he must say something.",
        "Never underestimate the power of words.",
        "It is not enough to want change. One must be willing to act upon it.",
        "Sacrifice is meaningless unless it is for something greater than oneself.",
        "A friend is worth more than any treasure.",
        "We all fall. What matters is that we rise again.",
        "It is not the strongest who survive, but those most willing to adapt.",
        "The weight of responsibility is heavy, but it is not unbearable.",
        "We fight not because we hate what is in front of us, but because we love what is behind us.",
        "Victory is not found in conquest, but in endurance.",
        "A wise king does not seek war, but prepares for it.",
        "Strength without wisdom is dangerous.",
        "Do not seek revenge. Seek justice.",
        "You cannot control the storm, but you can learn to sail upon it.",
        "A single spark can ignite a revolution.",
        "The difference between a leader and a tyrant is compassion.",
        "To be truly free, one must first conquer oneself.",
        "Greatness is not given. It is earned.",
        "Every storm must eventually pass.",
        "It is not enough to survive. One must also strive to live.",
        "Only those who dare to dream can change the world.",
        "A hero is not measured by their victories, but by the battles they choose to fight.",
        "You cannot hide from who you are forever.",
        "The heart of a warrior is found in their courage, not their blade.",
        "Even the strongest walls will crumble given time.",
        "There is no darkness so deep that light cannot reach it.",
        "No matter how much we learn, there will always be more to discover.",
        "Every ending is the beginning of something new.",
        "A man should not seek to be remembered for his words, but for his deeds.",
        "The cost of victory is often higher than expected.",
        "A broken man can still stand tall if he chooses to rise.",
        "Never let the past define who you are. Let it shape who you will become."
    ];
    

    const orders = [
        "Windrunner", "Skybreaker", "Dustbringer", "Edgedancer", "Truthwatcher",
        "Lightweaver", "Elsecaller", "Willshaper", "Stoneward", "Bondsmith"
    ];

    const notifications = [
        "You have received a vision.",
        "A new spren appears before you.",
        "You feel a surge of stormlight.",
        "A whisper of wisdom reaches you.",
        "You sense a bond forming.",
        "An ideal resonates within you.",
        "A new path opens up.",
        "Your words carry power.",
        "You glimpse the future.",
        "A radiant light surrounds you."
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

    // Load storyline from story.js
    const storyline = window.storyline || [];

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
                document.body.className = `theme-${currentOrder.toLowerCase()}-${currentIdeal}`;
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

    const showRandomNotification = () => {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        showNotification(randomNotification);
    };

    const playAnimation = (animationType, order) => {
        const animation = animationType === "oath" ? oathAnimation : nightbloodAnimation;
        const glyph = document.createElement("img");
        glyph.src = `assets/animations/${order.toLowerCase()}-glyph.png`;
        const text = document.createElement("p");
        text.textContent = `${order} - ${currentIdeal} Ideal`;
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
        const randomPrompt = "Write about a character who discovers a hidden talent.";
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
        const randomQuote = "The most important step a writer can take is the next one.";
        inspirationTextElement.textContent = randomQuote;
        showNotification("Inspiration summoned.");
    });

    document.getElementById("notifyBtn").addEventListener("click", () => {
        showRandomNotification();
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
        const selectedOrder = event.target.value;
        if (bonds[selectedOrder]) {
            currentOrder = selectedOrder;
            currentIdeal = bonds[selectedOrder];
            document.body.className = `theme-${currentOrder.toLowerCase()}-${currentIdeal}`;
            showNotification("Theme changed.");
        } else {
            showNotification("You haven't bonded with this order yet.");
        }
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

    document.getElementById("newPromptBtn").addEventListener("click", generateWritingPrompt);

    editor.addEventListener("input", updateStats);

    // ▋▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌