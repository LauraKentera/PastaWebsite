export default class FormValidator {
    constructor(form, view) {
        this.form = form;
        this.view = view; // Injected view for UI updates
        this.errors = {};
        this.submitButton = form.querySelector("button[type='submit']");

        this.init();
    }

    /**
     * Initializes event listeners for real-time validation.
     */
    init() {
        this.form.querySelectorAll("input, select").forEach((field) => {
            field.addEventListener("input", () => this.validateField(field));
            field.addEventListener("blur", () => this.validateField(field));
        });
    }

    /**
     * Validates the entire form and returns a boolean.
     * @returns {boolean} - True if form is valid, false otherwise.
     */
    validateForm() {
        this.errors = {}; // Reset errors
        const fields = this.form.querySelectorAll("input, select");

        fields.forEach((field) => this.validateField(field));

        if (Object.keys(this.errors).length === 0) {
            console.log("[FormValidator] ✅ Form is valid.");
            return true;
        } else {
            console.log("[FormValidator] ❌ Validation failed:", this.errors);
            return false;
        }
    }

    /**
     * Validates a single field and updates error messages.
     */
    validateField(field) {
        const { name, value } = field;
        let errorMessage = "";

        if (field.required && !value.trim()) {
            errorMessage = "This field is required.";
        } else {
            switch (name) {
                case "fullName":
                    if (!/^[a-zA-Z\s]+$/.test(value)) errorMessage = "Only letters and spaces allowed.";
                    break;
                case "city":
                    if (!/^[a-zA-Z\s]+$/.test(value)) errorMessage = "City name must contain only letters.";
                    break;
                case "address":
                    if (!/^[a-zA-Z0-9\s,.-]+$/.test(value)) errorMessage = "Enter a valid address.";
                    break;
                case "cardNumber":
                    if (!/^\d{16}$/.test(value.replace(/\s/g, ""))) errorMessage = "Enter a valid 16-digit card number.";
                    break;
                case "cvv":
                    if (!/^\d{3}$/.test(value)) errorMessage = "CVV must be 3 digits.";
                    break;
                case "dobDay":
                case "dobMonth":
                case "dobYear":
                    if (!value) errorMessage = "Please select a value.";
                    break;
                default:
                    break;
            }
        }

        if (errorMessage) {
            this.errors[name] = errorMessage;
            this.view.showError(name, errorMessage);
        } else {
            delete this.errors[name];
            this.view.clearError(name);
        }

        this.checkFormValidity();
    }

    /**
     * Checks if the form is valid and enables/disables the submit button.
     */
    checkFormValidity() {
        this.submitButton.disabled = Object.keys(this.errors).length > 0;
    }
}
