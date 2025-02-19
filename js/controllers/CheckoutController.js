import { CheckoutModel } from "../models/CheckoutModel.js";
import { CheckoutView } from "../views/CheckoutView.js";
import FormValidator from "../validators/FormValidator.js";

export class CheckoutController {
    constructor() {
        this.model = new CheckoutModel();
        this.view = new CheckoutView();
        this.validator = new FormValidator(this.view.form, this.view);

        console.log("[CheckoutController] Initialized");

        // Ensure renderOrderSummary exists before calling it
        if (typeof this.view.renderOrderSummary === "function") {
            console.log("[CheckoutController] Rendering Order Summary...");
            this.view.renderOrderSummary(this.model.getInputData());
        } else {
            console.error("[CheckoutController] ERROR: renderOrderSummary is not a function!");
        }

        // Populate form fields with stored data
        setTimeout(() => {
            this.view.populateForm(this.model.getInputData());
        }, 200);

        // Add event listeners for form interactions
        this.addEventListeners();
    }

    /**
     * Adds input change and form submission event listeners.
     */
    addEventListeners() {
        if (!this.view.form) {
            console.error("[CheckoutController] ERROR: Form not found in DOM!");
            return;
        }

        this.view.form.addEventListener("input", (event) => this.handleInputChange(event));
        this.view.form.addEventListener("submit", (event) => this.handleFormSubmit(event));
    }

    /**
     * Handles input changes and updates the model with real-time data.
     * @param {Event} event - The event triggered when a form input changes.
     */
    handleInputChange(event) {
        const { name, value } = event.target;
        if (name) {
            this.model.update(name, value);
            this.updateOrderSummary();
        }
    }

    /**
     * Ensures the order summary displays the latest selections.
     */
    updateOrderSummary() {
        const orderData = this.model.getInputData();
        this.view.renderOrderSummary(orderData);
    }

    /**
     * Handles form submission and validation before storing data.
     * @param {Event} event - Form submission event.
     */
    handleFormSubmit(event) {
        event.preventDefault();

        if (!this.validator.validateForm()) {
            console.log("[CheckoutController] ❌ Validation failed. Fix errors before submitting.");
            return;
        }

        if (!this.view.isTermsAccepted()) {
            this.view.highlightTermsCheckbox();
            return;
        }

        this.model.store();
        alert("🎉 Order placed successfully!");
        console.log("[CheckoutController] ✅ Order successfully saved.");
    }
}
