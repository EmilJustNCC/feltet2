# Detailed Plan for Interactive Game Website

**Overview:** Create an interactive web application featuring a simple game with 10 playing fields, a randomizer animation, and a thank you popup.

**Goal:** Create an interactive web application with a 10-field game grid, randomizer animation, and a thank you popup, using HTML, CSS, and JavaScript in the `Kode\Feltet\` directory.

**Steps:**

1.  **Create the HTML Structure (`Kode\Feltet\Feltet.html`)**:
    *   Add basic HTML5 boilerplate.
    *   Include links to the CSS and JavaScript files.
    *   Create a main container for the game.
    *   Inside the container, create a grid layout element (e.g., a `div` with a specific class).
    *   Add 10 individual `div` elements within the grid, each representing a field. Assign a common class to these fields and unique IDs or data attributes for identification.
    *   Add two button elements below the grid: one for "Aktiver gulvet" and one for "Tak Lise Rønne". Assign unique IDs to these buttons.
    *   Add a hidden modal/popup structure for the "SELV TAK" message.

2.  **Create and Style with CSS (`Kode\Feltet\style.css`)**:
    *   Create a new file named `style.css` in the `Kode\Feltet\` directory.
    *   Style the main container for centering and overall layout.
    *   Implement the grid layout for the 10 fields using CSS Grid or Flexbox. Ensure fields are square and have adequate spacing.
    *   Style the individual fields: set blue background (`#2196F3`), white text color (`#FFFFFF`), minimum size (100px x 100px), and center the text.
    *   Add hover and focus states for fields and buttons.
    *   Define styles for the randomizer animation (e.g., highlighting effect).
    *   Style the thank you modal/popup: position, background overlay, bold text ("SELV TAK"), and initial hidden state.
    *   Ensure responsiveness using media queries if necessary.

3.  **Implement JavaScript Logic (`Kode\Feltet\script.js`)**:
    *   Create a new file named `script.js` in the `Kode\Feltet\` directory.
    *   Define the array of names: `["Perjes", "Magn", "Olda", "Betbet", "Sjulstad"]`.
    *   Implement a function to randomly distribute these names across the 10 fields, ensuring each name appears exactly twice. This function should run when the page loads.
    *   Add event listeners to the buttons.
    *   For the "Aktiver gulvet" button:
        *   Implement the randomizer animation logic. This will involve iterating through the fields, applying and removing a highlighting class with timed delays that gradually increase to simulate slowing down.
        *   Select a random winning field at the end of the animation.
        *   Visually emphasize the winning field and its name (e.g., change background color, increase font size).
    *   For the "Tak Lise Rønne" button:
        *   Display the thank you modal/popup.
        *   Set a timer to hide the popup automatically after 5 seconds.
    *   Ensure the name distribution is truly random on each page load. (Note: While the plan covers the frontend random distribution, a true backend implementation would be needed for server-side randomness if required beyond the client-side).

**Mermaid Diagram:**

```mermaid
graph TD
    A[User opens Website] --> B{Load HTML, CSS, JS};
    B --> C[Render Grid and Buttons];
    B --> D[JS: Randomly Distribute Names];
    C --> E[User clicks "Aktiver gulvet"];
    E --> F[JS: Start Randomizer Animation];
    F --> G[JS: Select Winning Field];
    G --> H[JS: Emphasize Winner];
    C --> I[User clicks "Tak Lise Rønne"];
    I --> J[JS: Show "SELV TAK" Popup];
    J --> K[JS: Hide Popup after 5s];