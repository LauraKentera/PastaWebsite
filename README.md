# 🍝 Pasta Paradise - Custom Pasta Ordering Website

## 📌 Project Overview
**Pasta Paradise** is a responsive, Bootstrap-powered website where users can:
- Browse and customize their own pasta dish by selecting pasta type, sauce, and protein.
- View a checkout page to enter their details and finalize their order.
- See an interactive Terms & Conditions popup before completing checkout.
- Experience a clean, user-friendly interface with a modern aesthetic.

## 🏗️ Project Structure
```plaintext
📂 PastaWebsite
│── 📂 css
│   ├── style.css (Global styling)
│   ├── checkoutCSS.css (Checkout-specific styles)
│
│── 📂 img (Stores images for pasta types, sauces, etc.)
│   ├── pastaFavIcon.png
│   ├── spaghetti.png
│   ├── penne.png
│   ├── farfalle.png
│   ├── marinara.png
│   ├── alfredo.png
│   ├── pesto.png
│   ├── chicken.png
│   ├── shrimp.png
│   ├── tofu.png
│
│── 📂 js (For future JavaScript functionality)
│   ├── script.js
│
│── index.html (Main page - pasta selection UI)
│── checkout.html (Checkout form with validation & modal popup)
│── README.md (Documentation)
```

## 🎨 Technologies Used
- **HTML5** - Structure of the pages
- **CSS3** - Styling and layout
- **Bootstrap 5** - Responsive design and layout
- **Flexbox & Grid** - Layout enhancements
- **JavaScript (Future Implementation)** - Interactivity (pasta selection, form validation, etc.)

## 🖌 Features Implemented
### **1️⃣ Navigation & Layout**
- Fixed **navbar** at the top for easy navigation.
- Smooth scrolling to different sections on the main page.

### **2️⃣ Create Your Own Pasta (Selection UI)**
- **Circular images** for selecting pasta type, sauce, and protein.
- **Click effect**: Adds a green border (`--avocado: #477E00ff;`) when selected.
- **Three-step selection process**: Pasta → Sauce → Protein.
- **"Done" button** redirects to the checkout page.

### **3️⃣ Checkout Page (Form & Validation)**
- **User-friendly form** with clear labels and placeholders (e.g., "John Doe", "1234 5678 9012 3456").
- **Date of Birth dropdowns** formatted correctly.
- **Card input fields** use "xxxx xxxx xxxx xxxx" placeholders.
- **Styled input fields** for a clean, professional look.

### **4️⃣ Terms & Conditions Modal**
- Clicking "Terms and Conditions" **opens a centered popup**.
- The modal is **fully responsive** and does not fly off the screen.
- Users **must agree** to terms before proceeding.

### **5️⃣ Footer Always at Bottom**
- Uses **flexbox** to ensure footer stays at the bottom, even on short pages.

## 📌 Future Enhancements
- ✅ Add JavaScript to make pasta selections interactive.
- ✅ Implement local storage to **remember user choices**.
- ✅ Improve animations & transitions for a smoother UX.
- ✅ Add payment processing simulation.

## 🏆 Credits
- **Developed by:** Laura Kentera
- **Open-Source Code:** Bootstrap UI concepts 
- **Icons & Assets:** Icons8, Freepik, Unsplash 

---
© 2025 Pasta Paradise. All rights reserved.

