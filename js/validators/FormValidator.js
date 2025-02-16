export default class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = {};
        this.submitButton = form.querySelector("button[type='submit']");

        // Expiry date fields
        this.expMonthSelect = form.querySelector("select[name='expiryMonth']");
        this.expYearSelect = form.querySelector("select[name='expiryYear']");

        // Error message containers
        this.cardErrorContainer = document.createElement("div");
        this.cardErrorContainer.classList.add("error-message");
        this.expYearSelect.parentElement.appendChild(this.cardErrorContainer); // Add below expiry fields

        this.init();
        this.restoreData(); // Load saved data from localStorage
    }

    /**
     * Initializes event listeners for real-time validation.
     */
    init() {
        this.form.addEventListener("submit", (event) => this.handleSubmit(event));

        this.form.querySelectorAll("input, select").forEach((field) => {
            field.addEventListener("input", () => this.validateField(field)); // Validate as user types
            field.addEventListener("blur", () => this.validateField(field)); // Validate when user leaves field
        });

        if (this.expMonthSelect && this.expYearSelect) {
            this.expMonthSelect.addEventListener("change", () => this.validateExpiryDate());
            this.expYearSelect.addEventListener("change", () => this.validateExpiryDate());
        }
    }

    /**
     * Handles form submission and checks validation.
     */
    handleSubmit(event) {
        event.preventDefault(); // Prevent submission if validation fails.

        this.errors = {}; // Reset errors
        const fields = this.form.querySelectorAll("input, select");
        fields.forEach((field) => this.validateField(field));

        if (Object.keys(this.errors).length === 0) {
            console.log("[FormValidator] ✅ Form submitted successfully.");
            this.storeData(); // Store only non-sensitive data
            alert("🎉 Order placed successfully!");
        } else {
            console.log("[FormValidator] ❌ Validation failed:", this.errors);
        }
    }

    /**
     * Validates a single input field.
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
                case "expiryMonth":
                case "expiryYear":
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
            this.showError(field, errorMessage);
        } else {
            this.removeError(field);
        }

        this.checkFormValidity();
    }

    /**
     * Validates the expiry date and ensures it is in the future.
     */
    validateExpiryDate() {
        const month = this.expMonthSelect.value;
        const year = this.expYearSelect.value;
        const expiryDateGroup = this.expYearSelect.closest(".expiry-date-group");

        // Remove any existing error message first
        let existingError = expiryDateGroup.querySelector(".expiry-error-message");
        if (existingError) existingError.remove();

        let errorMessage = "";

        if (!month || !year) {
            errorMessage = "Please fill in both expiry fields.";
        } else {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based

            if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                errorMessage = "Please use a valid card.";
            }
        }

        if (errorMessage) {
            const expiryError = document.createElement("div");
            expiryError.classList.add("expiry-error-message");
            expiryError.textContent = errorMessage;
            expiryDateGroup.appendChild(expiryError);

            this.expMonthSelect.classList.add("is-invalid");
            this.expYearSelect.classList.add("is-invalid");
        } else {
            this.expMonthSelect.classList.remove("is-invalid");
            this.expYearSelect.classList.remove("is-invalid");
        }
    }


    /**
     * Displays an error message below the field.
     */
    showError(field, message) {
        field.classList.add("is-invalid");

        let errorDiv = field.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains("invalid-feedback")) {
            errorDiv = document.createElement("div");
            errorDiv.className = "invalid-feedback";
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    /**
     * Removes the error message.
     */
    removeError(field) {
        field.classList.remove("is-invalid");
        const errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains("invalid-feedback")) {
            errorDiv.remove();
        }
    }

    /**
     * Checks if the form is fully valid.
     * Disables the submit button if there are any errors.
     */
    checkFormValidity() {
        if (Object.keys(this.errors).length > 0) {
            this.submitButton.disabled = true;
        } else {
            this.submitButton.disabled = false;
        }
    }

    /**
     * Stores non-sensitive form data in localStorage.
     */
    storeData() {
        const formData = {
            fullName: this.form.querySelector("input[name='fullName']").value,
            dobDay: this.form.querySelector("select[name='dobDay']").value,
            dobMonth: this.form.querySelector("select[name='dobMonth']").value,
            dobYear: this.form.querySelector("select[name='dobYear']").value,
            city: this.form.querySelector("input[name='city']").value,
            address: this.form.querySelector("input[name='address']").value
        };

        localStorage.setItem("checkoutData", JSON.stringify(formData));
        console.log("[FormValidator] Stored Form Data:", formData);
    }

    /**
     * Restores stored personal details into the form fields.
     */
    restoreData() {
        let storedData = localStorage.getItem("checkoutData");
        if (!storedData) return;

        let data = JSON.parse(storedData);
        console.log("[FormValidator] Restored Data:", data);

        this.form.querySelector("input[name='fullName']").value = data.fullName || "";
        this.form.querySelector("input[name='city']").value = data.city || "";
        this.form.querySelector("input[name='address']").value = data.address || "";

        // Populate select dropdowns for DOB
        this.form.querySelector("select[name='dobDay']").value = data.dobDay || "";
        this.form.querySelector("select[name='dobMonth']").value = data.dobMonth || "";
        this.form.querySelector("select[name='dobYear']").value = data.dobYear || "";
    }
}
