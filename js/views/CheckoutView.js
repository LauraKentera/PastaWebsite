import { days, months, years, expiryMonths, expiryYears } from "../utils/dateUtils.js";

export class CheckoutView {
    constructor() {
        this.orderSummaryContainer = document.querySelector(".order-summary-container");
        this.selectedPasta = document.querySelector("#selectedPasta");
        this.selectedProtein = document.querySelector("#selectedProtein");
        this.selectedSauce = document.querySelector("#selectedSauce");
        this.form = document.querySelector("#form-checkout");

        if (!this.orderSummaryContainer) {
            console.error("[CheckoutView] ERROR: Order summary container not found in DOM!");
        }
        if (!this.form) {
            console.error("[CheckoutView] ERROR: Checkout form not found in DOM!");
        }

        // Ensure dropdowns are populated
        this.populateDropdown(this.form.querySelector("select[name='dobDay']"), days);
        this.populateDropdown(this.form.querySelector("select[name='dobMonth']"), months);
        this.populateDropdown(this.form.querySelector("select[name='dobYear']"), years);
        this.populateDropdown(this.form.querySelector("select[name='expiryMonth']"), expiryMonths);
        this.populateDropdown(this.form.querySelector("select[name='expiryYear']"), expiryYears);
    }

    /**
     * Populates a dropdown select element with options.
     * @param {HTMLElement} selectElement - The select element to populate.
     * @param {Array} options - The options to populate the dropdown with.
     */
    populateDropdown(selectElement, options) {
        if (!selectElement) {
            console.error("[CheckoutView] ERROR: Dropdown element not found!");
            return;
        }

        selectElement.innerHTML = `<option value="">Select</option>`;
        options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }

    /**
     * Renders the order summary with selected pasta, protein, and sauce.
     * @param {Object} data - Data retrieved from localStorage.
     */
    renderOrderSummary(data) {
        if (!this.orderSummaryContainer) {
            console.error("[CheckoutView] ERROR: Cannot update order summary. Element is missing!");
            return;
        }

        console.log("[CheckoutView] Rendering Order Summary:", data);

        this.selectedPasta.textContent = data.pasta || "Not Selected";
        this.selectedProtein.textContent = data.protein || "Not Selected";
        this.selectedSauce.textContent = data.sauce || "Not Selected";
    }

    /**
     * Populates the form fields with stored user information from localStorage.
     * @param {Object} data - User data.
     */
    populateForm(data) {
        if (!this.form) return;

        Object.keys(data).forEach((key) => {
            const input = this.form.querySelector(`[name="${key}"]`);
            if (input) input.value = data[key] || "";
        });

        // Ensure dropdowns are set correctly after they are populated
        setTimeout(() => {
            this.setDropdownValue("dobDay", data.dobDay);
            this.setDropdownValue("dobMonth", data.dobMonth);
            this.setDropdownValue("dobYear", data.dobYear);
            this.setDropdownValue("expiryMonth", data.expiryMonth);
            this.setDropdownValue("expiryYear", data.expiryYear);
        }, 200);
    }

    /**
     * Sets the value of a dropdown field.
     * @param {string} fieldName - The name of the dropdown field.
     * @param {string} value - The value to set.
     */
    setDropdownValue(fieldName, value) {
        const selectElement = this.form.querySelector(`select[name='${fieldName}']`);
        if (selectElement && value) {
            selectElement.value = value;
        }
    }

    /**
     * Highlights the Terms and Conditions checkbox if not checked.
     */
    highlightTermsCheckbox() {
        let termsLabel = this.form.querySelector(".form-check");
        termsLabel.classList.add("shake", "border-danger");
        setTimeout(() => termsLabel.classList.remove("shake", "border-danger"), 600);
    }

    /**
     * Checks if the Terms and Conditions checkbox is checked.
     * @returns {boolean}
     */
    isTermsAccepted() {
        const termsCheckbox = this.form.querySelector("input[type='checkbox']");
        return termsCheckbox && termsCheckbox.checked;
    }

    /**
     * Displays an error message below the field.
     * @param {string} field - The field name.
     * @param {string} message - The error message.
     */
    showError(field, message) {
        const input = this.form.querySelector(`[name="${field}"]`);
        if (!input) return;

        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains("invalid-feedback")) {
            errorDiv = document.createElement("div");
            errorDiv.className = "invalid-feedback";
            input.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        input.classList.add("is-invalid");
    }

    /**
     * Removes the error message.
     * @param {string} field - The field name.
     */
    clearError(field) {
        const input = this.form.querySelector(`[name="${field}"]`);
        if (!input) return;

        input.classList.remove("is-invalid");
        let errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains("invalid-feedback")) {
            errorDiv.remove();
        }
    }

}
