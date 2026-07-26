# MedQuick – Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose

The purpose of this document is to define the functional and non-functional requirements of **MedQuick – Medicine & Emergency Essentials Delivery Platform**. It serves as the foundation for designing, developing, testing, and maintaining the application while ensuring that all stakeholders share a common understanding of the project's objectives.

---

## 1.2 Project Scope

MedQuick is a full-stack MERN web application that enables customers to purchase medicines, first-aid products, emergency supplies, wellness products, and healthcare devices through a secure online platform. The system also provides administrators with tools to manage products, inventory, categories, customers, orders, and prescription-required medicines through a centralized dashboard.

The application aims to provide a reliable, scalable, and user-friendly healthcare shopping experience while following modern software engineering principles.

**Development Environment**: The project includes a complete Docker setup for local development with MongoDB, backend API, and frontend server. This ensures consistent development environments across team members and simplifies onboarding. See [DOCKER_SETUP.md](./DOCKER_SETUP.md) for detailed Docker configuration and instructions.

---

# 2. Functional Requirements

## 2.1 User Authentication

* Users shall be able to register with a unique email address.
* Users shall be able to log in securely.
* Passwords shall be encrypted before storage.
* Users shall be able to reset forgotten passwords.
* JWT shall be used for session authentication.
* The system shall support Customer and Administrator roles.

---

## 2.2 Customer Management

The system shall allow customers to:

* View and update profile information.
* Maintain multiple delivery addresses.
* View previous orders.
* Manage account settings.
* Save products to a wishlist.

---

## 2.3 Product Management

The system shall allow customers to:

* Browse all products.
* Search products by keyword.
* Filter products by healthcare category.
* View detailed product information.
* View medicine-specific information such as:

  * Manufacturer
  * Dosage
  * Medicine Type
  * Expiry Date
  * Prescription Requirement

Administrators shall be able to:

* Add products.
* Edit products.
* Delete products.
* Update stock quantities.
* Organize products into categories.

---

## 2.4 Category Management

The system shall organize products into categories including:

* Medicines
* First Aid
* Emergency Supplies
* Health Devices
* Personal Care
* Baby Care
* Wellness
* Daily Essentials

Administrators shall be able to create, edit, and manage categories.

---

## 2.5 Shopping Cart

Customers shall be able to:

* Add products to the cart.
* Remove products.
* Update product quantities.
* View cart subtotal.
* Proceed to checkout.

---

## 2.6 Wishlist

Customers shall be able to:

* Add products to wishlist.
* Remove products.
* View saved products.

---

## 2.7 Order Management

Customers shall be able to:

* Place orders.
* View order history.
* View order status.

Administrators shall be able to:

* View all orders.
* Update order status.
* Cancel orders if necessary.

Supported order statuses include:

* Pending
* Confirmed
* Packed
* Out for Delivery
* Delivered
* Cancelled

---

## 2.8 Reviews and Ratings

Customers shall be able to:

* Submit reviews.
* Edit reviews.
* Delete reviews.
* View product ratings.

---

## 2.9 Prescription Management

Version 1 requirements:

* Products requiring prescriptions shall display a clear badge.
* Administrators shall have access to a Prescription Verification dashboard placeholder.
* Prescription upload and verification logic shall be implemented in future versions.

---

## 2.10 Administrator Dashboard

The administrator shall be able to:

* Manage products.
* Manage categories.
* Manage customers.
* Manage orders.
* Monitor inventory.
* View dashboard statistics.
* Access prescription verification.

---

# 3. Non-Functional Requirements

## 3.1 Performance

* The application should load pages efficiently under normal usage.
* Product searches should return results promptly.
* Database operations should be optimized for responsiveness.

---

## 3.2 Scalability

The application shall support:

* Addition of new healthcare categories.
* Increasing product inventory.
* Growing customer base.
* Future mobile application integration.
* Future AI-based healthcare services.

---

## 3.3 Security

The system shall:

* Encrypt passwords using bcrypt.
* Authenticate users using JWT.
* Protect administrator routes.
* Validate user inputs.
* Store sensitive information using environment variables.

---

## 3.4 Reliability

The application shall:

* Handle invalid user input gracefully.
* Maintain consistent API responses.
* Prevent unauthorized access.
* Provide meaningful error messages.

---

## 3.5 Availability

The system should remain operational during normal usage and support deployment using Docker for consistent execution across development environments.

**Docker Support Requirements:**
* Application shall be containerized with Docker for local development
* Separate containers for frontend (React), backend (Node.js), and database (MongoDB)
* Docker Compose shall orchestrate multi-container setup
* Hot reload shall be enabled during development for code changes
* Database persistence shall be maintained across container restarts
* Environment configuration shall be managed via environment variables

---

## 3.6 Maintainability

The application shall follow:

* Modular architecture.
* Reusable React components.
* RESTful API design.
* Organized project structure.
* Version control using Git.

---

## 3.7 Usability

The user interface shall:

* Be responsive across desktop and mobile browsers.
* Provide intuitive navigation.
* Display consistent layouts.
* Use clear healthcare-oriented terminology.

---

## 3.8 Compatibility

The application shall be compatible with:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Modern Chromium-based browsers

---

# 4. Assumptions

* Users have internet connectivity.
* Administrators maintain product data.
* MongoDB stores all application data.
* Docker is used for local development.
* Healthcare product information is manually managed by administrators.

---

# 5. Constraints

* The application is web-based in Version 1.
* Payment gateway integration is excluded.
* Live GPS tracking is excluded.
* OCR prescription verification is excluded.
* AI-powered recommendations are reserved for future versions.
* Delivery partner management is reserved for future versions.

---

# 6. Future Enhancements

The architecture is designed to support future integration of:

* AI-powered medicine recommendations.
* OCR-based prescription verification.
* Online payment gateways.
* Delivery partner portal.
* Live order tracking.
* Pharmacy management.
* Hospital integration.
* Medicine reminder system.
* Push notifications.
* Voice-assisted medicine search.
* Multi-language support.
* Analytics and reporting dashboards.

---

# 7. Requirement Summary

The MedQuick platform aims to deliver a secure, scalable, and healthcare-focused online shopping experience by combining modern web technologies with structured software engineering practices. The requirements defined in this document establish the baseline for system design, implementation, testing, and future enhancements while ensuring maintainability and extensibility throughout the software development lifecycle.
