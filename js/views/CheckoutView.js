import { days, months, years, expiryMonths, expiryYears } from "../utils/dateUtils.js";

export class CheckoutView {
    constructor() {
        // Select the new order summary container based on updated layout
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

        // Ensure methods are bound to `this`
        this.capitalize = this.capitalize.bind(this);

        // Populate DOB Dropdowns
        this.populateDropdown(this.form.querySelector("select[name='dobDay']"), days);
        this.populateDropdown(this.form.querySelector("select[name='dobMonth']"), months);
        this.populateDropdown(this.form.querySelector("select[name='dobYear']"), years);

        // Populate Expiry Date Dropdowns
        this.populateDropdown(this.form.querySelector("select[name='expiryMonth']"), expiryMonths);
        this.populateDropdown(this.form.querySelector("select[name='expiryYear']"), expiryYears);

        // Delay populating the form slightly to ensure dropdowns exist
        setTimeout(() => this.populateForm(), 200);
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

        // Ensure the elements exist before trying to update them
        if (this.selectedPasta) this.selectedPasta.textContent = data.pasta || "Not Selected";
        if (this.selectedProtein) this.selectedProtein.textContent = data.protein || "Not Selected";
        if (this.selectedSauce) this.selectedSauce.textContent = data.sauce || "Not Selected";
    }

    /**
     * Capitalizes the first letter of a string.
     * @param {string} text - The string to capitalize.
     * @returns {string} The capitalized string.
     */
    capitalize(text) {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
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
     * Populates the form fields with stored user information from localStorage.
     */
    populateForm() {
        if (!this.form) {
            console.error("[CheckoutView] ERROR: Cannot populate form. Form element is missing!");
            return;
        }

        let storedPersonalData = localStorage.getItem("PersonalDetails");
        if (!storedPersonalData) {
            console.warn("[CheckoutView] No stored personal data found.");
            return;
        }

        let data = JSON.parse(storedPersonalData);
        console.log("[CheckoutView] Retrieved Personal Details:", data);

        // Populate text inputs
        const textFields = {
            fullName: "input[name='fullName']",
            city: "input[name='city']",
            address: "input[name='address']"
        };

        for (let key in textFields) {
            let input = this.form.querySelector(textFields[key]);
            if (input && data[key]) {
                input.value = data[key];
            }
        }

        // Populate select fields (DOB)
        const dobFields = {
            dobDay: "select[name='dobDay']",
            dobMonth: "select[name='dobMonth']",
            dobYear: "select[name='dobYear']"
        };

        for (let key in dobFields) {
            let selectElement = this.form.querySelector(dobFields[key]);
            if (selectElement && data[key]) {
                setTimeout(() => {
                    let matchingOption = selectElement.querySelector(`option[value="${data[key]}"]`);
                    if (matchingOption) {
                        selectElement.value = data[key];
                    } else {
                        console.warn(`[CheckoutView] WARNING: No matching option found for ${key}: ${data[key]}`);
                    }
                }, 200); // Small delay ensures dropdowns are fully populated
            }
        }
    }

    /**
     * Ensures that the Terms and Conditions checkbox is checked before submitting.
     */
    highlightTermsCheckbox() {
        let termsCheckbox = this.form.querySelector("input[type='checkbox']");
        let termsLabel = termsCheckbox.closest(".form-check"); // Get parent container

        if (!termsCheckbox.checked) {
            termsLabel.classList.add("shake", "border-danger");
            setTimeout(() => {
                termsLabel.classList.remove("shake", "border-danger");
            }, 600); // Remove effect after animation
        }
    }

}
