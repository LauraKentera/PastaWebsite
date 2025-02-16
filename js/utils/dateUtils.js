/**
 * Utility functions for dynamically generating date dropdown options.
 */

/**
 * Generates an array of numbers within a given range.
 * @param {number} start - The starting number.
 * @param {number} end - The ending number.
 * @returns {Array<string>} - An array of numbers as strings.
 */
export const generateRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
};

// Define months as full names
export const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Generate ranges for day (1-31) and year (1930 - current year)
export const days = generateRange(1, 31);
export const years = generateRange(new Date().getFullYear() - 100, new Date().getFullYear());

export const expiryMonths = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

export const expiryYears = Array.from({ length: 20 }, (_, i) => String(new Date().getFullYear() + i));
