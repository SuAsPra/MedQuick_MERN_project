onvert MERN Ecommerce to MedQuick
Convert the existing MERN ecommerce codebase into a healthcare delivery platform called MedQuick ("Medicine & Emergency Essentials Delivery Platform"). We will preserve the core architecture, Redux Toolkit state, Material UI, and authentication, making targeted changes to branding, categories, schemas, order statuses, and page layouts.

User Review Required
IMPORTANT

Database Wipe/Reseed Recommendation: Since the database categories, brands, and products are changed to medical items, the existing seeded database contents will become obsolete. We recommend dropping your existing MongoDB database (medquick_mern) and running npm run seed in the backend directory once the implementation is complete to seed clean healthcare-related mock data.

NOTE

Prescription Verification: No backend upload or OCR logic is being implemented in this phase. A static "Prescription Verification Dashboard" placeholder is added to the Admin panel, and a "Prescription Required" badge is added to the relevant frontend product displays.

Proposed Changes
Backend Components
[MODIFY] 
backend/models/Product.js
Extend the database schema with optional healthcare fields:

requiresPrescription (Boolean) - default false
manufacturer (String)
expiryDate (Date)
dosage (String)
medicineType (String)
[MODIFY] 
backend/models/Order.js
Update the status enum field to use healthcare delivery stages:

['Pending', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled']
[MODIFY] 
backend/seed/Category.js
Replace standard shopping categories with the 8 requested healthcare categories:

Medicines, First Aid, Emergency Supplies, Health Devices, Personal Care, Baby Care, Wellness, Daily Essentials.
[MODIFY] 
backend/seed/Brand.js
Replace fashion/electronic brands with healthcare manufacturers (e.g., Pfizer, GSK, Johnson & Johnson, Bayer, Abbott, Dettol, etc.).

[MODIFY] 
backend/seed/Product.js
Replace the 100+ generic items with ~15 medical and wellness products belonging to the new healthcare categories, including metadata for the new schema fields (e.g., Amoxicillin requiring a prescription, blood pressure monitor as a health device, etc.).

Frontend Shared & Branding Components
[MODIFY] 
frontend/public/index.html
Update HTML <title> tag to "MedQuick - Medicine & Emergency Essentials Delivery Platform".
[MODIFY] 
frontend/src/features/navigation/components/Navbar.jsx
Rename "MERN SHOP" logo to "MedQuick".
Add a "Verify Prescriptions" dropdown item for Admin users that routes to /admin/prescriptions.
[MODIFY] 
frontend/src/features/auth/components/Login.jsx
Rebrand text "Mern Shop" to "MedQuick".
[MODIFY] 
frontend/src/features/auth/components/Signup.jsx
Rebrand text "Mern Shop" to "MedQuick".
Update welcome toast message to mention "MedQuick" instead of "mern-ecommerce".
[MODIFY] 
frontend/src/features/footer/Footer.jsx
Rebrand copyright message from "Mern Store" to "MedQuick".
Rebrand support details and label titles.
Frontend Product Components
[MODIFY] 
frontend/src/features/products/components/ProductCard.jsx
Accept requiresPrescription prop.
If requiresPrescription is true, render a visible "Rx / Prescription Required" badge on the product image/thumbnail.
[MODIFY] 
frontend/src/features/products/components/ProductList.jsx
Pass requiresPrescription to the <ProductCard/> components.
Update local banner assets to point to healthcare-themed banner images.
[MODIFY] 
frontend/src/features/wishlist/components/Wishlist.jsx
Pass requiresPrescription to the <ProductCard/> components.
[MODIFY] 
frontend/src/features/admin/components/AdminDashBoard.jsx
Pass requiresPrescription to the <ProductCard/> components.
[MODIFY] 
frontend/src/features/products/components/ProductDetails.jsx
Remove clothing Size/Color selection boxes.
Add UI sections to display:
A prominent alert if product.requiresPrescription is true.
Manufacturer name, Dosage, Medicine type, and Expiry Date details.
Frontend Admin Panel Components
[MODIFY] 
frontend/src/features/admin/components/AdminOrders.jsx
Update editOptions status selection array to healthcare status list: ['Pending', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'].
Update getStatusColor mapping helper for new statuses.
[MODIFY] 
frontend/src/features/admin/components/AddProduct.jsx
Add new form input fields for the extended healthcare attributes:
Prescription Required (Switch/Checkbox)
Manufacturer (Text field)
Expiry Date (Date input)
Dosage (Text field)
Medicine Type (Text field or simple select)
[MODIFY] 
frontend/src/features/admin/components/ProductUpdate.jsx
Add fields corresponding to those in AddProduct and load their values from selectedProduct.
[NEW] 
frontend/src/features/admin/components/AdminPrescriptions.jsx
Create a placeholder component representing the "Prescription Verification Dashboard" where admin can approve or reject uploaded prescriptions.
[NEW] 
frontend/src/pages/AdminPrescriptionsPage.jsx
Create a thin page wrapper for the AdminPrescriptions component.
[MODIFY] 
frontend/src/pages/index.js
Export AdminPrescriptionsPage.
[MODIFY] 
frontend/src/App.js
Add a route mapping /admin/prescriptions to <AdminPrescriptionsPage />.
Project Documentation
[MODIFY] 
readme.md
Rewrite the repository readme file to reflect MedQuick, documenting features, healthcare categories, setup steps, and environment config.
Asset Updates
Generate and save 4 brand-new medical/healthcare themed banner images in the frontend assets folder using the generate_image tool to replace the default shopping banners.
Verification Plan
Automated Tests
Verify frontend builds successfully:
bash

npm run build --prefix frontend
Verify backend starts successfully:
bash

npm run start --prefix backend
Manual Verification
Run the seed script: npm run seed in the backend directory. Verify that categories are populated as Medicines, First Aid, etc.
Start both backend and frontend servers.
Open the frontend application in the browser:
Check that the title says "MedQuick".
Verify the banners are healthcare-themed.
Verify the category filter on the homepage list shows the 8 healthcare categories.
Log in as the Admin user:
Go to /admin/add-product and check that the new healthcare fields are visible.
Verify that the "Verify Prescriptions" placeholder page renders under /admin/prescriptions.
Verify that order status dropdown in /admin/orders has the new options.
Log in as the Customer user:
Verify that products that require a prescription display the "Prescription Required" badge.
Verify that the Product Details page displays the dosage, manufacturer, medicine type, and expiry dat