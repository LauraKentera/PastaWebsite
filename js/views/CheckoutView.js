import { days, months, years, expiryMonths, expiryYears } from "../utils/dateUtils.js";

/**
 * Handles the checkout form UI interactions, including validation error messages and dropdown population.
 */
export class CheckoutView {
    constructor() {
        /**
         * The checkout form element.
         * @type {HTMLFormElement}
         */
        this.form = document.querySelector("#form-checkout");

        /**
         * The order summary container.
         * @type {HTMLElement}
         */
        this.orderSummaryContainer = document.querySelector(".order-summary-container");

        /**
         * Order summary elements.
         * @type {HTMLElement}
         */
        this.selectedPasta = document.querySelector("#selectedPasta");
        this.selectedProtein = document.querySelector("#selectedProtein");
        this.selectedSauce = document.querySelector("#selectedSauce");

        /**
         * Stores validation messages loaded from `messages.json`.
         * @type {Object}
         */
        this.messages = {};

        if (!this.form) {
            console.error("[CheckoutView] ERROR: Checkout form not found in DOM!");
            return;
        }

        this.loadMessages();
        this.initializeDropdowns();
    }

    /**
     * Loads validation messages from `messages.json`.
     * @async
     */
    async loadMessages() {
        try {
            const response = await fetch("/js/utils/messages.json");
            if (!response.ok) throw new Error("Failed to load messages.json");
            this.messages = await response.json();
        } catch (error) {
            console.error("[CheckoutView] ERROR: Cannot load messages.json", error);
        }
    }

    /**
     * Initializes dropdowns for date of birth and expiry date.
     */
    initializeDropdowns() {
        this.populateDropdown(this.form.querySelector("select[name='dobDay']"), days);
        this.populateDropdown(this.form.querySelector("select[name='dobMonth']"), months);
        this.populateDropdown(this.form.querySelector("select[name='dobYear']"), years);
        this.populateDropdown(this.form.querySelector("select[name='expiryMonth']"), expiryMonths);
        this.populateDropdown(this.form.querySelector("select[name='expiryYear']"), expiryYears);
    }

    /**
     * Populates a select dropdown with given options.
     * @param {HTMLSelectElement} selectElement - The select element to populate.
     * @param {Array<string|number>} options - The options to populate the dropdown with.
     * @param {string} [selectedValue=""] - The value to pre-select.
     */
    populateDropdown(selectElement, options, selectedValue = "") {
        if (!selectElement) return;
        selectElement.innerHTML = `<option value="">Select</option>`;
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            if (selectedValue && option.toString() === selectedValue.toString()) {
                opt.selected = true;
            }
            selectElement.appendChild(opt);
        });
    }

    /**
     * Populates the form fields with stored user information.
     * @param {Object} data - The user data object.
     */
    populateForm(data) {
        if (!this.form) return;

        Object.keys(data).forEach((key) => {
            const input = this.form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = data[key] || "";
            }
        });

        // Populate dropdowns with selected values
        this.populateDropdown(this.form.querySelector("select[name='dobDay']"), days, data.dobDay);
        this.populateDropdown(this.form.querySelector("select[name='dobMonth']"), months, data.dobMonth);
        this.populateDropdown(this.form.querySelector("select[name='dobYear']"), years, data.dobYear);
        this.populateDropdown(this.form.querySelector("select[name='expiryMonth']"), expiryMonths, data.expiryMonth);
        this.populateDropdown(this.form.querySelector("select[name='expiryYear']"), expiryYears, data.expiryYear);
    }

    /**
     * Renders the order summary using user selections.
     * @param {Object} data - The user data object.
     */
    renderOrderSummary(data) {
        if (!this.orderSummaryContainer) return;
        this.selectedPasta.textContent = data.pasta || "Not Selected";
        this.selectedProtein.textContent = data.protein || "Not Selected";
        this.selectedSauce.textContent = data.sauce || "Not Selected";
    }

    /**
     * Displays validation error messages below the corresponding input fields.
     * @async
     * @param {string} field - The field name associated with the error.
     * @param {string} errorKey - The key for the corresponding error message from `messages.json`.
     */
    async showError(field, errorKey) {
        const input = this.form.querySelector(`[name="${field}"]`);
        if (!input) return;

        let errorDiv = input.parentNode.querySelector(".invalid-feedback");
        if (!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.className = "invalid-feedback";
            input.parentNode.appendChild(errorDiv);
        }

        if (errorKey && this.messages[errorKey]) {
            errorDiv.textContent = this.messages[errorKey]; // Correct error message
            input.classList.add("is-invalid");
        } else {
            errorDiv.textContent = "";
            input.classList.remove("is-invalid");
        }
    }

    /**
     * Displays all validation errors for the given fields.
     * @param {Object} errors - An object where keys are field names and values are error keys.
     */
    showValidationErrors(errors) {
        this.clearAllErrors();
        Object.keys(errors).forEach(field => {
            this.showError(field, errors[field]);
        });
    }

    /**
     * Clears all validation errors from the form.
     */
    clearAllErrors() {
        this.form.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
        this.form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
    }

    /**
     * Checks if the Terms & Conditions checkbox is checked.
     * @returns {boolean} - Returns `true` if accepted, otherwise `false`.
     */
    isTermsAccepted() {
        return this.form.querySelector("input[name='terms']")?.checked ?? false;
    }

    /**
     * Highlights the Terms & Conditions checkbox if not checked.
     */
    highlightTermsCheckbox() {
        const termsLabel = this.form.querySelector(".form-check");
        if (!termsLabel) return;
        termsLabel.classList.add("shake", "border-danger");
        setTimeout(() => termsLabel.classList.remove("shake", "border-danger"), 600);
    }
}
