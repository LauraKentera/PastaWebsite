/**
 * CheckoutModel class is responsible for retrieving stored pasta selections
 * and managing the checkout form data.
 */
export class CheckoutModel {
    constructor() {
        this.pasta = "";
        this.protein = "";
        this.sauce = "";
        this.init();
    }

    /**
     * Initializes this object properties. Loads data from localStorage.
     */
    init() {
        let storedPasta = localStorage.getItem("Pasta");
        if (storedPasta) {
            let parsedData = JSON.parse(storedPasta);
            Object.assign(this, parsedData);
            console.log("[CheckoutModel] Loaded Data:", this);
        } else {
            console.warn("[CheckoutModel] No saved pasta selections found in localStorage.");
        }
    }

    /**
     * Converts this object to a data object for the view.
     * @returns {Object} - Object with input fields for the form.
     */
    getInputData() {
        return JSON.parse(JSON.stringify(this));
    }

    /**
     * Stores checkout form data in localStorage.
     */
    store() {
        localStorage.setItem("Pasta", JSON.stringify(this));
    }
}
