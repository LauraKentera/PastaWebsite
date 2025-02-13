/**
 * MainController class orchestrates interactions between the Model and the View.
 * It handles user interactions (click events) for pasta, sauce, and protein selections,
 * updates the model with the selected data, and reflects these changes in the view.
 *
 * The controller is responsible for initializing the selections dynamically based
 * on data from the model and managing UI updates in response to user input.
 */

import { selectData } from "../../data/selectData.js";
import MainModel from "../models/MainModel.js";
import MainView from "../views/MainView.js";

export default class MainController {
    /**
     * Initializes the MainController by creating instances of the Model and View.
     * It dynamically generates selection options and registers event handlers
     * for user interactions.
     */
    constructor() {
        /**
         * @property {MainModel} model - The data model that manages available options and selected values.
         */
        this.model = new MainModel(selectData);

        /**
         * @property {MainView} view - The view responsible for rendering the UI and updating the displayed selections.
         */
        this.view = new MainView();

        // Dynamically create selections for each category based on model properties
        this.model.getProperties().forEach(category => {
            this.view.createSelectionSection(category, this.model.getOptions(category));
        });

        // Add click event listeners to all dynamically created selection options
        document.querySelectorAll(".selection-option").forEach(option => {
            option.addEventListener("click", (event) => this.handleImgDivClick(event));
        });
    }

    /**
     * Handles the click event when a selection option is clicked.
     * This method updates both the model and view to reflect the user's choice.
     *
     * @param {Event} event - The click event triggered when an option is selected.
     */
    handleImgDivClick(event) {
        const option = event.currentTarget;

        /**
         * @const {string} category - The category of the clicked option (e.g., 'pasta', 'sauce', 'protein').
         */
        const category = option.getAttribute("data-category");

        /**
         * @const {string} selection - The specific selection made within the category (e.g., 'spaghetti', 'alfredo').
         */
        const selection = option.getAttribute("data-selection");

        // Update the model with the new selection
        this.model[category] = selection;
        this.model.store();

        // Remove 'selected' class from all other options in the same category
        this.view.removeSelectedClass(category);

        // Add 'selected' class to the clicked option
        this.view.addSelectedClass(option);

        // Retrieve the correct image path from the model and update the view
        const imagePath = this.model.getImagePath(category, selection);
        this.view.updateImage(category, imagePath);
    }
}
