/**
 * CheckoutController handles user interactions for the checkout page.
 */
export class CheckoutController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        console.log("[CheckoutController] Initialized");

        // Render the stored selections in the order summary
        this.view.renderOrderSummary(this.model.getInputData());

        // Create checkout form inputs dynamically
        this.view.createInputs(this.model.getInputData());

        // Register input change events to update model
        this.view.inputs.forEach((input) => {
            input.addEventListener("change", this.handleInputChange);
        });

        // Register form submission event
        this.view.form.addEventListener("submit", this.handleFormSubmit);
    }

    /**
     * Updates the model when an input field changes.
     * @param {Event} event - The change event from an input field.
     */
    handleInputChange = (event) => {
        let input = event.target;
        this.model[input.name] = input.value;
    };

    /**
     * Handles form submission, saves data, and prevents default behavior.
     * @param {Event} event - The submit event.
     */
    handleFormSubmit = (event) => {
        event.preventDefault();
        this.model.store(); // Save form data to localStorage
        alert("Order placed successfully!");
    };
}
