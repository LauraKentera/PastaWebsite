/**
 * Entry point for the Pasta Customization application.
 * Initializes the appropriate controller based on the current page.
 */

import MainController from "./controllers/MainController.js";
import { CheckoutController } from "./controllers/CheckoutController.js";
import { CheckoutModel } from "./models/CheckoutModel.js";
import { CheckoutView } from "./views/CheckoutView.js";

/**
 * Waits for the DOM to fully load before initializing the correct controller.
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("[App] Initializing Pasta Customization...");

    new App();
});

/**
 * App class determines which controller to initialize based on the page.
 */
class App {
    constructor() {
        let url = window.location.href;
        let page = url.match(/[a-z]+\.html/gm); // Match any page ending with .html
        page = page ? page[0] : "index.html"; // Default to index.html if no match

        switch (page) {
            case "index.html":
            case "":
                new MainController();
                break;
            case "checkout.html":
                new CheckoutController(new CheckoutModel(), new CheckoutView());
                break;
            default:
                console.error(`[App] No controller found for: ${page}`);
        }
    }
}
