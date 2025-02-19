export class CheckoutModel {
    constructor() {
        this.data = {
            pasta: "",
            protein: "",
            sauce: "",
            fullName: "",
            city: "",
            address: "",
            dobDay: "",
            dobMonth: "",
            dobYear: ""
        };

        this.init();
    }

    /**
     * Initializes the model by loading data from localStorage.
     */
    init() {
        this.loadData("Pasta");
        this.loadData("PersonalDetails");
    }

    /**
     * Loads data from localStorage into the model.
     * @param {string} key - The localStorage key.
     */
    loadData(key) {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            Object.assign(this.data, JSON.parse(storedData));
            console.log(`[CheckoutModel] Loaded ${key} Data:`, this.data);
        } else {
            console.warn(`[CheckoutModel] No saved ${key} found.`);
        }
    }

    /**
     * Returns model data formatted for the view.
     * @returns {Object}
     */
    getInputData() {
        return { ...this.data };
    }

    /**
     * Updates a field in the model and stores it in localStorage.
     * @param {string} field - The field to update.
     * @param {string} value - The new value.
     */
    update(field, value) {
        if (this.data.hasOwnProperty(field)) {
            this.data[field] = value;
            this.store();
        }
    }

    /**
     * Stores model data in localStorage.
     */
    store() {
        localStorage.setItem("PersonalDetails", JSON.stringify(this.data));
        console.log("[CheckoutModel] Stored Personal Details:", this.data);
    }
}
