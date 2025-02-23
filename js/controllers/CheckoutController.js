import { CheckoutModel } from "../models/CheckoutModel.js";
import { CheckoutView } from "../views/CheckoutView.js";

/**
 * CheckoutController manages the interactions between the CheckoutModel and CheckoutView.
 * It handles user input, validation, form submission, and updates the UI accordingly.
 */
export class CheckoutController {
    /**
     * Initializes the CheckoutController, sets up the model and view, and binds event listeners.
     */
    constructor() {
        /**
         * @property {CheckoutModel} model - The data model managing the checkout form data.
         */
        this.model = new CheckoutModel();

        /**
         * @property {CheckoutView} view - The view responsible for rendering the UI and displaying errors.
         */
        this.view = new CheckoutView();

        console.log("[CheckoutController] Initialized");

        // Render the initial order summary and populate the form fields
        this.view.renderOrderSummary(this.model.data);
        this.view.populateForm(this.model.data);

        // Bind event listeners to form elements
        this.addEventListeners();
    }

    /**
     * Adds event listeners for user input fields and form submission.
     */
    addEventListeners() {
        // Attach input validation on change and blur
        this.view.form.querySelectorAll("input, select").forEach(field => {
            field.addEventListener("input", (event) => this.handleInputChange(event));
            field.addEventListener("blur", (event) => this.handleInputChange(event));
        });

        // Attach form submission handler
        this.view.form.addEventListener("submit", (event) => this.handleFormSubmit(event));
    }

    /**
     * Handles input changes, updates the model, and displays validation errors in real-time.
     *
     * @param {Event} event - The input event triggered by user interaction.
     */
    handleInputChange(event) {
        const { name, value } = event.target;

        // Update the model with the latest input value
        this.model.update(name, value);

        // Display validation errors if present, otherwise clear the error
        this.view.showError(name, this.model.getErrors()[name] || "");

        // Update the order summary dynamically
        this.view.renderOrderSummary(this.model.data);
    }

    /**
     * Handles the form submission, validates input, and processes the checkout.
     *
     * @param {Event} event - The form submission event.
     */
    handleFormSubmit(event) {
        event.preventDefault();

        // Clear previous validation errors
        this.view.clearAllErrors();

        // Perform validation on all form fields
        if (!this.model.validate()) {
            this.view.showValidationErrors(this.model.getErrors());
            return;
        }

        // Check if terms and conditions are accepted
        if (!this.view.isTermsAccepted()) {
            this.view.highlightTermsCheckbox();
            return;
        }

        // Store validated data and display success message
        this.model.store();
        alert("🎉 Order placed successfully!");
    }
}
