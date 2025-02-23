Here is your **updated README.md** based on your **current project structure** and **new features**:

---

## **🍝 Pasta Paradise - Custom Pasta Ordering Website**

### **📌 Project Overview**
**Pasta Paradise** is a **fully interactive, responsive web application** where users can:
- Customize their own pasta dish by selecting **pasta type, sauce, and protein**.
- Enter their details on the **checkout page** with real-time form validation.
- View an interactive **Terms & Conditions popup** before finalizing checkout.
- Experience a **modern, user-friendly UI** with dynamic JavaScript features.

---

## **🏗️ Project Structure**
```plaintext
📂 PastaWebsite
│── 📂 css
│   ├── style.css          # Global styles
│   ├── checkoutCSS.css    # Styles for the checkout page
│   ├── footer.css         # Footer-specific styles
│   ├── review.css         # Additional UI styling
│
│── 📂 data
│   ├── selectData.js      # Data file for dropdown selections
│
│── 📂 img                 # Image assets for pasta, sauces, and users
│   ├── pasta/             # Pasta-related images
│   ├── protein/           # Protein selection images
│   ├── sauce/             # Sauce selection images
│   ├── users/             # User profile images
│
│── 📂 js
│   │── 📂 controllers
│   │   ├── CheckoutController.js  # Controls checkout page behavior
│   │   ├── MainController.js      # Main app logic
│   │
│   │── 📂 models
│   │   ├── CheckoutModel.js  # Stores and validates checkout data
│   │   ├── MainModel.js      # Core data handling
│   │
│   │── 📂 views
│   │   ├── CheckoutView.js  # Handles checkout UI updates
│   │   ├── MainView.js      # General UI updates
│   │
│   │── 📂 utils
│   │   ├── dateUtils.js     # Utility functions for dropdown dates
│   │   ├── messages.json    # Stores validation messages
│   │
│   ├── App.js               # Entry point for initializing app
│
│── 📂 vendors
│   ├── modernizr-custom.js  # Modernizr library for browser support
│
│── checkout.html             # Checkout form with live validation
│── index.html                # Main page - pasta selection UI
│── unsupported.html          # Fallback page for unsupported browsers
│── README.md                 # Project documentation
```

---

## **🎨 Technologies Used**
- **HTML5** - Semantic structure for better accessibility.
- **CSS3 (Flexbox & Grid)** - Clean, responsive design.
- **Bootstrap 5** - Simplifies UI layout and responsiveness.
- **JavaScript (ES6+ Modules)** - Controls interactivity and form validation.
- **LocalStorage** - Stores user selections for a smoother UX.
- **Modernizr** - Ensures compatibility with older browsers.

---

## **🖌 Features Implemented**
### **1️⃣ Navigation & Layout**
✔ **Fixed Navbar** at the top for seamless page transitions.  
✔ **Smooth scrolling** to sections on the homepage.

### **2️⃣ Custom Pasta Selection**
✔ Users select **pasta type, sauce, and protein** with visual feedback.  
✔ Selected items **appear in the checkout summary** dynamically.  
✔ **LocalStorage** preserves selections when navigating between pages.

### **3️⃣ Checkout Page (Form & Validation)**
✔ Real-time **validation** for:
- **Full name** (letters only)
- **Address & City**
- **Cardholder Name** (matches format)
- **Card Number, CVV, Expiry Date**  
  ✔ Error messages are loaded from **messages.json** dynamically.  
  ✔ Invalid fields are marked **red** until corrected.

### **4️⃣ Terms & Conditions Modal**
✔ Clicking "Terms and Conditions" opens a **popup modal**.  
✔ Users **must accept** terms before placing an order.

### **5️⃣ Order Summary**
✔ Displays **selected pasta, sauce, and protein** before purchase.  
✔ Updates **live** as users modify selections.

### **6️⃣ Enhanced User Experience**
✔ **Dropdown menus** for selecting **date of birth & expiry date**.  
✔ **Auto-populating form fields** with saved user data.  
✔ **Error handling improvements** for better user feedback.

---

## **📌 Future Enhancements**
✅ **Payment Simulation** - Simulate a payment gateway for better UX.  
✅ **Dark Mode** - Add a theme switcher for better accessibility.  
✅ **User Accounts** - Allow users to save preferences.  
✅ **Mobile Optimizations** - Further improvements for smaller screens.

---

## **🏆 Credits**
**Developed by:** *Laura Kentera*  
**Technologies & Frameworks:** Bootstrap, JavaScript ES6, LocalStorage  
**Icons & Assets:** Icons8, Freepik, Unsplash

---
© 2025 Pasta Paradise. All rights reserved.

---
