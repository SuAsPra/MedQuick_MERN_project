# MedQuick – User Stories

This document captures the primary user stories for **MedQuick – Medicine & Emergency Essentials Delivery Platform**. Each user story is written from the perspective of the end user and includes acceptance criteria and priority. These stories form the initial product backlog and will be tracked as GitHub Issues throughout the development lifecycle.

---

# Authentication Module

## US-01 – Customer Registration

**User Story**

As a customer, I want to create an account so that I can securely purchase healthcare products online.

**Acceptance Criteria**

* User can register with name, email, and password.
* Email address must be unique.
* Password is securely encrypted.
* User is redirected to the login page after successful registration.

**Priority:** Must Have

---

## US-02 – Customer Login

**User Story**

As a customer, I want to log into my account so that I can access my profile, cart, and orders.

**Acceptance Criteria**

* User can log in using registered credentials.
* Invalid credentials display an appropriate error.
* JWT authentication is used.
* User is redirected to the homepage after login.

**Priority:** Must Have

---

## US-03 – User Logout

**User Story**

As a customer, I want to log out of my account so that my account remains secure on shared devices.

**Acceptance Criteria**

* User can log out successfully.
* Authentication token is removed.
* Protected pages become inaccessible after logout.

**Priority:** Must Have

---

## US-04 – Manage Profile

**User Story**

As a customer, I want to update my profile information so that my personal details remain accurate.

**Acceptance Criteria**

* User can edit profile details.
* User can update delivery addresses.
* Changes are saved successfully.

**Priority:** Should Have

---

# Product Module

## US-05 – Browse Healthcare Products

**User Story**

As a customer, I want to browse healthcare products so that I can explore available medicines and essentials.

**Acceptance Criteria**

* Products are displayed in a catalog.
* Product cards show image, name, category, and price.
* Products load correctly from the database.

**Priority:** Must Have

---

## US-06 – Search Products

**User Story**

As a customer, I want to search products by name so that I can quickly find the medicine or healthcare item I need.

**Acceptance Criteria**

* Search returns matching products.
* Partial keyword matches are supported.
* Results update correctly.

**Priority:** Must Have

---

## US-07 – Filter Products

**User Story**

As a customer, I want to filter products by healthcare category so that I can browse relevant products.

**Acceptance Criteria**

* Products can be filtered by category.
* Selected filter updates the displayed products.
* Users can clear filters.

**Priority:** Must Have

---

## US-08 – View Product Details

**User Story**

As a customer, I want to view detailed product information so that I can make informed purchasing decisions.

**Acceptance Criteria**

* Product page displays description, price, manufacturer, dosage, medicine type, and expiry date.
* Product images are displayed correctly.
* Prescription information is shown when applicable.

**Priority:** Must Have

---

## US-09 – View Prescription Information

**User Story**

As a customer, I want prescription-required medicines to be clearly identified so that I know additional verification may be required.

**Acceptance Criteria**

* Prescription badge is displayed.
* Badge appears on product cards and product details page.

**Priority:** Must Have

---

# Cart & Wishlist Module

## US-10 – Add Products to Cart

**User Story**

As a customer, I want to add products to my shopping cart so that I can purchase multiple items together.

**Acceptance Criteria**

* Products can be added to the cart.
* Cart quantity updates correctly.
* Duplicate additions increase quantity.

**Priority:** Must Have

---

## US-11 – Update Shopping Cart

**User Story**

As a customer, I want to modify product quantities in my cart so that I can purchase the desired amount.

**Acceptance Criteria**

* Quantity can be increased or decreased.
* Products can be removed.
* Cart total updates automatically.

**Priority:** Must Have

---

## US-12 – Manage Wishlist

**User Story**

As a customer, I want to save products to my wishlist so that I can purchase them later.

**Acceptance Criteria**

* Products can be added and removed.
* Wishlist persists for logged-in users.

**Priority:** Should Have

---

## US-13 – Checkout

**User Story**

As a customer, I want to review my order before placing it so that I can ensure all details are correct.

**Acceptance Criteria**

* Order summary is displayed.
* Delivery address can be selected.
* Order confirmation is shown after placement.

**Priority:** Must Have

---

# Order Module

## US-14 – Place Order

**User Story**

As a customer, I want to place an order so that I can receive healthcare products at my delivery address.

**Acceptance Criteria**

* Order is successfully created.
* Order details are stored in the database.
* Confirmation message is displayed.

**Priority:** Must Have

---

## US-15 – View Order History

**User Story**

As a customer, I want to view my previous orders so that I can track my purchases.

**Acceptance Criteria**

* Previous orders are listed.
* Order details can be viewed.

**Priority:** Should Have

---

## US-16 – Track Order Status

**User Story**

As a customer, I want to see the status of my order so that I know its delivery progress.

**Acceptance Criteria**

* Current order status is displayed.
* Status updates reflect administrator changes.

**Priority:** Must Have

---

# Review Module

## US-17 – Submit Product Review

**User Story**

As a customer, I want to rate and review purchased products so that I can share my experience with other users.

**Acceptance Criteria**

* Logged-in users can submit ratings.
* Reviews are stored and displayed.

**Priority:** Could Have

---

## US-18 – View Product Reviews

**User Story**

As a customer, I want to read reviews from other customers so that I can make better purchasing decisions.

**Acceptance Criteria**

* Reviews are displayed on the product page.
* Average rating is visible.

**Priority:** Should Have

---

# Administration Module

## US-19 – Manage Products

**User Story**

As an administrator, I want to add, edit, and delete products so that the product catalog remains accurate.

**Acceptance Criteria**

* CRUD operations are available.
* Product changes are reflected immediately.

**Priority:** Must Have

---

## US-20 – Manage Categories

**User Story**

As an administrator, I want to manage healthcare categories so that products remain properly organized.

**Acceptance Criteria**

* Categories can be viewed and updated.
* Products are assigned correctly.

**Priority:** Must Have

---

## US-21 – Manage Customers

**User Story**

As an administrator, I want to view customer accounts so that I can monitor platform usage.

**Acceptance Criteria**

* Customer list is displayed.
* Customer details can be viewed.

**Priority:** Should Have

---

## US-22 – Manage Orders

**User Story**

As an administrator, I want to update order statuses so that customers are informed about delivery progress.

**Acceptance Criteria**

* Order status can be changed to Pending, Confirmed, Packed, Out for Delivery, Delivered, or Cancelled.
* Changes are reflected in customer order history.

**Priority:** Must Have

---

## US-23 – Manage Inventory

**User Story**

As an administrator, I want to update product inventory so that stock information remains accurate.

**Acceptance Criteria**

* Stock quantities can be modified.
* Inventory updates are reflected in product listings.

**Priority:** Must Have

---

## US-24 – View Dashboard Analytics

**User Story**

As an administrator, I want to view dashboard statistics so that I can monitor platform activity and inventory.

**Acceptance Criteria**

* Dashboard displays key platform metrics.
* Product and order summaries are visible.

**Priority:** Could Have

---

# Prescription Module

## US-25 – Verify Prescriptions

**User Story**

As an administrator, I want to access a prescription verification dashboard so that prescription-required medicines can be managed efficiently.

**Acceptance Criteria**

* Prescription Verification page is accessible from the admin dashboard.
* Placeholder interface is available for future implementation.

**Priority:** Should Have

---

# Summary

* **Total User Stories:** 25
* **Customer Stories:** 18
* **Administrator Stories:** 7

These user stories represent the initial product backlog for MedQuick and will be implemented iteratively using GitHub Issues and GitHub Projects following an Agile-inspired development workflow.
