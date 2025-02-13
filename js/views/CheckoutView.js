/**
 * CheckoutView class is responsible for rendering the order summary
 * and dynamically generating the checkout form.
 */
export class CheckoutView {
    constructor() {
        this.orderSummaryContainer = document.querySelector("#order-summary"); // Order summary section
        this.form = document.querySelector("#form-checkout"); // Checkout form
        this.inputs = []; // Store references to form inputs

        if (!this.orderSummaryContainer) {
            console.error("[CheckoutView] ERROR: #order-summary not found in DOM!");
        }
    }

    /**
     * Renders the order summary with the selected pasta, sauce, and protein.
     * @param {Object} data - Stored pasta selections from localStorage.
     */
    renderOrderSummary(data) {
        console.log("[CheckoutView] Rendering Order Summary:", data);

        if (!this.orderSummaryContainer) {
            console.error("[CheckoutView] ERROR: Cannot update order summary. Element is missing!");
            return;
        }

        this.orderSummaryContainer.innerHTML = `
        <h3>Your Pasta</h3>
        <div class="order-box">
            <span class="red-line"></span>
            <p><strong>Selected Pasta:</strong> ${data.pasta ? this.capitalize(data.pasta) : "Not Selected"}</p>
            <p><strong>Selected Protein:</strong> ${data.protein ? this.capitalize(data.protein) : "Not Selected"}</p>
            <p><strong>Selected Sauce:</strong> ${data.sauce ? this.capitalize(data.sauce) : "Not Selected"}</p>
        </div>
    `;
    }

    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }


    /**
     * Dynamically creates form inputs based on provided data.
     * @param {Object} data - Checkout form data.
     */
    createInputs(data) {
        for (let property in data) {
            this.form.querySelector("fieldset").insertAdjacentHTML(
                "beforeend",
                `<label>${property}: </label>
                <input type="text" name="${property}" value="${data[property]}" size="30"/>
                <br>`
            );
        }

        this.inputs = this.form.querySelectorAll("input[type=text]");
    }
}
