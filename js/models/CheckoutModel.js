/**
 * Represents the checkout data model for handling user input, validation, and storage.
 */
export class CheckoutModel {
    constructor() {
        /**
         * Stores user input data.
         * @type {Object}
         */
        this.data = {
            pasta: "",
            protein: "",
            sauce: "",
            fullName: "",
            cardholderName: "",
            city: "",
            address: "",
            dobDay: "",
            dobMonth: "",
            dobYear: "",
            cardNumber: "",
            cvv: "",
            expiryMonth: "",
            expiryYear: ""
        };

        /**
         * Stores validation errors.
         * @type {Object}
         */
        this.errors = {};

        this.init();
    }

    /**
     * Initializes the model by loading stored user data.
     */
    init() {
        this.loadData("Pasta");
        this.loadData("PersonalDetails");
    }

    /**
     * Loads stored data from localStorage and merges it into `this.data`.
     * @param {string} key - The localStorage key to retrieve data from.
     */
    loadData(key) {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            const parsedData = JSON.parse(storedData);

            Object.assign(this.data, parsedData);
        }
    }

    /**
     * Stores personal details securely in localStorage, excluding sensitive data.
     */
    store() {
        const safeData = { ...this.data };

        delete safeData.cardNumber;
        delete safeData.cvv;
        delete safeData.expiryMonth;
        delete safeData.expiryYear;
        delete safeData.cardholderName;

        localStorage.setItem("PersonalDetails", JSON.stringify(safeData));
    }

    /**
     * Updates a field value and validates it in real-time.
     * @param {string} field - The name of the field to update.
     * @param {string} value - The new value for the field.
     */
    update(field, value) {
        if (this.data.hasOwnProperty(field)) {
            this.data[field] = value;
            this.validateField(field);
            this.store();
        }
    }

    /**
     * Validates a single field in real-time and updates the error list.
     * @param {string} field - The field name to validate.
     */
    validateField(field) {
        const value = this.data[field]?.trim() || "";
        let errorMessage = "";

        switch (field) {
            case "fullName":
                if (!/^[a-zA-Z\s]+$/.test(value)) errorMessage = "fullName"; // Use key from messages.json
                break;
            case "cardholderName":
                if (!/^[a-zA-Z\s]+$/.test(value)) errorMessage = "cardholderName";
                break;
            case "city":
                if (!/^[a-zA-Z\s]+$/.test(value)) errorMessage = "city";
                break;
            case "address":
                if (!/^[a-zA-Z0-9\s,.-]+$/.test(value)) errorMessage = "address";
                break;
            case "dobDay":
            case "dobMonth":
            case "dobYear":
                if (!value) errorMessage = "dob";
                break;
            case "cardNumber":
                if (!/^\d{16}$/.test(value.replace(/\s/g, ""))) errorMessage = "cardNumber";
                break;
            case "cvv":
                if (!/^\d{3}$/.test(value)) errorMessage = "cvv";
                break;
            case "expiryMonth":
            case "expiryYear":
                if (!value) errorMessage = "expiryDate";
                break;
        }

        if (errorMessage) {
            this.errors[field] = errorMessage;
        } else {
            delete this.errors[field];
        }
    }

    /**
     * Validates all form fields before submission.
     * @returns {boolean} - Returns `true` if all fields are valid, otherwise `false`.
     */
    validate() {
        this.errors = {}; // Reset errors
        Object.keys(this.data).forEach(field => this.validateField(field));
        return Object.keys(this.errors).length === 0;
    }

    /**
     * Retrieves the current validation errors.
     * @returns {Object} - An object containing validation errors.
     */
    getErrors() {
        return this.errors;
    }
}
