import { CheckoutModel } from "../models/CheckoutModel.js";
import { CheckoutView } from "../views/CheckoutView.js";
import FormValidator from "../validators/FormValidator.js";

document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.querySelector("#form-checkout");

    if (checkoutForm) {
        new FormValidator(checkoutForm);
        console.log("[Checkout] Form Validator Initialized.");
    } else {
        console.error("[Checkout] Form not found!");
    }
});

export class CheckoutController {
    constructor() {
        this.model = new CheckoutModel();
        this.view = new CheckoutView();

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

        // Add form event listeners
        if (this.view.form) {
            this.view.form.addEventListener("input", (event) => this.handleInputChange(event));
            this.view.form.addEventListener("submit", (event) => this.handleFormSubmit(event));
        } else {
            console.error("[CheckoutController] ERROR: Form not found in DOM!");
        }
    }

    /**
     * Handles input changes and updates the model with real-time data.
     * @param {Event} event - The event triggered when a form input changes.
     */
    handleInputChange(event) {
        const input = event.target;
        const name = input.name;
        const value = input.value;

        if (name) {
            if (name.startsWith("dob")) {
                // Update DOB correctly
                this.model[name] = value;
            } else {
                this.model[name] = value; // Update other fields
            }
            this.model.store(); // Save changes to localStorage
        }
    }


    /**
     * Handles form submission and stores data in localStorage.
     * @param {Event} event - Form submission event.
     */
    handleFormSubmit(event) {
        event.preventDefault();

        let termsCheckbox = this.view.form.querySelector("input[type='checkbox']");
        if (!termsCheckbox.checked) {
            this.view.highlightTermsCheckbox();
            return;
        }

        this.model.store();
        console.log("[CheckoutController] Order successfully saved.");
    }

}
