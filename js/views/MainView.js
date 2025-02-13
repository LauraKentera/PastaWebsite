/**
 * MainView class is responsible for handling the display logic of the application.
 * It manages dynamic creation of selection sections, updates overlay images based on user selections,
 * and handles visual feedback such as adding or removing CSS classes for selected options.
 */
export default class MainView {
    /**
     * Initializes the MainView instance.
     * - Selects the container where the selection options will be displayed.
     * - Prepares an object to store references to overlay image layers for pasta, sauce, and protein.
     */
    constructor() {
        /**
         * Reference to the container where selection options will be dynamically inserted.
         * @type {HTMLElement}
         */
        this.selectionContainer = document.querySelector("#selection-container");

        /**
         * Object to hold references to overlay image layers (e.g., pasta-layer, sauce-layer).
         * Keys correspond to categories (e.g., 'pasta', 'sauce', 'protein').
         * @type {Object.<string, HTMLElement>}
         */
        this.layers = {};
    }

    /**
     * Dynamically creates a section of selectable options for a specific category.
     *
     * @param {string} category - The name of the category (e.g., 'pasta', 'sauce', 'protein').
     * @param {Array<string>} options - Array of available options for the category (e.g., ['spaghetti', 'penne']).
     */
    createSelectionSection(category, options) {
        // Create the header for the category section
        this.selectionContainer.insertAdjacentHTML("beforeend", `<h4>${this.capitalize(category)} Type</h4>`);

        // // Create a container to hold the options
        // const optionsContainer = document.createElement("div");
        // optionsContainer.classList.add("d-flex", "justify-content-start", "gap-3", "flex-wrap");
        //
        // // Add each option to the container
        // options.forEach(option => {
        //     optionsContainer.insertAdjacentHTML("beforeend",
        //         <div class="selection-option ${category}-option" data-category="${category}" data-selection="${option}">
        //             <img src="img/${category}/${option}.jpg" class="pasta-img" alt="${option}">
        //                 <p>${this.capitalize(option)}</p>
        //         </div>
        // );
        // });

        // Create a new <div> element and immediately assign properties using Object.assign
        const optionsContainer = Object.assign(document.createElement("div"), {

            // Add Bootstrap classes for layout and styling
            className: "d-flex justify-content-start gap-3 flex-wrap",

            // Populate the inner HTML of the container with option elements
            innerHTML: options.map(option => `
        <div class="selection-option ${category}-option" data-category="${category}" data-selection="${option}">
        
            <!-- Image for the option (e.g., img/pasta/penne.jpg) -->
            <img src="img/${category}/${option}.jpg" 
                 class="pasta-img" 
                 alt="${option}">
            
            <!-- Option name (e.g., Penne, Spaghetti) -->
            <p>${this.capitalize(option)}</p>
        </div>
    `).join("") // Join the array of HTML strings into one single string
        });


        // Append the completed options container to the main selection container
        this.selectionContainer.appendChild(optionsContainer);

        // Initialize the corresponding overlay layer for the category (e.g., pasta-layer, sauce-layer)
        this.layers[category] = document.querySelector(`.${category}-layer`);
    }

    /**
     * Updates the displayed image for a specific category (pasta, sauce, protein).
     * This method updates the source of the overlay image to match the selected option.
     *
     * @param {string} category - The category of the selection (e.g., 'pasta', 'sauce', 'protein').
     * @param {string} imagePath - The path to the image that should be displayed.
     */
    updateImage(category, imagePath) {
        if (this.layers[category]) {
            this.layers[category].src = imagePath;
        } else {
            console.error(`[View] No layer found for ${category}`);
        }
    }

    /**
     * Removes the 'selected' CSS class from all options within a specified category.
     * This ensures that only the currently selected option is highlighted.
     *
     * @param {string} category - The category from which to remove the 'selected' class (e.g., 'pasta', 'sauce', 'protein').
     */
    removeSelectedClass(category) {
        document.querySelectorAll(`.${category}-option`).forEach(option => {
            option.classList.remove("selected");
        });
    }

    /**
     * Adds the 'selected' CSS class to the specified option element to highlight it.
     *
     * @param {HTMLElement} option - The DOM element representing the option that was selected.
     */
    addSelectedClass(option) {
        option.classList.add("selected");
    }

    /**
     * Capitalizes the first letter of the provided text.
     * Useful for displaying category and option names with proper formatting.
     *
     * @param {string} text - The text to capitalize.
     * @returns {string} The capitalized text.
     */
    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}
