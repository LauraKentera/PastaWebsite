/**
 * CheckoutModel class is responsible for retrieving stored pasta selections
 * and managing the checkout form data.
 */
export class CheckoutModel {
    constructor() {
        this.pasta = "";
        this.protein = "";
        this.sauce = "";

        this.fullName = "";
        this.city = "";
        this.address = "";
        this.dobDay = "";
        this.dobMonth = "";
        this.dobYear = "";

        this.init();
    }

    /**
     * Initializes this object properties. Loads data from localStorage.
     */
    init() {
        // Load pasta selections
        let storedPasta = localStorage.getItem("Pasta");
        if (storedPasta) {
            let parsedData = JSON.parse(storedPasta);
            Object.assign(this, parsedData);
            console.log("[CheckoutModel] Loaded Pasta Data:", this);
        } else {
            console.warn("[CheckoutModel] No saved pasta selections found in localStorage.");
        }

        // Load personal details
        let storedDetails = localStorage.getItem("PersonalDetails");
        if (storedDetails) {
            let parsedDetails = JSON.parse(storedDetails);

            // Ensure DOB structure is correctly assigned
            this.fullName = parsedDetails.fullName || "";
            this.city = parsedDetails.city || "";
            this.address = parsedDetails.address || "";
            this.dobDay = parsedDetails.dobDay || "";
            this.dobMonth = parsedDetails.dobMonth || "";
            this.dobYear = parsedDetails.dobYear || "";

            console.log("[CheckoutModel] Loaded Personal Details:", parsedDetails);
        } else {
            console.warn("[CheckoutModel] No personal details found in localStorage.");
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
        let personalData = {
            fullName: this.fullName,
            city: this.city,
            address: this.address,
            dobDay: this.dobDay || "",
            dobMonth: this.dobMonth || "",
            dobYear: this.dobYear || ""
        };

        localStorage.setItem("PersonalDetails", JSON.stringify(personalData));
        console.log("[CheckoutModel] Stored Personal Details:", personalData);
    }

}
