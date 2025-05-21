document.addEventListener('DOMContentLoaded', () => {
    const names = ["Perjes", "Magn", "Olda", "Betbet", "Sjulstad"];
    const fields = document.querySelectorAll('.field');
    const activateButton = document.getElementById('activate-button');
    const thankYouButton = document.getElementById('thank-you-button');
    const thankYouModal = document.getElementById('thank-you-modal');
    const gamblerModal = document.getElementById('gambler-modal');
    const gamblerActionText = document.getElementById('gambler-action-text');


    // Keep track of the last winning name to prevent consecutive wins
    let lastWinnerName = null;

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    // Scoreboard and Point Adjustment elements
    const scoresDiv = document.getElementById('scores');
    const playerSelect = document.getElementById('player-select');
    const adjustmentButtons = document.querySelectorAll('.point-adjustments button');

    // Initialize scores
    const scores = {};
    names.forEach(name => {
        scores[name] = 0;
    });

    // Function to update the scoreboard display
    function updateScoreboard() {
        scoresDiv.innerHTML = ''; // Clear current scores
        for (const name in scores) {
            const scoreElement = document.createElement('div');
            scoreElement.innerHTML = `<strong>${name}:</strong> ${scores[name]} points`;
            scoresDiv.appendChild(scoreElement);
        }
    }

    // Function to populate the player select dropdown
    function populatePlayerSelect() {
        playerSelect.innerHTML = ''; // Clear current options
        names.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            playerSelect.appendChild(option);
        });
    }

    // Function to distribute names, Bonus, and Gambler! randomly
    function distributeFields() {
        let fieldContent = [];
        names.forEach(name => {
            fieldContent.push(name, name); // Each name appears twice (10 total)
        });

        const totalFields = fields.length; // 25 fields
        const blankFieldsCount = totalFields - fieldContent.length; // 25 - 10 = 15 blank fields

        // Determine counts for Bonus and Gambler! (half of blank fields)
        const bonusCount = Math.floor(blankFieldsCount / 2); // 7
        const gamblerCount = blankFieldsCount - bonusCount; // 8

        for (let i = 0; i < bonusCount; i++) {
            fieldContent.push("Bonus");
        }
        for (let i = 0; i < gamblerCount; i++) {
            fieldContent.push("Gambler!");
        }

        fieldContent = shuffleArray(fieldContent); // Shuffle the list

        fields.forEach((field, index) => {
            field.textContent = fieldContent[index];
            field.classList.remove('highlight', 'winner', 'bonus', 'gambler'); // Reset classes

            // Add specific classes for styling
            if (field.textContent === "Bonus") {
                field.classList.add('bonus');
            } else if (field.textContent === "Gambler!") {
                field.classList.add('gambler');
            }
        });
    }

    // Function to handle Gambler! actions
    function handleGamblerAction() {
        const actions = [
            "Lose 2 points",
            "Get 1 drink for free from [random chooses one of the 5 names]",
            "Get 2 points",
            "Death round", // Text only
            "Dice roll" // Text only
        ];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];

        gamblerActionText.textContent = `Gambler! Action: ${randomAction}`; // Set modal text
        gamblerModal.style.display = 'flex'; // Show the modal

        // Implement point/drink logic for relevant actions
        if (randomAction === "Lose 2 points" || randomAction === "Get 2 points" || randomAction.startsWith("Get 1 drink")) {
            const randomPlayer = names[Math.floor(Math.random() * names.length)];
            if (randomAction === "Lose 2 points") {
                scores[randomPlayer] = Math.max(0, scores[randomPlayer] - 2); // Ensure score doesn't go below 0
                // alert(`${randomPlayer} loses 2 points.`); // Removed alert
            } else if (randomAction === "Get 2 points") {
                scores[randomPlayer] += 2;
                // alert(`${randomPlayer} gets 2 points.`); // Removed alert
            } else if (randomAction.startsWith("Get 1 drink")) {
                 // alert(`${randomPlayer} gets 1 drink for free!`); // Removed alert
            }
            updateScoreboard(); // Update scoreboard after score change
        }
    }

    // Close gambler modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target == gamblerModal) {
            gamblerModal.style.display = 'none';
        }
    });


    // Initial distribution of fields, scoreboard update, and player select population
    distributeFields();
    updateScoreboard();
    populatePlayerSelect();

    // Activate button click handler
    activateButton.addEventListener('click', () => {
        // Disable button during animation
        activateButton.disabled = true;
        thankYouButton.disabled = true;
        adjustmentButtons.forEach(button => button.disabled = true);
        playerSelect.disabled = true;


        // Reset any previous highlights
        fields.forEach(field => {
            field.classList.remove('highlight', 'winner');
        });

        // Get only the fields with names
        const nameFields = Array.from(fields).filter(field => names.includes(field.textContent));
        const totalNameFields = nameFields.length;

        // Select a random starting index from the name fields
        let currentIndex = Math.floor(Math.random() * totalNameFields);

        let animationStartTime = Date.now();
        const animationDuration = 7000; // 7 seconds
        const slowDownStartTime = 3000; // Start slowing down after 3 seconds
        let delay = 50; // Initial delay in ms

        function animateSpin() {
            const elapsed = Date.now() - animationStartTime;

            if (elapsed < animationDuration) {
                 if (currentIndex > -1) {
                    // Remove highlight from previous field (if not the very first step)
                    nameFields[currentIndex].classList.remove('highlight');
                }

                // Calculate next index
                currentIndex = (currentIndex + 1) % totalNameFields;

                // Add highlight to current field
                nameFields[currentIndex].classList.add('highlight');

                // Calculate delay - gradually increase delay after slowDownStartTime
                if (elapsed > slowDownStartTime) {
                    const remainingTime = animationDuration - elapsed;
                     // More aggressive easing towards the end
                    delay = 50 + Math.max(0, (animationDuration - remainingTime) / 5);
                } else {
                    delay = 50; // Constant speed for the first 3 seconds
                }


                setTimeout(animateSpin, delay);
            } else {
                // Animation finished, determine the winner
                let winnerIndex = currentIndex;
                let winnerName = nameFields[winnerIndex].textContent;

                // Ensure the winner is not the same as the last winner
                while (winnerName === lastWinnerName) {
                    winnerIndex = Math.floor(Math.random() * totalNameFields);
                    winnerName = nameFields[winnerIndex].textContent;
                }

                // Highlight the winner
                nameFields[winnerIndex].classList.add('winner');
                nameFields[winnerIndex].classList.remove('highlight'); // Ensure highlight is removed

                // Update the last winner
                lastWinnerName = winnerName;

                // Re-enable buttons and select
                activateButton.disabled = false;
                thankYouButton.disabled = false;
                adjustmentButtons.forEach(button => button.disabled = false);
                playerSelect.disabled = false;


                // Optional: Display winning name/content prominently
                console.log("Winner is:", winnerName);
            }
        }

        // Start the animation
        animateSpin();
    });

    // Thank You button click handler
    thankYouButton.addEventListener('click', () => {
        thankYouModal.style.display = 'flex'; // Show the modal

        // Hide the modal after 5 seconds
        setTimeout(() => {
            thankYouModal.style.display = 'none';
        }, 5000); // 5000 milliseconds = 5 seconds
    });

    // Add event listeners to point adjustment buttons
    adjustmentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedPlayer = playerSelect.value;
            const points = parseInt(button.dataset.points);
            if (selectedPlayer && !isNaN(points)) {
                scores[selectedPlayer] += points;
                 // Ensure score doesn't go below 0
                if (scores[selectedPlayer] < 0) {
                    scores[selectedPlayer] = 0;
                }
                updateScoreboard(); // Update scoreboard after adjustment
            }
        });
    });

    // Add click listeners to fields for Gambler! action
    fields.forEach(field => {
        field.addEventListener('click', () => {
            if (field.textContent === "Gambler!") {
                handleGamblerAction();
            }
        });
    });

});