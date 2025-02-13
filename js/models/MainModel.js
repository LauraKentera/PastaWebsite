/**
 * MainModel class is responsible for managing the data logic in the application.
 * It handles the retrieval of available options for each category (e.g., pasta, sauce, protein)
 * and constructs the correct image paths based on user selections.
 *
 * The model doesn't directly communicate with the view; instead, it serves as a data source
 * for the controller, which interacts with the view.
 */

export default class MainModel {
    /**
     * @private
     * @property {Object} #dataSource - The data source containing categories and their options.
     * This object holds the available selections for each category (e.g., types of pasta, sauces, proteins).
     */
    #dataSource = null;

    /**
     * Initializes the MainModel with a data source and sets default values for each category.
     *
     * @param {Object} dataSource - The object containing categories and their respective selection options.
     * Example:
     * {
     *   pasta: ['spaghetti', 'penne', 'farfalle'],
     *   sauce: ['marinara', 'alfredo', 'pesto'],
     *   protein: ['chicken', 'shrimp', 'tofu']
     * }
     */
    constructor(dataSource) {
        this.#dataSource = dataSource;

        // Dynamically create properties for each category (e.g., pasta, sauce, protein)
        Object.keys(this.#dataSource).forEach(category => {
            this[category] = "undefined";
        });
    }

    /**
     * Retrieves the categories available in the data source.
     *
     * @returns {Array<string>} An array of category names (e.g., ['pasta', 'sauce', 'protein']).
     */
    getProperties() {
        return Object.keys(this.#dataSource);
    }

    /**
     * Retrieves the selection options for a given category.
     *
     * @param {string} category - The category to retrieve options for (e.g., 'pasta', 'sauce', 'protein').
     * @returns {Array<string>} An array of options for the specified category.
     */
    getOptions(category) {
        return this.#dataSource[category];
    }

    /**
     * Stores the current object in the browser's local storage.
     * The object is stored under the key 'Pasta' in JSON format.
     *
     * @returns "undefined"
     */
    store() {
        window.localStorage.setItem('Pasta', JSON.stringify(this));
    }

    /**
     * Constructs and returns the correct image path for the selected option within a category.
     * It tries multiple file extensions until it finds a matching file.
     *
     * @param {string} category - The category of the selection (e.g., 'pasta', 'sauce', 'protein').
     * @param {string} selection - The selected option within the category (e.g., 'spaghetti', 'marinara').
     * @returns {string} The path to the image if found, otherwise an empty string.
     */
    getImagePath(category, selection) {
        const extensions = [".png", ".jpg", ".webp", ".jpeg"];
        for (const ext of extensions) {
            const path = `img/${category}/${selection}-on-plate${ext}`;
            console.log(`[Model] Trying Path: ${path}`);

            if (this.imageExists(path)) {
                console.log(`[Model] Found Image: ${path}`);
                return path;
            }
        }
        console.error(`[Model] No Image Found for: ${selection}`);
        return "";
    }

    /**
     * Checks if an image exists at the provided URL using a synchronous HTTP HEAD request.
     *
     * @param {string} url - The URL of the image to check.
     * @returns {boolean} True if the image exists (status code not 404), false otherwise.
     */
    imageExists(url) {
        const http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status !== 404;
    }
}
